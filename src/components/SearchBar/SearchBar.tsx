import { FC } from 'react'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const SearchBar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Logo mr="60px" />
      <form className={styles.form}>
        <input className={styles.input} placeholder="Поиск по объявлениям" />
        <Button btnType="submit">Найти</Button>
      </form>
    </div>
  )
}
