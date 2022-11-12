import React, { FC } from 'react'

import cn from 'classnames'

import styles from './style.module.css'

type Props = {
  value?: string
  label?: string
  placeholder?: string
  size?: 'm' | 'l'
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const noop = () => void {}

export const Input: FC<Props> = ({
  size,
  label,
  placeholder,
  value = '',
  type = 'text',
  onChange = noop,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.inputWrapper,
        { [styles.sizeM]: size === 'm' },
        { [styles.sizeL]: size === 'l' }
      )}
    >
      <label className={styles.label} htmlFor="name">
        {label}
      </label>
      <input
        className={styles.input}
        // name="name"
        type={type}
        // value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
