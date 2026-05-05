// Strip EXIF from a JPEG buffer without re-encoding the image.
//
// Why no re-encoding? Re-encoding loses fidelity, which is unacceptable for
// artwork photography. We only need to remove APP1 segments (where EXIF —
// including GPS — lives) to keep camera/location metadata out of the public
// CDN. PNG/WebP rarely carry sensitive metadata in practice and are
// returned unchanged.
//
// JPEG structure: starts with FF D8 (SOI), followed by a series of segments
// `FF Mn LL LL ... payload`. We rewrite the buffer dropping every
// `FF E1` (APP1) segment.

const SOI = 0xd8 // Start of image marker (after FF)
const APP1 = 0xe1 // Marker for the segment that holds EXIF
const SOS = 0xda // Start of scan — pixel data follows; stop scanning here

export function stripJpegExif(input: Buffer): Buffer {
  if (input.length < 4) return input
  if (input[0] !== 0xff || input[1] !== SOI) return input // not a JPEG

  const out: Buffer[] = []
  out.push(input.subarray(0, 2)) // SOI

  let i = 2
  while (i < input.length) {
    if (input[i] !== 0xff) {
      // Resync: copy the rest unchanged. Shouldn't happen on a valid file.
      out.push(input.subarray(i))
      break
    }

    // Skip 0xFF padding bytes between segments
    while (i < input.length && input[i] === 0xff) i++
    if (i >= input.length) break

    const marker = input[i]
    const markerStart = i - 1 // The 0xFF byte
    i++

    // Markers without payload: SOI(0xD8), EOI(0xD9), TEM(0x01), RSTn(0xD0..0xD7)
    if (marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      out.push(input.subarray(markerStart, i))
      continue
    }

    // SOS — image data follows; pass through everything to EOI
    if (marker === SOS) {
      out.push(input.subarray(markerStart))
      break
    }

    // All other markers carry a 2-byte big-endian length (includes the
    // length bytes themselves) followed by `length - 2` bytes of payload.
    if (i + 2 > input.length) {
      out.push(input.subarray(markerStart))
      break
    }
    const segLen = (input[i] << 8) | input[i + 1]
    const segEnd = i + segLen
    if (segLen < 2 || segEnd > input.length) {
      out.push(input.subarray(markerStart))
      break
    }

    if (marker === APP1) {
      // Drop this segment (EXIF/XMP).
      i = segEnd
      continue
    }

    out.push(input.subarray(markerStart, segEnd))
    i = segEnd
  }

  return Buffer.concat(out)
}
