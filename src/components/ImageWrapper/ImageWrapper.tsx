import { FC, useState } from 'react'
import { Skeleton } from '@mui/material'

import styles from './style.module.css'

type Props = { imageUrl?: string; name?: string; mb?: string }

export const ImageWrapper: FC<Props> = ({ imageUrl, name, mb }) => {
  const [loading, setLoading] = useState<boolean>(true)

  const handleLoad = () => setLoading(false)

  return (
    <div className={styles.imgWrapper} style={{ marginBottom: mb }}>
      {loading && (
        <Skeleton variant="rectangular" className={styles.skeleton} />
      )}
      <img
        className={styles.img}
        width="100%"
        height="100%"
        src={imageUrl}
        alt={name}
        onLoad={handleLoad}
      />
    </div>
  )
}
