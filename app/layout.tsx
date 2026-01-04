import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '@/store/StoreProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Hunting Coder - Coding Blogs',
  description: 'A blog for hunting coders',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  )
}