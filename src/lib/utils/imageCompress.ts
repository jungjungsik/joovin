// Client-side image compression for the admin uploader.
//
// We want to keep the artist's original whenever it already fits the gallery
// budget, but transparently downscale phone-camera shots that easily blow
// past the 15MB upload cap. This util:
//   - skips compression entirely for files under SKIP_BYTES that also fit
//     within MAX_DIMENSION
//   - never enlarges (only scales down)
//   - preserves transparent PNGs (re-encodes to PNG, no quality loss in the
//     classical sense — but the recompression is lossless)
//   - re-encodes JPEG/WebP at QUALITY
//
// Falls back to the original File on any error so a broken codec path
// doesn't block the upload.

const MAX_DIMENSION = 2400 // longer edge in CSS pixels
const SKIP_BYTES = 2 * 1024 * 1024 // 2MB
const QUALITY = 0.9

export async function compressImage(file: File): Promise<File> {
  if (typeof window === "undefined") return file
  if (!file.type.startsWith("image/")) return file

  // Cheap fast-path: small files almost certainly don't need work.
  if (file.size <= SKIP_BYTES) {
    const dims = await peekDimensions(file).catch(() => null)
    if (!dims || (dims.width <= MAX_DIMENSION && dims.height <= MAX_DIMENSION)) {
      return file
    }
  }

  try {
    const bitmap = await createImageBitmap(file)
    const { width, height } = bitmap
    const longest = Math.max(width, height)

    if (longest <= MAX_DIMENSION) {
      bitmap.close?.()
      return file
    }

    const scale = MAX_DIMENSION / longest
    const newW = Math.round(width * scale)
    const newH = Math.round(height * scale)

    const canvas = document.createElement("canvas")
    canvas.width = newW
    canvas.height = newH
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      bitmap.close?.()
      return file
    }
    ctx.drawImage(bitmap, 0, 0, newW, newH)
    bitmap.close?.()

    // Preserve PNG (alpha) for inputs that were PNG, otherwise pick JPEG —
    // smaller and good enough for photographs of artwork.
    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg"
    const outputExt = outputType === "image/png" ? "png" : "jpg"

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, outputType, outputType === "image/png" ? undefined : QUALITY),
    )
    if (!blob) return file

    const baseName = file.name.replace(/\.[^.]+$/, "") || "upload"
    return new File([blob], `${baseName}.${outputExt}`, { type: outputType })
  } catch {
    return file
  }
}

function peekDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const dims = { width: img.naturalWidth, height: img.naturalHeight }
      URL.revokeObjectURL(url)
      resolve(dims)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("dimension probe failed"))
    }
    img.src = url
  })
}
