import type { Metadata } from 'next'
import { Inter, Dancing_Script, DM_Sans } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/ClientProviders'

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

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant', // reuse same CSS var so Hero picks it up
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
  icons: [
    { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', url: '/a-logo.png' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased" style={{ cursor: 'none' }}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
