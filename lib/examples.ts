import {
  generateAudioFile,
  generateImageFile,
  generateVideoFile,
} from "./sample-media"

export type MediaKind = "image" | "audio" | "video"

export interface ExampleItem {
  id: string
  label: string
  kind: MediaKind
  filename: string
}

export const EXAMPLES: Record<MediaKind, ExampleItem[]> = {
  image: [
    { id: "cat", label: "Cat", kind: "image", filename: "cat.png" },
    { id: "landscape", label: "Landscape", kind: "image", filename: "landscape.png" },
    { id: "city", label: "City", kind: "image", filename: "city.png" },
  ],
  audio: [
    { id: "bird", label: "Bird sounds", kind: "audio", filename: "bird.wav" },
    { id: "speech", label: "Human speech", kind: "audio", filename: "speech.wav" },
    { id: "piano", label: "Piano", kind: "audio", filename: "piano.wav" },
  ],
  video: [
    { id: "walking", label: "Walking person", kind: "video", filename: "walking.webm" },
    { id: "traffic", label: "Traffic", kind: "video", filename: "traffic.webm" },
    { id: "nature", label: "Nature clip", kind: "video", filename: "nature.webm" },
  ],
}

export function findExample(kind: MediaKind, id: string): ExampleItem | undefined {
  return EXAMPLES[kind].find((e) => e.id === id)
}

export function randomExample(kind: MediaKind): ExampleItem {
  const list = EXAMPLES[kind]
  return list[Math.floor(Math.random() * list.length)]
}

/** Pick a random kind + example, used by the global "Random Example" CTA. */
export function randomAny(): ExampleItem {
  const kinds: MediaKind[] = ["image", "audio", "video"]
  const kind = kinds[Math.floor(Math.random() * kinds.length)]
  return randomExample(kind)
}

/**
 * Turn an example into a File by synthesizing it on the client. This keeps the
 * repository free of binary assets while still powering "Random Example" with
 * zero network requests and no external APIs.
 */
export async function exampleToFile(item: ExampleItem): Promise<File> {
  switch (item.kind) {
    case "image":
      return generateImageFile(item.id, item.filename)
    case "audio":
      return generateAudioFile(item.id, item.filename)
    case "video":
      return generateVideoFile(item.id, item.filename)
    default:
      throw new Error(`Unknown example kind: ${(item as ExampleItem).kind}`)
  }
}
