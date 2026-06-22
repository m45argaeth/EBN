"use client"

import * as React from "react"

export type Locale = "id" | "en"
export const LOCALES: Locale[] = ["id", "en"]
export const DEFAULT_LOCALE: Locale = "id"
const STORAGE_KEY = "ebn-locale"

export type MediaKind = "image" | "audio" | "video"

const COMPACT_UNITS: Record<Locale, Array<[number, string]>> = {
  en: [
    [1e12, "trillion"],
    [1e9, "billion"],
    [1e6, "million"],
    [1e3, "thousand"],
  ],
  id: [
    [1e12, "triliun"],
    [1e9, "miliar"],
    [1e6, "juta"],
    [1e3, "ribu"],
  ],
}

/** Locale-aware compact number: 1234567 -> "1.23 million" / "1,23 juta". */
export function compactNumber(value: number, locale: Locale): string {
  if (!Number.isFinite(value) || value <= 0) return "0"
  for (const [threshold, label] of COMPACT_UNITS[locale]) {
    if (value >= threshold) {
      const scaled = value / threshold
      const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2
      return `${scaled.toFixed(digits)} ${label}`
    }
  }
  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(
    Math.round(value),
  )
}

const en = {
  header: { playground: "Playground", tryNow: "Try Now" },
  footer: {
    tagline:
      "Everything Becomes Numbers — because to a computer, everything is just numbers.",
    home: "Home",
    playground: "Playground",
    madeWith: "Made with ❤️ by",
  },
  hero: {
    badge: "An educational playground for how machines see",
    title: "Everything Becomes Numbers",
    subtitle:
      "Upload an image, audio file, or video and discover how computers transform it into numerical data before AI can understand it.",
    tryNow: "Try Now",
    randomExample: "Random Example",
    mono: "Because to a computer, everything is just numbers.",
  },
  features: {
    heading: "Humans see meaning. Computers see numbers.",
    subtitle:
      "Every kind of media collapses into the same thing once a machine looks at it: long lists of numbers.",
    images: {
      title: "Images",
      formula: "pixels × color channels",
      body: "A photo is a grid of pixels. Each pixel is a few numbers — red, green, and blue intensities. A single phone photo is tens of millions of values.",
    },
    audio: {
      title: "Audio",
      formula: "duration × sample rate × channels",
      body: "Sound is captured as amplitude samples thousands of times per second. A short clip already holds hundreds of thousands of measurements.",
    },
    video: {
      title: "Video",
      formula: "frames × width × height × channels",
      body: "Video is just many images shown rapidly. Multiply the pixels in one frame by every frame and the numbers explode into the billions.",
    },
  },
  how: {
    heading: "How it works",
    subtitle: "Three steps, entirely client-side.",
    steps: [
      {
        title: "1. Upload anything",
        body: "Drop in an image, audio file, or video — or load a generated example. Nothing leaves your device.",
      },
      {
        title: "2. We decode it",
        body: "Your browser reads the raw pixels, samples, and frames using native web APIs — no servers, no databases.",
      },
      {
        title: "3. See the numbers",
        body: "Watch the file become the exact count of numerical values a computer must process before AI can understand it.",
      },
    ],
  },
  cta: {
    heading: "Ready to watch your files become numbers?",
    subtitle:
      "No sign-up, no upload to any server. Just you, your file, and the math behind how machines see.",
    button: "Open the Playground",
  },
  playground: {
    title: "The Playground",
    subtitle:
      "Drop in a file and watch it dissolve into the raw numbers a computer actually works with. Everything runs locally in your browser.",
  },
  tabs: { images: "Images", audio: "Audio", video: "Video" },
  dropzone: {
    chooseFile: "Choose file",
    randomExample: "Random Example",
    image: {
      label: "Drop an image here",
      hint: "PNG, JPG, WebP, GIF — processed entirely in your browser.",
    },
    audio: {
      label: "Drop an audio file here",
      hint: "WAV, MP3, OGG, M4A — decoded entirely in your browser.",
    },
    video: {
      label: "Drop a video file here",
      hint: "MP4, WebM, MOV — analyzed entirely in your browser.",
    },
  },
  actions: {
    copyStats: "Copy stats",
    share: "Share",
    reset: "Reset",
    copied: "Stats copied to clipboard",
    copyError: "Could not copy stats",
    shareCopied: "Share link copied to clipboard",
    shareError: "Could not share",
    via: "via Everything Becomes Numbers",
  },
  errors: {
    notImage: "That file is not an image. Please choose a PNG, JPG, or WebP.",
    processImage: "Could not process this image.",
    processImageToast: "Could not process this image",
    notAudio: "That file is not audio. Please choose a WAV, MP3, or OGG file.",
    processAudio: "Could not process this audio file.",
    processAudioToast: "Could not process this audio file",
    notVideo: "That file is not a video. Please choose an MP4 or WebM file.",
    processVideo: "Could not process this video file.",
    processVideoToast: "Could not process this video file",
    loadExample: "Could not load example.",
  },
  stats: {
    width: "Width",
    height: "Height",
    totalPixels: "Total Pixels",
    colorChannels: "Color Channels",
    estNumericValues: "Estimated Numeric Values",
    estNumericValuesShort: "Est. Numeric Values",
    duration: "Duration",
    sampleRate: "Sample Rate",
    channels: "Channels",
    totalSamples: "Total Samples",
    estAmplitude: "Estimated Amplitude Measurements",
    fps: "FPS",
    resolution: "Resolution",
    frameCount: "Frame Count",
    estFrameCount: "Est. Frame Count",
    assumed: "assumed",
    measured: "measured",
  },
  media: { image: "Image", audio: "Audio", video: "Video" },
  player: {
    audioFallback: "Your browser does not support the audio element.",
    videoFallback: "Your browser does not support the video element.",
  },
  banner: {
    prefix: "To a computer, this is approximately",
    image: "numerical values that describe this image.",
    audio: "amplitude measurements over time.",
    video: "numbers — images played in sequence.",
  },
  formula: {
    duration: "duration",
    sampleRate: "sample rate",
    channels: "channels",
    frames: "frames",
    width: "width",
    height: "height",
  },
  breakdown: {
    seeItHappen: "See it happen",
    imageCaption: "pixels, and the numbers behind them.",
    audioCaption: "samples, and the numbers behind them.",
    videoCaption: "frames, pixels, and the numbers behind them.",
    becomes: "becomes",
    readingAudio: "Reading audio samples…",
    readAudioError: "Could not read audio samples.",
    waveformTitle: "Waveform",
    waveformHint: "Tap the wave to inspect a moment in time.",
    sampleLabel: "sample",
    samplesTitle: "Samples",
    samplesHint: "16 consecutive amplitude readings around that point.",
    numbersTitle: "Numbers",
    audioNumbersHint: "Each sample is one number — the amplitude at that instant.",
    pcmNote: "Top: normalized (−1…1). Bottom: 16-bit PCM (−32768…32767).",
    waveformAria: "Interactive audio waveform",
    breakingFrames: "Breaking the video into frames…",
    breakFramesError: "Could not break this video into frames.",
    framesTitle: "Frames",
    framesHint: "The video is just a sequence of these. Pick one.",
    pixelsTitle: "Pixels",
    pixelsHint: "Tap the image to zoom into a 5×5 patch of pixels.",
    pixelNumbersHint: "Every pixel is just three numbers — red, green, blue (0–255).",
  },
  pixelInspector: {
    zoom: "Pixel zoom",
    hoverHint: "Hover over the image to inspect individual pixels.",
    previewAlt: "Uploaded preview",
  },
  pipeline: {
    video: { label: "Video", desc: "A clip is a sequence of frames." },
    frames: { label: "Frames", desc: "~30 still images every second." },
    pixels: { label: "Pixels", desc: "Each frame is a grid of pixels." },
    numbers: { label: "Numbers", desc: "Each pixel is just RGB numbers." },
  },
  educational: { humans: "Humans", computers: "Computers" },
}

export type Dict = typeof en

const id: Dict = {
  header: { playground: "Playground", tryNow: "Coba Sekarang" },
  footer: {
    tagline:
      "Everything Becomes Numbers — karena bagi komputer, semuanya hanyalah angka.",
    home: "Beranda",
    playground: "Playground",
    madeWith: "Dibuat dengan ❤️ oleh",
  },
  hero: {
    badge: "Playground edukasi tentang cara mesin melihat",
    title: "Everything Becomes Numbers",
    subtitle:
      "Unggah gambar, file audio, atau video dan temukan bagaimana komputer mengubahnya menjadi data angka sebelum AI bisa memahaminya.",
    tryNow: "Coba Sekarang",
    randomExample: "Contoh Acak",
    mono: "Karena bagi komputer, semuanya hanyalah angka.",
  },
  features: {
    heading: "Manusia melihat makna. Komputer melihat angka.",
    subtitle:
      "Semua jenis media berubah menjadi hal yang sama begitu dilihat mesin: deretan angka yang panjang.",
    images: {
      title: "Gambar",
      formula: "piksel × kanal warna",
      body: "Sebuah foto adalah kisi-kisi piksel. Setiap piksel adalah beberapa angka — intensitas merah, hijau, dan biru. Satu foto ponsel saja berisi puluhan juta nilai.",
    },
    audio: {
      title: "Audio",
      formula: "durasi × sample rate × kanal",
      body: "Suara direkam sebagai sampel amplitudo ribuan kali per detik. Klip pendek saja sudah menyimpan ratusan ribu pengukuran.",
    },
    video: {
      title: "Video",
      formula: "frame × lebar × tinggi × kanal",
      body: "Video hanyalah banyak gambar yang ditampilkan dengan cepat. Kalikan piksel dalam satu frame dengan setiap frame, dan angkanya meledak hingga miliaran.",
    },
  },
  how: {
    heading: "Cara kerjanya",
    subtitle: "Tiga langkah, sepenuhnya di sisi browser.",
    steps: [
      {
        title: "1. Unggah apa saja",
        body: "Jatuhkan gambar, file audio, atau video — atau muat contoh yang dihasilkan. Tidak ada yang keluar dari perangkatmu.",
      },
      {
        title: "2. Kami menguraikannya",
        body: "Browser-mu membaca piksel, sampel, dan frame mentah menggunakan API web bawaan — tanpa server, tanpa database.",
      },
      {
        title: "3. Lihat angkanya",
        body: "Saksikan file berubah menjadi jumlah pasti nilai angka yang harus diproses komputer sebelum AI bisa memahaminya.",
      },
    ],
  },
  cta: {
    heading: "Siap melihat file-mu berubah menjadi angka?",
    subtitle:
      "Tanpa daftar, tanpa unggah ke server mana pun. Hanya kamu, file-mu, dan matematika di balik cara mesin melihat.",
    button: "Buka Playground",
  },
  playground: {
    title: "Playground",
    subtitle:
      "Jatuhkan sebuah file dan saksikan ia terurai menjadi angka mentah yang sebenarnya diproses komputer. Semuanya berjalan lokal di browser-mu.",
  },
  tabs: { images: "Gambar", audio: "Audio", video: "Video" },
  dropzone: {
    chooseFile: "Pilih file",
    randomExample: "Contoh Acak",
    image: {
      label: "Jatuhkan gambar di sini",
      hint: "PNG, JPG, WebP, GIF — diproses sepenuhnya di browser-mu.",
    },
    audio: {
      label: "Jatuhkan file audio di sini",
      hint: "WAV, MP3, OGG, M4A — diurai sepenuhnya di browser-mu.",
    },
    video: {
      label: "Jatuhkan file video di sini",
      hint: "MP4, WebM, MOV — dianalisis sepenuhnya di browser-mu.",
    },
  },
  actions: {
    copyStats: "Salin statistik",
    share: "Bagikan",
    reset: "Atur ulang",
    copied: "Statistik disalin ke clipboard",
    copyError: "Gagal menyalin statistik",
    shareCopied: "Tautan disalin ke clipboard",
    shareError: "Gagal membagikan",
    via: "via Everything Becomes Numbers",
  },
  errors: {
    notImage: "File itu bukan gambar. Silakan pilih PNG, JPG, atau WebP.",
    processImage: "Gagal memproses gambar ini.",
    processImageToast: "Gagal memproses gambar ini",
    notAudio: "File itu bukan audio. Silakan pilih file WAV, MP3, atau OGG.",
    processAudio: "Gagal memproses file audio ini.",
    processAudioToast: "Gagal memproses file audio ini",
    notVideo: "File itu bukan video. Silakan pilih file MP4 atau WebM.",
    processVideo: "Gagal memproses file video ini.",
    processVideoToast: "Gagal memproses file video ini",
    loadExample: "Gagal memuat contoh.",
  },
  stats: {
    width: "Lebar",
    height: "Tinggi",
    totalPixels: "Total Piksel",
    colorChannels: "Kanal Warna",
    estNumericValues: "Perkiraan Nilai Angka",
    estNumericValuesShort: "Perk. Nilai Angka",
    duration: "Durasi",
    sampleRate: "Sample Rate",
    channels: "Kanal",
    totalSamples: "Total Sampel",
    estAmplitude: "Perkiraan Pengukuran Amplitudo",
    fps: "FPS",
    resolution: "Resolusi",
    frameCount: "Jumlah Frame",
    estFrameCount: "Perk. Jumlah Frame",
    assumed: "diperkirakan",
    measured: "terukur",
  },
  media: { image: "Gambar", audio: "Audio", video: "Video" },
  player: {
    audioFallback: "Browser-mu tidak mendukung elemen audio.",
    videoFallback: "Browser-mu tidak mendukung elemen video.",
  },
  banner: {
    prefix: "Bagi komputer, ini kira-kira",
    image: "nilai angka yang menggambarkan gambar ini.",
    audio: "pengukuran amplitudo dari waktu ke waktu.",
    video: "angka — gambar yang diputar berurutan.",
  },
  formula: {
    duration: "durasi",
    sampleRate: "sample rate",
    channels: "kanal",
    frames: "frame",
    width: "lebar",
    height: "tinggi",
  },
  breakdown: {
    seeItHappen: "Lihat prosesnya",
    imageCaption: "piksel, dan angka di baliknya.",
    audioCaption: "sampel, dan angka di baliknya.",
    videoCaption: "frame, piksel, dan angka di baliknya.",
    becomes: "menjadi",
    readingAudio: "Membaca sampel audio…",
    readAudioError: "Gagal membaca sampel audio.",
    waveformTitle: "Gelombang",
    waveformHint: "Ketuk gelombang untuk memeriksa satu momen waktu.",
    sampleLabel: "sampel",
    samplesTitle: "Sampel",
    samplesHint: "16 pembacaan amplitudo berurutan di sekitar titik itu.",
    numbersTitle: "Angka",
    audioNumbersHint: "Setiap sampel adalah satu angka — amplitudo pada saat itu.",
    pcmNote: "Atas: ternormalisasi (−1…1). Bawah: PCM 16-bit (−32768…32767).",
    waveformAria: "Gelombang audio interaktif",
    breakingFrames: "Memecah video menjadi frame…",
    breakFramesError: "Gagal memecah video ini menjadi frame.",
    framesTitle: "Frame",
    framesHint: "Video hanyalah rangkaian dari ini. Pilih salah satu.",
    pixelsTitle: "Piksel",
    pixelsHint: "Ketuk gambar untuk memperbesar petak piksel 5×5.",
    pixelNumbersHint: "Setiap piksel hanyalah tiga angka — merah, hijau, biru (0–255).",
  },
  pixelInspector: {
    zoom: "Zoom piksel",
    hoverHint: "Arahkan kursor ke gambar untuk memeriksa tiap piksel.",
    previewAlt: "Pratinjau unggahan",
  },
  pipeline: {
    video: { label: "Video", desc: "Klip adalah rangkaian frame." },
    frames: { label: "Frame", desc: "~30 gambar diam setiap detik." },
    pixels: { label: "Piksel", desc: "Setiap frame adalah kisi piksel." },
    numbers: { label: "Angka", desc: "Setiap piksel hanyalah angka RGB." },
  },
  educational: { humans: "Manusia", computers: "Komputer" },
}

const DICTS: Record<Locale, Dict> = { en, id }

const SUBJECTS: Record<
  Locale,
  Record<MediaKind, Record<string, string>>
> = {
  en: {
    image: { cat: "a cat", landscape: "a landscape", city: "a city", default: "a picture" },
    audio: { bird: "birds singing", speech: "speech", piano: "a piano", default: "sound" },
    video: { walk: "a person walking", traffic: "traffic", nature: "nature", default: "motion" },
  },
  id: {
    image: { cat: "seekor kucing", landscape: "pemandangan", city: "sebuah kota", default: "sebuah gambar" },
    audio: { bird: "burung berkicau", speech: "ucapan", piano: "piano", default: "suara" },
    video: { walk: "orang berjalan", traffic: "lalu lintas", nature: "alam", default: "gerakan" },
  },
}

function guessSubject(kind: MediaKind, filename: string | undefined, locale: Locale): string {
  const name = (filename || "").toLowerCase()
  const s = SUBJECTS[locale]
  if (kind === "image") {
    if (name.includes("cat")) return s.image.cat
    if (name.includes("landscape")) return s.image.landscape
    if (name.includes("city")) return s.image.city
    return s.image.default
  }
  if (kind === "audio") {
    if (name.includes("bird")) return s.audio.bird
    if (name.includes("speech")) return s.audio.speech
    if (name.includes("piano")) return s.audio.piano
    return s.audio.default
  }
  if (name.includes("walk")) return s.video.walk
  if (name.includes("traffic")) return s.video.traffic
  if (name.includes("nature")) return s.video.nature
  return s.video.default
}

export interface Explanation {
  human: string
  computer: string
}

function makeExplanation(
  kind: MediaKind,
  value: number,
  locale: Locale,
  filename?: string,
): Explanation {
  const subject = guessSubject(kind, filename, locale)
  const big = compactNumber(value, locale)
  if (locale === "id") {
    switch (kind) {
      case "image":
        return { human: `Manusia melihat ${subject}.`, computer: `Komputer melihat ${big} nilai warna.` }
      case "audio":
        return { human: `Manusia mendengar ${subject}.`, computer: `Komputer melihat ${big} amplitudo gelombang yang berubah.` }
      case "video":
        return { human: `Manusia melihat ${subject}.`, computer: `Komputer melihat ${big} angka — banyak gambar yang ditampilkan dengan cepat.` }
    }
  }
  switch (kind) {
    case "image":
      return { human: `Humans see ${subject}.`, computer: `Computers see ${big} color values.` }
    case "audio":
      return { human: `Humans hear ${subject}.`, computer: `Computers see ${big} changing wave amplitudes.` }
    case "video":
      return { human: `Humans see ${subject}.`, computer: `Computers see ${big} numbers — many images displayed rapidly.` }
  }
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
  compact: (value: number) => string
  explain: (kind: MediaKind, value: number, filename?: string) => Explanation
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "id" || stored === "en") setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTS[locale],
      compact: (v: number) => compactNumber(v, locale),
      explain: (kind: MediaKind, v: number, filename?: string) =>
        makeExplanation(kind, v, locale, filename),
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}
