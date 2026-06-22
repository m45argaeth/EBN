import { ImageProbe, type ImageStats } from "./image-utils"

export interface VideoFrame {
  index: number
  time: number
  dataUrl: string
  probe: ImageProbe
}

function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      video.removeEventListener("seeked", done)
      resolve()
    }
    video.addEventListener("seeked", done)
    // Fallback in case the seeked event never fires for this codec.
    window.setTimeout(done, 1500)
    try {
      video.currentTime = time
    } catch {
      done()
    }
  })
}

/**
 * Decode a handful of frames from a video entirely on the client. Each frame is
 * captured to a canvas so we get both a thumbnail (data URL) and an ImageProbe
 * for pixel-level inspection — no network, no external APIs.
 */
export async function extractVideoFrames(
  objectUrl: string,
  count: number,
  duration: number,
  channels: number,
): Promise<VideoFrame[]> {
  const video = document.createElement("video")
  video.muted = true
  video.playsInline = true
  video.preload = "auto"
  video.crossOrigin = "anonymous"
  video.src = objectUrl

  await new Promise<void>((resolve, reject) => {
    let settled = false
    const ok = () => {
      if (settled) return
      settled = true
      resolve()
    }
    video.addEventListener("loadeddata", ok, { once: true })
    video.addEventListener("error", () => {
      if (settled) return
      settled = true
      reject(new Error("Could not load the video for frame extraction."))
    })
    // Fallback so we never hang if loadeddata is slow.
    window.setTimeout(ok, 4000)
  })

  const width = video.videoWidth || 640
  const height = video.videoHeight || 360
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Canvas is not supported in this browser.")

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 2
  const frames: VideoFrame[] = []
  for (let i = 0; i < count; i++) {
    const time = safeDuration * ((i + 0.5) / count)
    await seekTo(video, Math.min(time, Math.max(0, safeDuration - 0.05)))
    ctx.drawImage(video, 0, 0, width, height)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82)
    const imageData = ctx.getImageData(0, 0, width, height)
    const stats: ImageStats = {
      width,
      height,
      totalPixels: width * height,
      channels,
      hasAlpha: false,
      estimatedValues: width * height * channels,
      objectUrl: dataUrl,
    }
    frames.push({
      index: i,
      time,
      dataUrl,
      probe: new ImageProbe(stats, imageData.data),
    })
  }

  return frames
}
