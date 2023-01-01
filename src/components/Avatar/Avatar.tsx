import { FC } from 'react'

import { User } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'

import styles from './style.module.css'

type Props = {
  user?: User
  mb?: string
}

export const Avatar: FC<Props> = ({ user, mb }) => {
  return (
    <div className={styles.wrapper} style={{ marginBottom: mb }}>
      <ImageWrapper imageUrl={user?.avatarLink} name={user?.name} mb="10px" />
    </div>
  )
}
