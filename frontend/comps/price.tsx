
// Create our number formatter.
const formatter = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }
)

export default function Price({ price }) {

  return (
<p children={formatter.format(parseFloat(price))} 
    className='text-teal-800 font-extrabold --font-mono text-base' />
  )
}