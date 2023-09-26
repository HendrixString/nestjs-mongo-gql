"use client"

import { useMemo, useState } from 'react'
import { Asset } from '@/lib/types'
import ListNavigator from '@/comps/list-navigator'
import AssetListItem from '@/comps/asset-list-item'
import { ShowIf } from '@/comps/show-if'
import useAssets from '@/lib/hooks/use-assets'
import { text_to_tokens } from '../utils/text'

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

interface SearchParams {
  [key: string]: string | string[] | undefined
}

interface Params {
  searchParams?: SearchParams
}

const tags_to_filters = (text: string) => {
  const tags: string[] = text_to_tokens(text)
  if(tags.length==0)
    return undefined;

  return {
    "tags": {
      "$in" : tags 
    }
  }
}

const NoResults = () => {
  return (
<p children='No results :(' 
    className='mt-5 text-2xl text-gray-500 mx-auto w-fit'/>    
  )
}

export default function({ searchParams } : Params) {
  const [warning, setWarning] = useState<string>()

  // build the filters object
  const filters = useMemo(
    () => {
      return tags_to_filters(searchParams?.tags as string)
    }, [searchParams?.tags]
  )

  // hook for assets pagination and filtering
  const {
    pages_count, items_count, page, loading, resolvedData, 
    previous, next
  } = useAssets(0, 10, filters)

  const assets: Asset[] = resolvedData?.assets?.assets ?? []
  const count_string = `${resolvedData?.assets?.count} results`;
  let page_string = pages_count ? `${page + 1} / ${pages_count}` : '';

  if(items_count==0 && !loading)
    return (<NoResults/>)

  return (
<main className="bg-slate-50 m-5">
  <div className='w-full max-w-2xl mx-auto'>
    <ShowIf show={resolvedData}>
      <ListNavigator label={count_string} labelRight={page_string} 
                      onPrev={previous} onNext={next} />
    </ShowIf>
    <div className='grid
                    grid-cols-2 gap-5
                    sm:grid-cols-3
                    w-full'>
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
