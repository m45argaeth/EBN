import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans",
          inter.variable,
          jetbrainsMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
