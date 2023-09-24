
interface Props extends BaseProps {
  children?: any;
}

export default function Button({ children, ...props } : Props) {
    return (
    <button children={children} 
          className='w-full bg-black text-white p-3 
                    rounded-md font-medium tracking-widest uppercase' 
          {...props} />
    )
}