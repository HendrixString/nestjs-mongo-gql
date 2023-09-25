
interface Props extends BaseProps {
  children?: any;
}

export default function Warning({ children, className, ...props } : Props) {
  if(!children)
    return null;
  return (
  <div children={children} 
        className={`w-full bg-red-50 p-3 
                  text-red-500
                  border border-red-400
                  rounded-md ` + className}
        {...props} />
  )
}