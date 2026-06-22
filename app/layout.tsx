import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Everything Becomes Numbers",
  description:
    "Karena bagi komputer, semuanya hanyalah angka. Unggah gambar, file audio, atau video dan temukan bagaimana komputer mengubahnya menjadi data angka sebelum AI bisa memahaminya.",
  keywords: ["AI", "edukasi", "piksel", "audio", "video", "angka", "playground"],
  openGraph: {
    title: "Everything Becomes Numbers",
    description: "Karena bagi komputer, semuanya hanyalah angka.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
