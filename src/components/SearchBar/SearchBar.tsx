import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const SearchBar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Link to={ROUTES.main} className={styles.link}>
        {/* <Logo mr="60px" /> */}
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
      </Link>
      <form className={styles.form}>
        <input className={styles.input} placeholder="Поиск по объявлениям" />
        <div className={styles.buttonWrapper}>
          <Button btnType="submit">Найти</Button>
        </div>
      </form>
    </div>
  )
}
