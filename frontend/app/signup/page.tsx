"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '@/comps/button'
import useUser from '@/lib/hooks/use-user'
import useNavigateIfTrue from '@/lib/hooks/use-route-if'
import Link from 'next/link'
import Warning from '@/comps/warning'

const fields = [
  {
    key: 'name',
    props: {
      type: 'name',
      placeholder: 'name'
    }
  },
  {
    key: 'email',
    props: {
      type: 'email',
      placeholder: 'email'
    }
  },
  {
    key: 'password',
    props: {
      type: 'password',
      placeholder: 'password'
    }
  },
]

export default function() {
  const refs = useRef({})
  const {
    user, loading, signup
  } = useUser()
  const [warning, setWarning] = useState<string>()
  useNavigateIfTrue(Boolean(user), '/')

  const onClick = useCallback(
    async () => {
      setWarning(undefined)
      // extract username and password
      const ep: Partial<User> = fields.reduce(
        (p, c) => {
          p[c.key] = refs.current[c.key].value
          return p;
        },
        {}
      )

      // send to api
      try {
        await signup(ep?.name, ep?.email, ep?.password)
      } catch(e) {
        setWarning('sign up error')
      }
      
    }, [signup]
  )

  return (
<main className="flex min-h-screen flex-col 
                items-center justify-between my-8 mx-4 md:mx-8">
  <div className='flex flex-col items-center gap-5 w-full 
                  max-w-[20rem] font-light text-sm'>
    {
      fields.map(
        it => (
          <input key={it.key} {...it.props}
                  ref={r => refs.current[it.key] = r}
                  className='h-10 w-full border 
                            rounded-md bg-slate-50 px-2
                            outline-none' />
        )
      )
    }
    <Warning children={warning} />
    <Button children='signup' onClick={onClick} />
    <div className='flex flex-row'>
      <span children='Already a user ? ' />
      &nbsp;
      <Link href='login'>
        <span children='login' 
              className='border-b border-b-black border-dashed tracking-widest' />
      </Link>
    </div>
  </div>
</main>
  )
}
