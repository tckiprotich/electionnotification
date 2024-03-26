import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
// import "../utils/reminderScheduler"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NOTIFICATIONS',
  description: 'Send notifications to your users',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("Root Layout"); // This line displays "Root Layout" in the console
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
