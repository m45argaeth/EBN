# Everything Becomes Numbers

> Because to a computer, everything is just numbers.

An educational playground that helps people understand how computers and AI
interpret **images, audio, and video** by turning them into raw numerical data.
Everything runs **client-side** in the browser — no database, no servers, no
external APIs.

## ✨ Features

- **Landing page** with an Apple-like, minimalist hero and feature sections.
- **Playground** with three tabs:
  - **Images** — upload / drag & drop / random example, live metadata (width,
    height, total pixels, color channels, estimated numeric values), a hover
    **pixel inspector** with RGB readout, and a zoomed pixel grid.
  - **Audio** — native audio player, metadata (duration, sample rate, channels,
    total samples), and a canvas **waveform** visualization.
  - **Video** — native video player, metadata (duration, FPS, resolution,
    estimated frame count) and a `Video → Frames → Pixels → Numbers` pipeline.
- **Random Example** — sample images, audio, and video are synthesized
  **client-side at runtime** (canvas / PCM WAV / MediaRecorder), so there are no
  binary assets in the repo and no network calls.
- **Educational mode** — “Humans see… / Computers see…” explanations per file.
- **Big-number calculations**
  - Image: `pixels × channels`
  - Audio: `duration × sample rate × channels`
  - Video: `frames × width × height × channels`
- **Extras** — dark mode toggle, copy stats, share (Web Share API + clipboard
  fallback), animated count-up, loading skeletons, and friendly error handling.

## 🧩 Tech stack

- [Next.js 15](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix primitives)
- [sonner](https://sonner.emilkowal.ski/) for toasts
- [lucide-react](https://lucide.dev) icons
- Geist font

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

## ▲ Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Vercel auto-detects Next.js — no environment variables or database needed.
4. Click **Deploy**.

## 📁 Project structure

```
app/
  layout.tsx            # Root layout, theme provider, fonts, toaster
  page.tsx              # Landing page
  globals.css           # Tailwind layers + design tokens
  playground/page.tsx   # Playground page
components/
  landing/              # Hero, feature sections, how-it-works, CTA
  playground/           # Tabs, dropzone, pixel inspector, waveform, etc.
  ui/                   # shadcn/ui primitives
  theme-provider.tsx
  theme-toggle.tsx
  site-header.tsx
  site-footer.tsx
  big-number.tsx
lib/
  image-utils.ts        # Canvas-based pixel analysis
  audio-utils.ts        # Web Audio decoding + waveform peaks
  video-utils.ts        # Metadata + FPS estimation
  examples.ts           # Bundled example registry
  explanations.ts       # "Humans see / Computers see" copy
  format.ts             # Number / duration formatting
  clipboard.ts          # Copy helper
  utils.ts              # cn()
lib/sample-media.ts     # Client-side synthetic media generators
```

## 🔁 About the examples

The **Random Example** feature does not ship any media files. Instead,
`lib/sample-media.ts` synthesizes a labelled image (canvas), audio (raw PCM
encoded to WAV), or short video (a canvas animation recorded with
`MediaRecorder`) entirely in the browser when you click the button. To use real
media instead, drop files into `public/examples/` and point `lib/examples.ts`
at them.

## 🔒 Privacy

Every file you load is processed entirely in your browser using native web APIs
(`canvas`, Web Audio, and HTML media elements). Nothing is uploaded anywhere.
