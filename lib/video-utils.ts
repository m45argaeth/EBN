export interface VideoStats {
  duration: number
  width: number
  height: number
  fps: number
  fpsEstimated: boolean
  frameCount: number
  channels: number
  pixelsPerFrame: number
  estimatedValues: number
  objectUrl: string
}

interface VideoFrameMeta {
  mediaTime: number
  presentedFrames: number
}

type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (
    cb: (now: number, metadata: VideoFrameMeta) => void,
  ) => number
  cancelVideoFrameCallback?: (handle: number) => void
}

const CHANNELS = 3 // Frames are treated as RGB images.

/**
 * Analyze a video file on the client. Dimensions and duration come straight
 * from the media element; FPS is measured with requestVideoFrameCallback when
 * available and falls back to a sensible default of 30.
 */
export async function analyzeVideo(file: File): Promise<VideoStats> {
  const objectUrl = URL.createObjectURL(file)
  const video = document.createElement("video")
  video.preload = "auto"
  video.muted = true
  video.playsInline = true
  video.src = objectUrl

  await waitForMetadata(video)

  const width = video.videoWidth
  const height = video.videoHeight
  const duration = await resolveDuration(video)

  if (!width || !height) {
    URL.revokeObjectURL(objectUrl)
    throw new Error("Could not read video dimensions.")
  }

  const measured = await estimateFps(video)
  const fps = measured ?? 30
  const frameCount = Math.max(1, Math.round(duration * fps))
  const pixelsPerFrame = width * height
  const estimatedValues = frameCount * pixelsPerFrame * CHANNELS

  return {
    duration,
    width,
    height,
    fps: Math.round(fps * 100) / 100,
    fpsEstimated: measured === null,
    frameCount,
    channels: CHANNELS,
    pixelsPerFrame,
    estimatedValues,
    objectUrl,
  }
}

/**
 * Some in-browser recordings (e.g. MediaRecorder WebM) report a duration of
 * Infinity until the element is seeked. This forces the browser to compute a
 * real duration, then rewinds.
 */
function resolveDuration(video: HTMLVideoElement): Promise<number> {
  if (Number.isFinite(video.duration) && video.duration > 0) {
    return Promise.resolve(video.duration)
  }
  return new Promise((resolve) => {
    let settled = false
    const finish = (value: number) => {
      if (settled) return
      settled = true
      video.removeEventListener("timeupdate", onTime)
      resolve(value)
    }
    const onTime = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const d = video.duration
        video.currentTime = 0
        finish(d)
      }
    }
    video.addEventListener("timeupdate", onTime)
    try {
      video.currentTime = 1e101
    } catch {
      finish(0)
    }
    setTimeout(() => finish(Number.isFinite(video.duration) ? video.duration : 0), 2500)
  })
}

function waitForMetadata(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const onLoaded = () => {
      cleanup()
      resolve()
    }
    const onError = () => {
      cleanup()
      reject(new Error("Could not decode this video file. Try MP4 or WebM."))
    }
    const cleanup = () => {
      video.removeEventListener("loadedmetadata", onLoaded)
      video.removeEventListener("error", onError)
    }
    video.addEventListener("loadedmetadata", onLoaded)
    video.addEventListener("error", onError)
  })
}

/**
 * Measure FPS by counting presented frames over a short muted playback window.
 * Returns null if the browser lacks requestVideoFrameCallback so callers can
 * fall back to a default frame rate.
 */
function estimateFps(video: VideoWithRVFC): Promise<number | null> {
  return new Promise((resolve) => {
    if (typeof video.requestVideoFrameCallback !== "function") {
      resolve(null)
      return
    }

    let firstTime: number | null = null
    let firstFrames = 0
    let lastTime = 0
    let lastFrames = 0
    let rafHandle = 0
    const sampleWindowMs = 500
    const startedAt = performance.now()

    const onFrame = (_now: number, meta: VideoFrameMeta) => {
      if (firstTime === null) {
        firstTime = meta.mediaTime
        firstFrames = meta.presentedFrames
      }
      lastTime = meta.mediaTime
      lastFrames = meta.presentedFrames

      if (performance.now() - startedAt < sampleWindowMs) {
        rafHandle = video.requestVideoFrameCallback!(onFrame)
      } else {
        finish()
      }
    }

    const finish = () => {
      video.pause()
      if (rafHandle && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(rafHandle)
      }
      const dt = lastTime - (firstTime ?? 0)
      const df = lastFrames - firstFrames
      if (dt > 0 && df > 0) {
        resolve(df / dt)
      } else {
        resolve(null)
      }
    }

    const fail = () => resolve(null)

    video
      .play()
      .then(() => {
        rafHandle = video.requestVideoFrameCallback!(onFrame)
        // Safety timeout in case playback stalls.
        setTimeout(finish, sampleWindowMs + 1500)
      })
      .catch(fail)
  })
}
