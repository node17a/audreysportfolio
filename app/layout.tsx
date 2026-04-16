import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Audrey Leo — Creative & Technologist',
  description:
    'Portfolio of Audrey Leo, art & technology student at UCL Slade School of Art. Creative computing, interactive media, and design.',
  openGraph: {
    title: 'Audrey Leo — Creative & Technologist',
    description:
      'Portfolio of Audrey Leo, art & technology student at UCL Slade School of Art.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
