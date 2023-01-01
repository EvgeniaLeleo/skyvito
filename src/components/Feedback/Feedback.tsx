import { FC } from 'react'

import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'

import styles from './style.module.css'

type Props = { review: User }

export const Feedback: FC<Props> = ({ review }) => {
  return (
    <div className={styles.review}>
      <div className={styles.avatarWrapper}>
        <Avatar user={review} />
      </div>

      <div className={styles.reviewContent}>
        <p className={styles.name}>
          {review.name} <span className={styles.date}>14 августа</span>
        </p>
        <h3 className={styles.comment}>Комментарий</h3>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  )
}
