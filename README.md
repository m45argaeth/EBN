# 🔢 EBN — Everything Becomes Numbers

> **Because to a computer, everything is just numbers.**
> **Karena bagi komputer, semuanya hanyalah angka.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)

---

## 🌐 Overview

**EBN** is an educational web playground that reveals how digital media — images, audio, and video — are fundamentally just numbers under the hood. Upload a photo, drop in an audio clip, or load a video, and watch the raw numerical data come alive.

No server. No uploads. 100% client-side.

🔗 **Live:** [ebn-playground.vercel.app](https://ebn-playground.vercel.app)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Image Breakdown** | See every pixel as RGB values, explore with the pixel inspector |
| 🔊 **Audio Breakdown** | Visualize waveform data, inspect sample values |
| 🎬 **Video Breakdown** | Extract frames and examine pixel data per frame |
| 🔍 **Pixel Inspector** | Hover & click any pixel to see its raw numbers |
| 🌗 **Dark / Light Theme** | Toggle between themes, with system preference support |
| 🌏 **Bahasa Indonesia / English** | Full bilingual UI with seamless language switching |
| 📋 **Copy & Share** | One-click copy of numerical data |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Notifications | [sonner](https://sonner.emilkowal.dev/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Font | [Geist](https://vercel.com/font) |

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── playground/
│       └── page.tsx
├── components/
│   ├── landing/
│   │   ├── hero
│   │   ├── feature-sections
│   │   ├── how-it-works
│   │   └── cta
│   ├── playground/
│   │   ├── action-buttons
│   │   ├── audio-breakdown / audio-tab
│   │   ├── big-number-banner
│   │   ├── breakdown-ui
│   │   ├── dropzone
│   │   ├── educational-note
│   │   ├── image-breakdown / images-tab
│   │   ├── pipeline
│   │   ├── pixel-inspector / pixel-numbers
│   │   ├── playground-intro / playground-tabs
│   │   ├── stat-card
│   │   ├── video-breakdown / video-tab
│   │   └── waveform
│   ├── big-number.tsx
│   ├── language-toggle.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/
│       ├── badge, button, card, separator
│       ├── skeleton, sonner, tabs
│       └── ...
├── lib/
│   ├── audio-samples.ts / audio-utils.ts
│   ├── clipboard.ts
│   ├── examples.ts / explanations.ts
│   ├── format.ts
│   ├── i18n.tsx
│   ├── image-utils.ts
│   ├── sample-media.ts
│   ├── site-config.ts
│   ├── utils.ts
│   └── video-frames.ts / video-utils.ts
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

---

## 🔒 Privacy

**Everything runs in your browser.** No data is sent to any server. Your images, audio, and video stay on your device — we only read pixels and samples in-browser to show you the numbers.

---

## 🧩 Part of a Series

EBN is part of a collection of educational playgrounds exploring how computers represent data:

| Playground | Topic | Link |
|---|---|---|
| 🔤 **TtB** | Text → Binary | [ttb-playground.vercel.app](https://ttb-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TtB) |
| 🔢 **EBN** | Media → Numbers | [ebn-playground.vercel.app](https://ebn-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/EBN) |

---

## 👤 Author

Made with ❤️ by [Arga](https://github.com/m45argaeth) · Curious About Everything 🔍
