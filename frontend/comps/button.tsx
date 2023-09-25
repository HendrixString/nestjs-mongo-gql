import { useCallback, useState } from "react";
import { BiLoaderCircle } from 'react-icons/bi'

interface Props extends BaseProps {
  children?: any;
}

export default function Button({ children, onClick, className, ...props } : Props) {
  const [loading, setLoading] = useState(false);

  const internal_onClick = useCallback(
    async () => {
      setLoading(true)
      await onClick()
      setLoading(false)
    }, [onClick]
  )

  return (
  <button
        className={`w-full bg-black text-white p-3 
                  rounded-md font-medium tracking-widest uppercase
                  flex flex-row justify-center items-center ` + className} 
        onClick={internal_onClick}
        {...props}>
    { children }
    <BiLoaderCircle className={'animate-spin ' + (loading ? 'inline-block' : 'hidden')} />
  </button>
  )
}