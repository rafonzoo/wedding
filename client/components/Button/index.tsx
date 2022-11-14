import type { RFC } from 'client/types'

import { useConnection } from 'client/hooks'

const Button: RFC<{}, 'button'> = ({ children, ...props }) => {
  const isOnline = useConnection()

  return (
    <button {...props} disabled={props.disabled || !isOnline}>
      {children}
    </button>
  )
}

export default Button
