import { FC } from 'react'

import { CardMainData } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'

import styles from './style.module.css'

type Props = { product: CardMainData }

export const Card: FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <ImageWrapper
        imageUrl={product?.image_link}
        name={product?.name}
        mb="20px"
      />
      {/* <p className={styles.title}>{product.name}</p>
      <p className={styles.price}>{product.price}</p>
      <p className={styles.location}>{product.location} ₽</p>
      <p className={styles.date}>{product.date}</p> */}
      <p className={styles.title}>{product.name}</p>
      <p className={styles.price}>{product.weight_min} ₽</p>
      <p className={styles.location}>{product.animal_type} ₽</p>
      <p className={styles.date}>{product.lifespan}</p>
    </div>
  )
}
