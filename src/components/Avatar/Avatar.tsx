import { FC } from 'react'
import { API_URL } from '../../constants'

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
      <ImageWrapper
        imageUrl={user?.avatar ? API_URL + user?.avatar : ''}
        name={user?.name}
        mb="10px"
      />
    </div>
  )
}
