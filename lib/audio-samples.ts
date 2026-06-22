export interface AudioSampleData {
  sampleRate: number
  duration: number
  channels: number
  length: number
  data: Float32Array
}

type AnyWindow = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext }

/**
 * Decode an audio file (via its object URL) on the client and return the raw
 * channel-0 amplitude samples so we can show the actual numbers behind sound.
 */
export async function extractAudioSamples(
  objectUrl: string,
): Promise<AudioSampleData> {
  const res = await fetch(objectUrl)
  const arrayBuffer = await res.arrayBuffer()

  const w = window as AnyWindow
  const Ctor = window.AudioContext || w.webkitAudioContext
  if (!Ctor) throw new Error("Web Audio API is not supported in this browser.")
  const ctx = new Ctor()

  let buffer: AudioBuffer
  try {
    buffer = await ctx.decodeAudioData(arrayBuffer.slice(0))
  } catch {
    await ctx.close()
    throw new Error("Could not decode this audio for sample inspection.")
  }

  const data = buffer.getChannelData(0).slice()
  const result: AudioSampleData = {
    sampleRate: buffer.sampleRate,
    duration: buffer.duration,
    channels: buffer.numberOfChannels,
    length: buffer.length,
    data,
  }
  await ctx.close()
  return result
}
