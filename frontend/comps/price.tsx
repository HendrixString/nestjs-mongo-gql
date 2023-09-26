
export default function Price({ price }) {

  return (
<p children={price + '$'} 
    className='text-green-600 font-mono font-bold' />
  )
}