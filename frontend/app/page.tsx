"use client"

import Image from 'next/image'
import Search from '../comps/search'
import Navbar from '../comps/navbar'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(
    () => {
      router.push('/assets');
    }
  )

  return (
    <main className="flex min-h-screen flex-col 
                    items-center justify-between my-8 mx-4 md:mx-8">
    </main>
  )
}
