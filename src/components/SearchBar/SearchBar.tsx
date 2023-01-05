import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hook'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import { setQuery } from '../../store/filteredProductsSlice'

import styles from './style.module.css'
import { querySelector } from '../../store/selectors/querySelector'

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch()

  const storeQuery = useAppSelector(querySelector)

  const [newQuery, setNewQuery] = useState<string>(storeQuery || '')

  useEffect(() => {
    return () => {
      dispatch(setQuery(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuery(e.target.value)
    // Для мгновенного поиска:
    // dispatch(setQuery(e.target.value))
    if (e.target.value === '') {
      dispatch(setQuery(''))
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(setQuery(newQuery))
  }

  return (
    <div className={styles.wrapper}>
      <Link to={ROUTES.main} className={styles.link}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Поиск по объявлениям"
          value={newQuery}
          onChange={handleChange}
        />
        <div className={styles.buttonWrapper}>
          <Button btnType="submit">Найти</Button>
        </div>
      </form>
    </div>
  )
}
