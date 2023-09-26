
export default function Capsule({ 
  children, className='bg-cyan-500 border-cyan-400 text-white text-xs' 
}) {

  if(!children)
    return null;

  return(
<span children={children} 
      className={`${className} 
                  border tracking-wider rounded-full 
                  px-1.5 w-fit`} />    
  )
}