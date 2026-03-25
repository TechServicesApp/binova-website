import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/layout/scroll-progress'
import { BinovaLogo } from '@/components/ui/BinovaLogo'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Binova Holding Group — A Passion for Excellence',
    template: '%s | Binova Holding Group',
  },
  description:
    'International holding group with offices in Canada and Cameroon. Active in 15 sectors including banking, mining, agriculture, energy, and more.',
  keywords: [
    'holding group',
    'investment',
    'Cameroon',
    'Canada',
    'infrastructure',
    'sustainability',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://binovagroup.com',
    siteName: 'Binova Holding Group',
    images: ['/og-image.png'],
  },
  twitter: { 
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased bg-white text-gray-slate">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
