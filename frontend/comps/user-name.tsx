"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useRef } from "react"
import { Switch } from "./show-if"
import useUser from "@/lib/hooks/use-user"

const Username: React.FC<{}> = ({ }) => {
  const ref = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const {
    loading, user, logout
  } = useUser()

  return (
    <div>
      <Switch show={user}>
        <div className='flex flex-row items-baseline'>
          <span children={`Hi, ${user?.name}`} />
          &nbsp;
          <button children='(logout)' 
                  onClick={logout}
                  className='border-b border-dashed border-spacing-3 
                             border-black text-xs opacity-60' />
        </div>
        <Link className=''
              href='login'>
          login
        </Link>
      </Switch>
      
    </div>
  )
}

export default Username;