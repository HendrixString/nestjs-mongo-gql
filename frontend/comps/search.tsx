"use client"

import { useCallback, useRef } from "react"
import { AiOutlineSearch } from 'react-icons/ai'


interface Props extends BaseProps {
  /**
   * blah
   * @param text 
   * @returns 
   */
  onSearch: (text: string) => void;
}

const Search: React.FC<Props> = ({ onSearch, className }) => {
  const ref = useRef<HTMLInputElement>(null)
  
  const onClick= useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      onSearch && onSearch(ref.current.value)
    }, [onSearch]
  )
  return (
    <div className={`flex flex-row justify-between items-center h-10 pl-3 pr-1 border 
                    border-slate-400 rounded-full w-fit ` }>
      <input ref={ref} type="search" 
            className={"h-8 m-3 focus:outline-none " + className} placeholder="search by tags" />
      <button className='bg-black p-2 rounded-full --shadow-xldd'
              onClick={onClick}>
        <AiOutlineSearch className='text-white' />
      </button>
    </div>
  )
}

export default Search;