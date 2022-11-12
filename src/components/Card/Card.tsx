import { Skeleton } from '@mui/material'
import { FC, useState } from 'react'

import { CourseMainData } from '../../types'

import styles from './style.module.css'

type Props = { item: CourseMainData }

export const Card: FC<Props> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(true)

  const handleLoad = () => setLoading(false)

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        {loading && (
          <Skeleton variant="rectangular" className={styles.skeleton} />
        )}
        <img
          className={styles.img}
          // src={`url(${item.imgUrl})`}
          width="100%"
          height="100%"
          src={`${item.image_link}`}
          alt={item.name}
          onLoad={handleLoad}
        />
      </div>
      {/* <p className={styles.title}>{item.name}</p>
      <p className={styles.price}>{item.price}</p>
      <p className={styles.location}>{item.location} ₽</p>
      <p className={styles.date}>{item.date}</p> */}
      <p className={styles.title}>{item.name}</p>
      <p className={styles.price}>{item.weight_min} ₽</p>
      <p className={styles.location}>{item.animal_type} ₽</p>
      <p className={styles.date}>{item.lifespan}</p>
    </div>
  )
}
