import { MdOutlineNavigateNext } from "react-icons/md";

interface Props {
  label?: string;
  labelRight?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

const ListNavigator = ({ label, labelRight, onPrev=undefined, onNext=undefined }: Props) => {
  return (
<div className='flex flex-row justify-between items-center'>
  <span children={label} 
        className='text-sm font-normal text-gray-500'/>
  <div className='flex flex-row items-center text-2xl text-gray-600'>
    <MdOutlineNavigateNext className='-rotate-180 cursor-pointer'
          onClick={onPrev}/>
    <span children={labelRight} className='text-xs font-mono' />
    <MdOutlineNavigateNext className=' cursor-pointer' 
          onClick={onNext}/>
  </div>
</div>
  )
}

export default ListNavigator;