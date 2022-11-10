import { FC } from 'react'

import { CourseMainData } from '../../types'

import styles from './style.module.css'

type Props = { item: CourseMainData }

export const Card: FC<Props> = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          // src={`url(${item.imgUrl})`}
          src={`${item.image_link}`}
          alt={item.name}
        />
      </div>
      {/* <p className={styles.title}>{item.name}</p>
      <p className={styles.price}>{item.price}</p>
      <p className={styles.date}>{item.date}</p> */}
      <p className={styles.title}>{item.name}</p>
      <p className={styles.price}>{item.weight_min} ₽</p>
      <p className={styles.location}>{item.animal_type} ₽</p>
      <p className={styles.date}>{item.lifespan}</p>
    </div>
  )
}
