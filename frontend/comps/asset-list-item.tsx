import { Asset } from "@/lib/types";
import Capsule from "./capsule";
import Price from "./price";
import Link from "next/link";
import { ShowIf } from "./show-if";
import { AiTwotoneStar } from "react-icons/ai";
import useUser from "@/lib/hooks/use-user";

interface Props {
  asset?: Asset;
  className?: string;
  [x: string]: any;
}

const IMG = "https://i.pinimg.com/550x/fc/07/40/fc0740d7c26d93974e117cb88a81bc36.jpg"

const AssetListItem = ({ asset, ...rest } : Props ) => {
  const { user } = useUser()
  const youOwnIt = asset?.owner && asset?.owner?._id===user?._id
  console.log(asset.image)
  return (
<Link href={`/assets/${asset?._id}`}>
<div className='h-fit w-full bg-slate-100 border rounded-md shadow-sm
                flex flex-col relative overflow-clip cursor-pointer '>
  <div className='w-full h-fit overflow-clip'>
    <img src={asset?.image} 
        className='bg-slate-100 w-full min-w-[10rem] h-40 object-cover
                  hover:scale-105 transition-all duration-300' />
  </div>                  
  <div className='p-2'>
  <Price price={asset?.price} />
    <Capsule children={asset?.tags?.[0]} />
  </div>
  <ShowIf show={youOwnIt}>
    <p className='flex flex-row w-fit items-center text-white text-xs
                  bg-black rounded-r-xl absolute left-0 top-5 gap-1 p-0.5'>
      You Own It
      <AiTwotoneStar className='text-yellow-400 text-lg'/>            
    </p>
  </ShowIf>
</div>   
</Link>     
  )
}

export default AssetListItem;