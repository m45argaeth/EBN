import type { MediaKind } from "./examples"
import { formatCompact } from "./format"

export interface Explanation {
  human: string
  computer: string
}

/**
 * Generate the "Humans see X / Computers see Y" educational copy for a file.
 * Uses the filename to lightly personalize the human-facing line.
 */
export function explain(kind: MediaKind, value: number, filename?: string): Explanation {
  const subject = guessSubject(kind, filename)
  const big = formatCompact(value)

  switch (kind) {
    case "image":
      return {
        human: `Humans see ${subject}.`,
        computer: `Computers see ${big} color values.`,
      }
    case "audio":
      return {
        human: `Humans hear ${subject}.`,
        computer: `Computers see ${big} changing wave amplitudes.`,
      }
    case "video":
      return {
        human: `Humans see ${subject}.`,
        computer: `Computers see ${big} numbers — many images displayed rapidly.`,
      }
  }
}

function guessSubject(kind: MediaKind, filename?: string): string {
  const name = (filename || "").toLowerCase()
  if (kind === "image") {
    if (name.includes("cat")) return "a cat"
    if (name.includes("landscape")) return "a landscape"
    if (name.includes("city")) return "a city"
    return "a picture"
  }
  if (kind === "audio") {
    if (name.includes("bird")) return "birds singing"
    if (name.includes("speech")) return "speech"
    if (name.includes("piano")) return "a piano"
    return "sound"
  }
  if (name.includes("walk")) return "a person walking"
  if (name.includes("traffic")) return "traffic"
  if (name.includes("nature")) return "nature"
  return "motion"
}
