import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from "./components/provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Diary',
  description: 'Track your books',
}

export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body className={inter.className}>
        <nav>Book Diary</nav>
        <main>{children}</main>
      </body>
      </SessionProvider>
    </html>
  )
}
