import { FC } from 'react'

import { CardMainData } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'

import styles from './style.module.css'

type Props = { product: CardMainData }

export const Card: FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrapperMB}>
        <ImageWrapper
          imageUrl={product?.image_link}
          name={product?.name}
          cursor="pointer"
        />
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>{product.name}</p>
        <p className={styles.price}>{product.weight_min} ₽</p>
        <p className={styles.location}>{product.animal_type} ₽</p>
        <p className={styles.date}>{product.lifespan}</p>
      </div>
    </div>
  )
}
