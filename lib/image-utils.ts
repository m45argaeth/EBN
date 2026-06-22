export interface ImageStats {
  width: number
  height: number
  totalPixels: number
  channels: number
  hasAlpha: boolean
  estimatedValues: number
  objectUrl: string
}

export interface PixelSample {
  x: number
  y: number
  r: number
  g: number
  b: number
  a: number
}

/**
 * Holds an offscreen canvas with the decoded image so we can sample pixels
 * cheaply on hover without re-decoding.
 */
export class ImageProbe {
  readonly stats: ImageStats
  private readonly data: Uint8ClampedArray
  private readonly width: number
  private readonly height: number

  constructor(stats: ImageStats, data: Uint8ClampedArray) {
    this.stats = stats
    this.data = data
    this.width = stats.width
    this.height = stats.height
  }

  /** Sample a pixel at integer image coordinates. */
  sample(x: number, y: number): PixelSample | null {
    const px = Math.max(0, Math.min(this.width - 1, Math.floor(x)))
    const py = Math.max(0, Math.min(this.height - 1, Math.floor(y)))
    const i = (py * this.width + px) * 4
    if (i < 0 || i + 3 >= this.data.length) return null
    return {
      x: px,
      y: py,
      r: this.data[i],
      g: this.data[i + 1],
      b: this.data[i + 2],
      a: this.data[i + 3],
    }
  }

  /** Sample a square grid of pixels centered on (cx, cy) for the zoom view. */
  sampleGrid(cx: number, cy: number, size: number): PixelSample[] {
    const half = Math.floor(size / 2)
    const out: PixelSample[] = []
    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        const s = this.sample(cx + dx, cy + dy)
        if (s) out.push(s)
      }
    }
    return out
  }
}

/**
 * Decode an image file fully on the client, returning stats + a probe for
 * pixel inspection. Detects whether the image actually uses an alpha channel.
 */
export async function analyzeImage(file: File): Promise<ImageProbe> {
  const objectUrl = URL.createObjectURL(file)
  const img = await loadImageElement(objectUrl)
  const width = img.naturalWidth
  const height = img.naturalHeight

  if (!width || !height) {
    URL.revokeObjectURL(objectUrl)
    throw new Error("Could not read image dimensions.")
  }

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) {
    URL.revokeObjectURL(objectUrl)
    throw new Error("Canvas is not supported in this browser.")
  }
  ctx.drawImage(img, 0, 0)

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  // Detect a real alpha channel by scanning a subset of pixels.
  let hasAlpha = false
  const step = Math.max(1, Math.floor(data.length / 4 / 50000)) * 4
  for (let i = 3; i < data.length; i += step) {
    if (data[i] < 255) {
      hasAlpha = true
      break
    }
  }

  const channels = hasAlpha ? 4 : 3
  const totalPixels = width * height
  const stats: ImageStats = {
    width,
    height,
    totalPixels,
    channels,
    hasAlpha,
    estimatedValues: totalPixels * channels,
    objectUrl,
  }

  return new ImageProbe(stats, data)
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to decode image file."))
    img.src = src
  })
}

export function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) => n.toString(16).padStart(2, "0")
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase()
}
