/**
 * Client-side synthetic media generators.
 *
 * The "Random Example" feature needs sample media, but to keep the repository
 * text-only (and avoid shipping binaries) we synthesize lightweight images,
 * audio, and video entirely in the browser using canvas, raw PCM, and
 * MediaRecorder. No network requests, no external APIs.
 */

type ImageId = "cat" | "landscape" | "city"
type AudioId = "bird" | "speech" | "piano"
type VideoId = "walking" | "traffic" | "nature"

/* -------------------------------------------------------------------------- */
/* Images                                                                      */
/* -------------------------------------------------------------------------- */

function drawImageScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  id: string,
) {
  if (id === "landscape") {
    const sky = ctx.createLinearGradient(0, 0, 0, h)
    sky.addColorStop(0, "#8ec5fc")
    sky.addColorStop(1, "#e0f7ff")
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, w, h)
    // Sun
    ctx.fillStyle = "#fff4c2"
    ctx.beginPath()
    ctx.arc(w * 0.78, h * 0.28, 70, 0, Math.PI * 2)
    ctx.fill()
    // Hills
    ctx.fillStyle = "#3f9d6d"
    ctx.beginPath()
    ctx.moveTo(0, h * 0.7)
    ctx.quadraticCurveTo(w * 0.3, h * 0.55, w * 0.55, h * 0.7)
    ctx.quadraticCurveTo(w * 0.8, h * 0.85, w, h * 0.68)
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.fill()
    ctx.fillStyle = "#2e8b57"
    ctx.beginPath()
    ctx.moveTo(0, h * 0.82)
    ctx.quadraticCurveTo(w * 0.4, h * 0.7, w, h * 0.85)
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.fill()
    return
  }

  if (id === "city") {
    const sky = ctx.createLinearGradient(0, 0, 0, h)
    sky.addColorStop(0, "#1f2a44")
    sky.addColorStop(1, "#4b3b6b")
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, w, h)
    // Buildings
    let x = 0
    let seed = 7
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    while (x < w) {
      const bw = 50 + rand() * 90
      const bh = h * (0.3 + rand() * 0.55)
      ctx.fillStyle = `rgb(${20 + rand() * 30}, ${25 + rand() * 35}, ${45 + rand() * 40})`
      ctx.fillRect(x, h - bh, bw - 6, bh)
      // Windows
      ctx.fillStyle = "#ffd86b"
      for (let wy = h - bh + 12; wy < h - 12; wy += 22) {
        for (let wx = x + 8; wx < x + bw - 16; wx += 18) {
          if (rand() > 0.45) ctx.fillRect(wx, wy, 8, 12)
        }
      }
      x += bw
    }
    return
  }

  // cat (default): warm gradient + stylized face
  const bg = ctx.createRadialGradient(w / 2, h / 2, 60, w / 2, h / 2, w * 0.7)
  bg.addColorStop(0, "#fbc2eb")
  bg.addColorStop(1, "#a6c1ee")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)
  const cx = w / 2
  const cy = h / 2
  ctx.fillStyle = "#5b3a5b"
  // Ears
  ctx.beginPath()
  ctx.moveTo(cx - 150, cy - 60)
  ctx.lineTo(cx - 90, cy - 200)
  ctx.lineTo(cx - 30, cy - 80)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx + 150, cy - 60)
  ctx.lineTo(cx + 90, cy - 200)
  ctx.lineTo(cx + 30, cy - 80)
  ctx.closePath()
  ctx.fill()
  // Head
  ctx.beginPath()
  ctx.arc(cx, cy, 150, 0, Math.PI * 2)
  ctx.fill()
  // Eyes
  ctx.fillStyle = "#fbc2eb"
  ctx.beginPath()
  ctx.arc(cx - 55, cy - 20, 24, 0, Math.PI * 2)
  ctx.arc(cx + 55, cy - 20, 24, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#1c1430"
  ctx.beginPath()
  ctx.arc(cx - 55, cy - 20, 10, 0, Math.PI * 2)
  ctx.arc(cx + 55, cy - 20, 10, 0, Math.PI * 2)
  ctx.fill()
  // Nose
  ctx.fillStyle = "#ff8fb1"
  ctx.beginPath()
  ctx.moveTo(cx - 16, cy + 40)
  ctx.lineTo(cx + 16, cy + 40)
  ctx.lineTo(cx, cy + 62)
  ctx.closePath()
  ctx.fill()
}

export async function generateImageFile(id: string, filename: string): Promise<File> {
  const w = 1200
  const h = 800
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas is not supported in this browser.")
  drawImageScene(ctx, w, h, id as ImageId)
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not render the example image."))),
      "image/png",
    ),
  )
  return new File([blob], filename, { type: "image/png" })
}

/* -------------------------------------------------------------------------- */
/* Audio                                                                       */
/* -------------------------------------------------------------------------- */

function sampleAudio(id: string, t: number, channel: number): number {
  if (id === "bird") {
    return 0.4 * Math.sin(2 * Math.PI * (2200 + 700 * Math.sin(2 * Math.PI * 7 * t)) * t)
  }
  if (id === "speech") {
    return (
      0.35 *
      Math.sin(2 * Math.PI * 180 * t) *
      (0.6 + 0.4 * Math.sin(2 * Math.PI * 3.5 * t))
    )
  }
  // piano: decaying A-major chord, retriggered each second
  const env = Math.exp(-1.5 * (t % 1))
  const detune = channel === 1 ? 1.003 : 1
  return (
    env *
    (0.4 * Math.sin(2 * Math.PI * 440 * detune * t) +
      0.3 * Math.sin(2 * Math.PI * 554.37 * detune * t) +
      0.2 * Math.sin(2 * Math.PI * 659.25 * detune * t))
  )
}

function encodeWav(channels: Float32Array[], sampleRate: number): Blob {
  const numCh = channels.length
  const len = channels[0].length
  const bytesPerSample = 2
  const blockAlign = numCh * bytesPerSample
  const dataSize = len * blockAlign
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, "RIFF")
  view.setUint32(4, 36 + dataSize, true)
  writeString(8, "WAVE")
  writeString(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, numCh, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, 16, true)
  writeString(36, "data")
  view.setUint32(40, dataSize, true)

  let offset = 44
  for (let i = 0; i < len; i++) {
    for (let c = 0; c < numCh; c++) {
      let s = Math.max(-1, Math.min(1, channels[c][i]))
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
      offset += 2
    }
  }
  return new Blob([view], { type: "audio/wav" })
}

export async function generateAudioFile(id: string, filename: string): Promise<File> {
  const sampleRate = 44100
  const duration = 4
  const numCh = id === "piano" ? 2 : 1
  const len = sampleRate * duration
  const channels: Float32Array[] = []
  for (let c = 0; c < numCh; c++) {
    const data = new Float32Array(len)
    for (let i = 0; i < len; i++) {
      data[i] = sampleAudio(id as AudioId, i / sampleRate, c)
    }
    channels.push(data)
  }
  const blob = encodeWav(channels, sampleRate)
  return new File([blob], filename, { type: "audio/wav" })
}

/* -------------------------------------------------------------------------- */
/* Video                                                                       */
/* -------------------------------------------------------------------------- */

function drawVideoScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  id: string,
  t: number,
) {
  if (id === "traffic") {
    ctx.fillStyle = "#2b2b33"
    ctx.fillRect(0, 0, w, h)
    // Road
    ctx.fillStyle = "#3a3a44"
    ctx.fillRect(0, h * 0.35, w, h * 0.4)
    // Lane dashes scrolling
    ctx.fillStyle = "#f5c542"
    const offset = (t * 220) % 80
    for (let x = -80 + offset; x < w; x += 80) {
      ctx.fillRect(x, h * 0.54, 40, 6)
    }
    // Cars
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"]
    for (let i = 0; i < 4; i++) {
      const x = (t * (120 + i * 40) + i * 180) % (w + 120) - 60
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(x, h * 0.4 + (i % 2) * 50, 70, 30)
    }
    return
  }

  if (id === "nature") {
    const sky = ctx.createLinearGradient(0, 0, 0, h)
    const shift = 0.5 + 0.5 * Math.sin(t)
    sky.addColorStop(0, `rgb(${120 + shift * 60}, ${180 + shift * 40}, 250)`)
    sky.addColorStop(1, "#e7fbe9")
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, w, h)
    // Sun
    ctx.fillStyle = "#fff3b0"
    ctx.beginPath()
    ctx.arc(w * 0.5 + Math.sin(t * 0.6) * 80, h * 0.3, 44, 0, Math.PI * 2)
    ctx.fill()
    // Rolling hills
    ctx.fillStyle = "#3f9d6d"
    ctx.beginPath()
    ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 20) {
      ctx.lineTo(x, h * 0.7 + Math.sin(x * 0.02 + t * 2) * 18)
    }
    ctx.lineTo(w, h)
    ctx.fill()
    return
  }

  // walking (default): a stick figure moving across
  ctx.fillStyle = "#f2f2f5"
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = "#d9d9e0"
  ctx.fillRect(0, h * 0.8, w, h * 0.2)
  const x = ((t * 140) % (w + 80)) - 40
  const y = h * 0.8
  const swing = Math.sin(t * 8) * 14
  ctx.strokeStyle = "#1c1c28"
  ctx.lineWidth = 6
  ctx.lineCap = "round"
  // Head
  ctx.fillStyle = "#1c1c28"
  ctx.beginPath()
  ctx.arc(x, y - 110, 18, 0, Math.PI * 2)
  ctx.fill()
  // Body
  ctx.beginPath()
  ctx.moveTo(x, y - 92)
  ctx.lineTo(x, y - 40)
  ctx.stroke()
  // Legs
  ctx.beginPath()
  ctx.moveTo(x, y - 40)
  ctx.lineTo(x - 18, y + swing)
  ctx.moveTo(x, y - 40)
  ctx.lineTo(x + 18, y - swing)
  ctx.stroke()
  // Arms
  ctx.beginPath()
  ctx.moveTo(x, y - 80)
  ctx.lineTo(x - 16, y - 50 - swing)
  ctx.moveTo(x, y - 80)
  ctx.lineTo(x + 16, y - 50 + swing)
  ctx.stroke()
}

type CanvasWithCapture = HTMLCanvasElement & {
  captureStream?: (frameRate?: number) => MediaStream
}

function pickVideoMime(): string {
  const candidates = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ]
  if (typeof MediaRecorder !== "undefined") {
    for (const c of candidates) {
      if (MediaRecorder.isTypeSupported(c)) return c
    }
  }
  return "video/webm"
}

export async function generateVideoFile(id: string, filename: string): Promise<File> {
  const w = 640
  const h = 360
  const fps = 30
  const durationMs = 2500
  const canvas = document.createElement("canvas") as CanvasWithCapture
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas is not supported in this browser.")
  if (typeof MediaRecorder === "undefined" || typeof canvas.captureStream !== "function") {
    throw new Error("This browser cannot generate the video example. Try uploading a file.")
  }

  const stream = canvas.captureStream(fps)
  const mimeType = pickVideoMime()
  const recorder = new MediaRecorder(stream, { mimeType })
  const chunks: BlobPart[] = []
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data)
  }
  const stopped = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve()
  })

  recorder.start()
  const start = performance.now()
  await new Promise<void>((resolve) => {
    const draw = () => {
      const elapsed = performance.now() - start
      drawVideoScene(ctx, w, h, id as VideoId, elapsed / 1000)
      if (elapsed < durationMs) {
        requestAnimationFrame(draw)
      } else {
        if (recorder.state !== "inactive") recorder.stop()
        resolve()
      }
    }
    requestAnimationFrame(draw)
  })
  await stopped

  const type = mimeType.split(";")[0]
  const blob = new Blob(chunks, { type })
  const name = filename.replace(/\.[^.]+$/, ".webm")
  return new File([blob], name, { type })
}
