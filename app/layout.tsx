import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PackageProvider } from "@/context/package-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CFAT - Center for Admission and Travel",
  description:
    "Your gateway to global opportunities. Expert travel planning, work abroad programs, and scholarship assistance.",
  generator: "v0.app",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <PackageProvider>{children}</PackageProvider>
        <Analytics />
      </body>
    </html>
  )
}
