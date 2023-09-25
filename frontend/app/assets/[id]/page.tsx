"use client"

import { useCallback, useRef, useState } from 'react'
import Button from '@/comps/button'
import useUser from '@/lib/hooks/use-user'
import Warning from '@/comps/warning'
import { useQuery } from '@apollo/client'
import { GET_ASSET, OWN_ASSET } from '@/lib/api/gql'
import { getClient } from '@/lib/api/client'
import { Asset } from '@/lib/types'
import { ShowIf, Switch } from '@/comps/show-if'
import { AiTwotoneStar } from 'react-icons/ai'

export default function({ params }: { params: { id: string } }) {
  const [warning, setWarning] = useState<string>()
  const {
    user, loading: user_loading
  } = useUser()
  const { loading, error, data, refetch } = useQuery<{asset: Asset}>(
    GET_ASSET, {
      variables: { input: params.id },
      client: getClient().gql
    }
  );

  const onClick = useCallback(
    async () => {
      setWarning(undefined)        

      try {
        await getClient().gql.mutate<{ownAsset: Asset}>(
          {
            mutation: OWN_ASSET,
            variables: {
              input: {
                assetId: data.asset._id
              }
            }
          }
        )

        await refetch(
          {
            variables: {
              input: {
                assetId: data.asset._id
              }
            }
          }
        )
      } catch(e) {
        
        setWarning('error')
      }
    }, [getClient(), data]
  )
  console.log(data)

  const asset = data?.asset;
  const youOwnIt = user?._id && user?._id===asset?.owner?._id

  return (
<main className="flex min-h-screen flex-col w-full h-screen
                items-center justify-between relative">
  <div className='absolute rounded-md 
                  bg-slate-300 animate-pulse
                  h-screen w-full ' />
  <img src={asset?.image} 
        className={`absolute rounded-md object-cover h-full w-full 
                    transition-all duration-1000
                    ${asset?.image ? "opacity-100" : "opacity-0"}`} />
  <ShowIf show={!loading}>
    <div className='absolute w-96 h-fit p-5 left-10 top-10 bg-white/60
                    rounded-md shadow-xl backdrop-blur-sm
                    flex flex-col gap-3 border' >
      <p children={asset?.title} className='text-xl font-bold text-gray-500' />
      <p children={asset?.description} className='text-base text-gray-500'/>
      <div className='flex flex-row justify-between items-center'>
        <p children={asset?.price + '$'} className='text-green-600 font-mono font-bold' />
        <span children={asset?.tags?.[0]} 
                  className='bg-cyan-500 text-white text-xs 
                              border tracking-wider rounded-full 
                              px-1.5 border-cyan-400' />
      </div>
      <Switch show={youOwnIt}>
        <div className={`w-full bg-teal-600 text-white p-3 
                    rounded-md font-medium tracking-widest uppercase
                    flex flex-row justify-center items-center gap-3 `}>
          <AiTwotoneStar className='text-yellow-400 text-2xl'/>            
          <span children="you own it"/>
        </div>                    
        <Button children='Purchase' onClick={onClick} />
      </Switch>
      <Warning children={warning} className='opacity-60' />
    </div>
  </ShowIf>                

</main>
  )
}
