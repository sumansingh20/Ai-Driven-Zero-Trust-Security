import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/src/components/providers/ThemeProvider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "CyberShield - AI Zero Trust Security | IIT Patna",
  description: "Enterprise AI-driven Zero Trust Cybersecurity Framework developed at IIT Patna by Suman Kumar - Real-time threat intelligence and advanced security operations",
  generator: "Suman Kumar, IIT Patna",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
