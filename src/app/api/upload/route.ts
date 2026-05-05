import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createClient } from '@/lib/supabase/server'
import { uploadToR2 } from '@/lib/r2/client'
import { stripJpegExif } from '@/lib/r2/exifStrip'
import { isAdminUser } from '@/lib/auth/admin'

// Generate a tiny base64 JPEG suitable for next/image's blur placeholder.
// Falls through silently — blur is a UX nicety, not load-bearing.
async function generateBlurDataURL(buffer: Buffer): Promise<string | null> {
  try {
    const blur = await sharp(buffer)
      .resize(16, 16, { fit: 'inside' })
      .jpeg({ quality: 30 })
      .toBuffer()
    return `data:image/jpeg;base64,${blur.toString('base64')}`
  } catch (err) {
    console.error('Blur generation failed:', err)
    return null
  }
}

const MAX_FILE_BYTES = 15 * 1024 * 1024 // 15MB
// Some browsers (notably IE-era Windows uploads) report PNG as "image/x-png".
// Magic-bytes validation below is the source of truth, so we accept the
// alias to avoid rejecting legitimate PNGs at the header check.
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/x-png', 'image/webp'] as const

// Detect actual image type from the first bytes of the buffer.
// Returns the canonical mime+extension or null if the file is not a supported image.
function detectImageType(buf: Buffer): { mime: (typeof ALLOWED_MIME)[number]; ext: 'jpg' | 'png' | 'webp' } | null {
  if (buf.length < 12) return null

  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { mime: 'image/jpeg', ext: 'jpg' }
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return { mime: 'image/png', ext: 'png' }
  }
  // WebP: "RIFF" .... "WEBP"
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return { mime: 'image/webp', ext: 'webp' }
  }
  return null
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isAdminUser(user)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Cheap up-front filters using the headers the browser sent.
  if (!ALLOWED_MIME.includes(file.type as (typeof ALLOWED_MIME)[number])) {
    return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, or WebP' }, { status: 400 })
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: 'File too large. Max 15MB' }, { status: 400 })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    // Trust the file's magic bytes, not the client-supplied MIME header.
    const detected = detectImageType(buffer)
    if (!detected) {
      return NextResponse.json({ error: 'File content is not a valid JPG, PNG, or WebP image' }, { status: 400 })
    }

    // Re-check size against actual buffer in case the multipart layer was lenient.
    if (buffer.length > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File too large. Max 15MB' }, { status: 400 })
    }

    // Strip EXIF from JPEGs (camera + GPS metadata). Lossless — we don't
    // re-encode the pixels. PNG/WebP pass through unchanged.
    const sanitized =
      detected.mime === 'image/jpeg' ? stripJpegExif(buffer) : buffer

    const [url, blurDataURL] = await Promise.all([
      uploadToR2(sanitized, `upload.${detected.ext}`, detected.mime),
      generateBlurDataURL(sanitized),
    ])

    return NextResponse.json({ url, blurDataURL })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
