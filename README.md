# 🔢 EBN — Everything Becomes Numbers

> **Because to a computer, everything is just numbers.**
> **Karena bagi komputer, semuanya hanyalah angka.**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)

🔗 **Live → [ebn-playground.vercel.app](https://ebn-playground.vercel.app)**

</div>

---

## 🌐 Overview

**EBN** is an educational web playground that reveals how digital media — images, audio, and video — are fundamentally just numbers under the hood. Upload a photo, drop in an audio clip, or load a video, and watch the raw numerical data come alive.

No server. No uploads. 100% client-side.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Image Breakdown** | Decode images to canvas, inspect every pixel's RGB(A) values with hover pixel inspector & zoom grid |
| 🔊 **Audio Breakdown** | Decode audio via Web Audio API, visualize waveform, inspect individual amplitude samples |
| 🎬 **Video Breakdown** | Extract frames via canvas seeking, inspect per-frame pixel data, see video→frames→pixels→numbers pipeline |
| 🔍 **Pixel Inspector** | Hover & click any pixel to see its raw RGB values in real-time |
| 🎲 **Random Example** | Generate synthetic media entirely client-side — no binary assets in the repo |
| 🧠 **Educational Copy** | Dynamic "Humans see X / Computers see Y" explanations personalized to your content |
| 🌗 **Dark / Light Theme** | Toggle between themes with system preference support |
| 🌏 **Bahasa Indonesia / English** | Full bilingual UI with seamless language switching |
| 📋 **Copy & Share** | One-click copy of stats & shareable links |
| 📱 **Responsive** | Works on desktop and mobile |
| 🔒 **Privacy-First** | Everything runs in your browser — no data leaves your device |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) + tailwindcss-animate |
| Components | [shadcn/ui](https://ui.shadcn.com/) (new-york style) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Notifications | [sonner](https://sonner.emilkowal.dev/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Fonts | Inter (sans) + JetBrains Mono (mono) via next/font |
| Utilities | clsx, tailwind-merge, class-variance-authority |

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css                    # Global styles & CSS variables
│   ├── layout.tsx                     # Root layout (fonts, providers, header/footer)
│   ├── page.tsx                       # Landing page
│   └── playground/
│       └── page.tsx                   # Playground page
├── components/
│   ├── landing/
│   │   ├── hero.tsx                   # Hero with CTA + "Random Example"
│   │   ├── feature-sections.tsx       # Image/Audio/Video feature cards
│   │   ├── how-it-works.tsx           # 3-step explainer
│   │   └── cta.tsx                    # Call-to-action banner
│   ├── playground/
│   │   ├── playground-tabs.tsx        # Tab switcher (Images/Audio/Video)
│   │   ├── dropzone.tsx               # Drag-and-drop file upload
│   │   ├── image-breakdown.tsx        # Image pixel analysis
│   │   ├── audio-breakdown.tsx        # Audio waveform & sample analysis
│   │   ├── video-breakdown.tsx        # Video frame extraction & analysis
│   │   ├── pixel-inspector.tsx        # Hover pixel RGB readout
│   │   ├── waveform.tsx               # Interactive SVG waveform
│   │   ├── pipeline.tsx               # Video→Frames→Pixels→Numbers viz
│   │   ├── educational-note.tsx       # "Humans see X / Computers see Y"
│   │   ├── big-number-banner.tsx      # "~X numerical values" banner
│   │   └── ...
│   ├── site-header.tsx / site-footer.tsx
│   ├── language-toggle.tsx / theme-toggle.tsx
│   └── ui/ (badge, button, card, separator, skeleton, tabs)
├── lib/
│   ├── i18n.tsx                       # Bilingual i18n system (id/en)
│   ├── site-config.ts                 # Site data, projects, universes
│   ├── image-utils.ts                 # ImageProbe class + canvas analysis
│   ├── audio-utils.ts                 # Web Audio API decoding & stats
│   ├── video-utils.ts / video-frames.ts  # Video metadata & frame extraction
│   ├── sample-media.ts               # Synthetic media generators (canvas/WAV/MediaRecorder)
│   ├── examples.ts                    # Example catalog (3 images, 3 audio, 3 video)
│   ├── explanations.ts               # Dynamic educational copy
│   ├── format.ts                      # Number formatting utilities
│   └── utils.ts                       # cn() utility
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm, yarn, pnpm, or bun

### Development

```bash
# Clone the repo
git clone https://github.com/m45argaeth/EBN.git
cd EBN

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/m45argaeth/EBN)

> 🚀 Deployed automatically to [Vercel](https://vercel.com/) on every push to `main`.

---

## 🔒 Privacy

**Everything runs in your browser.** No data is sent to any server. Your images, audio, and video stay on your device — we only read pixels and samples in-browser to show you the numbers. Even the "Random Example" feature generates media synthetically using canvas and Web Audio API.

---

## 🧩 Part of the "Sini Gajelasin" Series

EBN is one of many educational playgrounds under the **[Sini Gajelasin](https://sinigajelasin.vercel.app)** hub — *Curious About Everything*.

### 🪐 EBN Universe — How Computers Process Data

| # | Playground | Topic | Status | Link |
|---|---|---|---|---|
| 1 | 🔢 **EBN** | Media → Numbers | 🟢 Live | [ebn-playground.vercel.app](https://ebn-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/EBN) |
| 2 | 🔤 **TtB** | Text → Binary | 🟢 Live | [ttb-playground.vercel.app](https://ttb-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TtB) |
| 3 | 🔡 **Token Explorer** | Text → Tokens | 🟢 Live | [te-playground.vercel.app](https://te-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TE) |
| 4 | 🎬 **Video Frame Explorer** | Video → Frames | 🟢 Live | [vfe-playground.vercel.app](https://vfe-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/VFE) |
| 5 | 🧠 **Embedding Explorer** | Words → Vectors | 🟢 Live | [ee-playground.vercel.app](https://ee-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/EE) |
| 6 | 💬 **Prompt Explorer** | Prompt → Tokens → Output | 🟡 WIP | — |
| 7 | 🤥 **Hallucination Explorer** | LLM Hallucination | 🟡 WIP | — |
| 8 | 📦 **Compression Explorer** | Data → Compression | 🟡 WIP | — |
| 9 | 🌐 **Internet Packet Explorer** | Data → Packets | 🟡 WIP | — |
| 10 | 🤖 **Human vs AI Explorer** | Human vs AI Processing | 🟡 WIP | — |

### 🧬 Human Mind Universe — How We Think

| # | Playground | Topic | Status | Link |
|---|---|---|---|---|
| 11 | 🔍 **Bias Detector** | Cognitive Biases | 🟢 Live | [bd-playground-snowy.vercel.app](https://bd-playground-snowy.vercel.app) · [GitHub](https://github.com/m45argaeth/BD) |
| 12 | 🧠 **Memory Explorer** | Memory Systems | 🟡 WIP | — |
| 13 | 🌀 **False Memory Explorer** | False Memories | 🟡 WIP | — |
| 14 | 👁️ **Attention Explorer** | Attention & Focus | 🟡 WIP | — |
| 15 | 💊 **Dopamine Explorer** | Dopamine Loops | 🟡 WIP | — |

---

## 👤 Author

**Arga** — [GitHub](https://github.com/m45argaeth) · [Twitter/X](https://x.com/sinigajelasin) · [Blog](https://www.kompasiana.com/argacahyanugraha6628)

Made with ❤️ as part of **[Sini Gajelasin](https://sinigajelasin.vercel.app)** — *Curious About Everything* 🔍
