import { FC } from 'react'
import { UserRESTAPI } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'

import styles from './style.module.css'

type Props = {
  user: UserRESTAPI
}

export const Avatar: FC<Props> = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <ImageWrapper imageUrl={user.avatarLink} name={user.name} mb="10px" />
    </div>
  )
}
