import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai, Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: '--font-ibm-plex-sans-thai',
  subsets: ['latin', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SChatApp',
  description: 'Zhooleng & Zheeling',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${ibmPlexSansThai.variable}`}
    >
      <head>
        <title>PicMePls</title>
        <link rel='icon' href='/images/logo.svg' />
      </head>
      <body className='font-sans antialiased'>{children}</body>
    </html>
  )
}
