"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { Asset, PaginatedAssets } from '@/lib/types'
import ListNavigator from '@/comps/list-navigator'
import AssetListItem from '@/comps/asset-list-item'

const test = {
  "data": {
      "assets": {
          "assets": [
              {
                  "_id": "650d9f35c827d0adb4695d65",
                  "description": null,
                  "title": "house 1",
                  "owner": {
                      "name": "admin",
                      "_id": "650dd51c724609c6c73b1f37",
                      "__typename": "User"
                  },
                  "price": 100.2,
                  "tags": [
                      "tomer"
                  ],
                  "__typename": "Asset"
              },
              {
                  "_id": "650d9f41c827d0adb4695d69",
                  "description": null,
                  "title": "house 2",
                  "owner": null,
                  "price": 100.2,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "650dea7cb835f59977765690",
                  "description": null,
                  "title": "house 2",
                  "owner": null,
                  "price": 100.2,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "650dea9bb835f59977765694",
                  "description": null,
                  "title": "house 2",
                  "owner": null,
                  "price": 100.2,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "650deb12fce68f22cb68017f",
                  "description": null,
                  "title": "house 2",
                  "owner": null,
                  "price": 100.2,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "650f2b3c61280eed48d01e5d",
                  "description": null,
                  "title": "house 2",
                  "owner": null,
                  "price": 100.2,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "6511ad6c9d230307cb8a9cfb",
                  "description": "wdwe23232d2d",
                  "title": "wedwe",
                  "owner": null,
                  "price": 2323,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "6511adba9d230307cb8a9cfd",
                  "description": "One of our finest assets",
                  "title": "Asset 1",
                  "owner": null,
                  "price": 2323,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "6511adca9d230307cb8a9cff",
                  "description": "One of our finest assets",
                  "title": "Asset 2",
                  "owner": null,
                  "price": 3234,
                  "tags": [],
                  "__typename": "Asset"
              },
              {
                  "_id": "6511adda9d230307cb8a9d01",
                  "description": "One of our finest assets",
                  "title": "Asset 3",
                  "owner": null,
                  "price": 3234,
                  "tags": [],
                  "__typename": "Asset"
              }
          ],
          "count": 16,
          "__typename": "GetAssetsPaginatedResponse"
      }
  }
}

export default function() {
  const refs = useRef({})
  const [warning, setWarning] = useState<string>()
  // const { loading, data, refetch } = useQuery<{ assets: PaginatedAssets }>(GET_ASSETS, {
  //   variables: {
  //     limit: 10,
  //     skip: 0,
  //   },
  //   client: getClient().gql
  // })

  const onPrev = useCallback(
    async () => {
 
    }, []
   )
 
  const onNext = useCallback(
   async () => {

   }, []
  )

  const onClick = useCallback(
    async () => {
      setWarning(undefined)
      
      // send to api
      try {
      } catch(e) {
        setWarning('sign up error')
      }
      
    }, []
  )

  let data = test.data;
  const assets: Asset[] = data?.assets?.assets ?? []
  const count_string = `${data?.assets?.count} results`
  
  if(!data)
    return null;

  return (
<main className="bg-slate-50 m-5">
  <div className='w-fit mx-auto'>
    <ListNavigator label={count_string} onPrev={onPrev} onNext={onNext} />
    <div className='grid
                    grid-cols-2 gap-5
                  sm:grid-cols-3
                  max-w-2xl'>
    {
      assets.map(
        (asset, ix) => (
          <AssetListItem asset={asset} key={asset._id} />
        )
      )
    }
    </div>     
  </div>
</main>
  )
}
