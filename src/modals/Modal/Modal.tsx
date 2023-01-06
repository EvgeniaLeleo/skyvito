import { FC, ReactNode } from 'react'

import { useEscapeKey } from '../../hooks/useEscapeKey'

import styles from './style.module.css'

type ModalProps = {
  isOpen: Function
  children?: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  useEscapeKey(isOpen)

  return (
    // <div data-cy="modal" className={styles.modal} onClick={() => isOpen()}>
    <div data-cy="modal" className={styles.modal}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
