import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToR2(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const ext = filename.split('.').pop() || 'jpg'
  const key = `artworks/${uuidv4()}.${ext}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  )

  return `${process.env.R2_PUBLIC_URL}/${key}`
}

export async function deleteFromR2(url: string): Promise<void> {
  const publicUrl = process.env.R2_PUBLIC_URL
  if (!publicUrl || !url || !url.startsWith(publicUrl)) return

  const key = url.replace(`${publicUrl}/`, '')
  if (!key) return

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    })
  )
}

// Best-effort batch delete; never throws. Returns count of successful deletes.
export async function deleteManyFromR2(urls: (string | null | undefined)[]): Promise<number> {
  const targets = urls.filter((u): u is string => typeof u === 'string' && u.length > 0)
  let ok = 0
  await Promise.all(
    targets.map(async (url) => {
      try {
        await deleteFromR2(url)
        ok++
      } catch (err) {
        console.error('R2 delete failed:', url, err)
      }
    })
  )
  return ok
}
