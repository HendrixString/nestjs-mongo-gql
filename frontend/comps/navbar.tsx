"use client"

import { useCallback, useRef } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import Search from "./search";
import Username from "./user-name";

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
    <div className='flex flex-row justify-between items-center h-fit w-full'>
      <p children='Sapiens' className="w-fit -rotate-12 font-bold scale-150" />
      <Search onSearch={onSearch} className="w-96" />
      <Username />
    </div>
  )
}

export default Navbar;