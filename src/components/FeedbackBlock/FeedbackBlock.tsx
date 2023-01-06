import { FC } from 'react'

import { Feedback } from '../../types'
import { convertDate } from '../../utils/convertDate'
import { Avatar } from '../Avatar/Avatar'

import styles from './style.module.css'

type Props = { comment: Feedback }

export const FeedbackBlock: FC<Props> = ({ comment }) => {
  return (
    <div className={styles.review}>
      <div className={styles.avatarWrapper}>
        <Avatar user={comment.author} />
      </div>

      <div className={styles.reviewContent}>
        <p className={styles.name}>
          {comment.author.name}{' '}
          <span className={styles.date}>{convertDate(comment.created_on)}</span>
        </p>
        {/* <h3 className={styles.comment}>Комментарий</h3> */}
        <p className={styles.text}>{comment.text}</p>
      </div>
    </div>
  )
}
