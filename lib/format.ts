/**
 * Formatting helpers for large numbers and human-readable units.
 */

const FULL = new Intl.NumberFormat("en-US")

/** Format a number with thousands separators: 1234567 -> "1,234,567". */
export function formatFull(value: number): string {
  if (!Number.isFinite(value)) return "0"
  return FULL.format(Math.round(value))
}

/** Compact, human-friendly form: 1234567 -> "1.23 million". */
export function formatCompact(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0"
  const units: Array<[number, string]> = [
    [1e12, "trillion"],
    [1e9, "billion"],
    [1e6, "million"],
    [1e3, "thousand"],
  ]
  for (const [threshold, label] of units) {
    if (value >= threshold) {
      const scaled = value / threshold
      const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2
      return `${scaled.toFixed(digits)} ${label}`
    }
  }
  return formatFull(value)
}

/** Short scientific-ish suffix form: 1234567 -> "1.23M". */
export function formatShort(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0"
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)
}

/** Seconds -> "m:ss" or "h:mm:ss". */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const total = Math.floor(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => n.toString().padStart(2, "0")
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`
  return `${m}:${pad(s)}`
}

/** Bytes -> human readable. */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

/** Round a Hz value to a readable string: 44100 -> "44.1 kHz". */
export function formatHz(hz: number): string {
  if (!Number.isFinite(hz) || hz <= 0) return "0 Hz"
  if (hz >= 1000) return `${(hz / 1000).toFixed(1)} kHz`
  return `${Math.round(hz)} Hz`
}
