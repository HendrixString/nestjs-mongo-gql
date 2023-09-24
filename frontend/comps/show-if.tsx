import { Children } from 'react'
export const ShowIf = ({ show, children }) => {

  return show ? children : null;
}

export const Switch = ({ show, children }) => {
  const cc = Children.toArray(children)

  return show ? cc[0] : cc[1];
}
