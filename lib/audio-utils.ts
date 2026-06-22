export interface AudioStats {
  duration: number
  sampleRate: number
  channels: number
  samplesPerChannel: number
  totalSamples: number
  estimatedValues: number
  objectUrl: string
  peaks: number[]
}

type AnyWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }

function createAudioContext(): AudioContext {
  const w = window as AnyWindow
  const Ctor = window.AudioContext || w.webkitAudioContext
  if (!Ctor) throw new Error("Web Audio API is not supported in this browser.")
  return new Ctor()
}

/**
 * Decode an audio file entirely on the client using the Web Audio API and
 * compute peak data for waveform rendering.
 */
export async function analyzeAudio(file: File, peakBuckets = 600): Promise<AudioStats> {
  const objectUrl = URL.createObjectURL(file)
  const arrayBuffer = await file.arrayBuffer()
  const ctx = createAudioContext()

  let audioBuffer: AudioBuffer
  try {
    audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0))
  } catch {
    await ctx.close()
    URL.revokeObjectURL(objectUrl)
    throw new Error("Could not decode this audio file. Try WAV, MP3, or OGG.")
  }

  const { duration, sampleRate, numberOfChannels, length } = audioBuffer
  const channels = numberOfChannels
  const samplesPerChannel = length
  const totalSamples = samplesPerChannel * channels

  const peaks = computePeaks(audioBuffer, peakBuckets)
  await ctx.close()

  return {
    duration,
    sampleRate,
    channels,
    samplesPerChannel,
    totalSamples,
    estimatedValues: totalSamples,
    objectUrl,
    peaks,
  }
}

function computePeaks(buffer: AudioBuffer, buckets: number): number[] {
  const channelData = buffer.getChannelData(0)
  const blockSize = Math.max(1, Math.floor(channelData.length / buckets))
  const peaks: number[] = []
  for (let b = 0; b < buckets; b++) {
    const start = b * blockSize
    let max = 0
    for (let i = 0; i < blockSize; i++) {
      const v = Math.abs(channelData[start + i] || 0)
      if (v > max) max = v
    }
    peaks.push(max)
  }
  const globalMax = Math.max(...peaks, 0.0001)
  return peaks.map((p) => p / globalMax)
}
