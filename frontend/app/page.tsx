"use client"

import Image from 'next/image'
import Search from '../comps/search'
import Navbar from '../comps/navbar'
import { useCallback } from 'react'

export default function Home() {

  const onSearch = useCallback(
    text => {
      console.log('text: ', text)
    }, []
  )

  return (
    <main className="flex min-h-screen flex-col 
                    items-center justify-between my-8 mx-4 md:mx-8">
      <Navbar onSearch={onSearch}/>
    </main>
  )
}
