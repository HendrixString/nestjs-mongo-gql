"use client"

import { useCallback, useRef } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import Search from "./search";
import Username from "./user-name";
import Link from "next/link";

interface Props {
  /**
   * blah
   * @param text 
   * @returns 
   */
  onSearch: (text: string) => void;
}

const Navbar: React.FC<Props> = ({ onSearch }) => {
  const ref = useRef<HTMLInputElement>(null)
  
  return (
    <div className='flex flex-row justify-between 
                    items-center h-fit w-full
                    border-b-4 border-cyan-50 px-3 py-4'>
      <Link href='/'>
        <p children='Sapiens' 
           className="w-fit bg-black text-white text-xl --py-1 rounded-r-full 
                      px-3 --rotate-12 font-bold h-10 flex flex-row items-center
                      border-l-8 border-l-cyan-500" />
      </Link>
      <Search onSearch={onSearch} className="w-40 sm:w-60" />
      <Username />
    </div>
  )
}

export default Navbar;