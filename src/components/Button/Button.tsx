import { FC, ReactNode } from 'react'
import cn from 'classnames'

import styles from './style.module.css'

type Props = {
  type?: 'action' | 'outlined' | 'secondary'
  size?: 's' | 'm' | 'l' | 'xl'
  buttonStatus?: 'normal' | 'disabled'
  children?: string | ReactNode
  btnType?: 'button' | 'submit' //| 'reset'
  onClick?: VoidFunction
  mb?: string
}

export const Button: FC<Props> = ({
  type = 'action',
  buttonStatus = 'normal',
  children,
  btnType,
  onClick,
  mb,
  size,
}) => {
  const buttonClassName = cn(
    styles.button,
    styles[`${type}`],
    styles[`${buttonStatus}`],
    styles[`${size}`]
  )

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={btnType}
      disabled={buttonStatus === 'disabled'}
      style={{ marginBottom: mb }}
    >
      {children ? children : ''}
    </button>
  )
}
