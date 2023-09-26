"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '@/comps/button'
import useUser from '@/lib/hooks/use-user'
import useNavigateIfTrue from '@/lib/hooks/use-route-if'
import Link from 'next/link'
import Warning from '@/comps/warning'
import { Asset, User } from '@/lib/types'
import { getClient } from '@/lib/api/client'
import { CREATE_ASSET } from '@/lib/api/gql'
import { useRouter } from 'next/navigation'
import { text_to_tokens } from '@/app/utils/text'

const fields = [
  {
    key: 'title',
    props: {
      type: 'text',
      placeholder: 'Title'
    }
  },
  {
    key: 'description',
    props: {
      type: 'text',
      placeholder: 'description'
    }
  },
  {
    key: 'isbn',
    props: {
      type: 'text',
      placeholder: 'ISBN'
    }
  },
  {
    key: 'price',
    props: {
      type: 'number',
      placeholder: 'price'
    }
  },
  {
    key: 'image',
    props: {
      type: 'url',
      placeholder: 'image url'
    }
  },
  {
    key: 'tags',
    props: {
      type: 'text',
      placeholder: 'tags'
    }
  },
]

export default function() {
  const refs = useRef({})
  const {
    user, loading, signup
  } = useUser()
  const [warning, setWarning] = useState<string>()
  // useNavigateIfTrue(Boolean(user), '/')
  const router = useRouter()

  const onClick = useCallback(
    async () => {
      setWarning(undefined)
      // extract username and password
      const ep: Partial<Asset> = fields.reduce(
        (p, c) => {
          p[c.key] = refs.current[c.key].value
          return p;
        },
        {}
      )
      
      let tags = (ep.tags as unknown) as string
      ep.tags = text_to_tokens(tags);
      ep.price = parseFloat(String(ep.price ));

      console.log('tags ', tags)
      console.log('ep.tags ', ep.tags)
      console.log('ep ', ep)
      // send to api
      try {
        const r = await getClient().gql.mutate<{createAsset: Asset}>(
          {
            mutation: CREATE_ASSET,
            variables: {
              input: {
                ...ep
              }
            },
          }
        )

        router.push(`/assets/${r.data.createAsset._id}`)

      } catch(e) {
        console.log(e)
        setWarning('error')
      }
      
    }, [getClient(), router]
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
    <Button children='create' onClick={onClick} />
    <Warning children={warning} />
  </div>
</main>
  )
}
