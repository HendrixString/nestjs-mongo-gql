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
    loading, user
  } = useUser()
  console.log(user)
  const onClick= useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      router.push('login')
    }, [router]
  )
  return (
    <div>
      <Switch show={user}>
        <span children={`Hi, ${user?.name}`} />
        <Link className=''
              href='login'>
          login
        </Link>
      </Switch>
      
    </div>
  )
}

export default Username;