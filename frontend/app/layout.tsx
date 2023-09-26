"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import '@/init-api'
import Navbar from '@/comps/navbar'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

console.log('HI')

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const onSearch = useCallback(
    (text: string) => {
      router.push(`/assets?tags=${text}`)
    }, [router]
  )

  return (
    <html lang="en">
      <body className={inter.className + ' --mt-5'}>
        <Navbar onSearch={onSearch}/>
        <div children={children}/>
        {/* hi */}
      </body>
    </html>
  )
}
