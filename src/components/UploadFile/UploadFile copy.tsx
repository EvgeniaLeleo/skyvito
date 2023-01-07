import { FC, useState } from 'react'

import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import styles from './style.module.css'

type Props = {
  productId?: number
  state: 'newProduct' | 'editProduct'
}

export const UploadFile: FC<Props> = ({ productId, state }) => {
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleChange = (event: any) => {
    console.log(event.target.files[0])
    setUploadedImage(event.target.files[0])
  }

  return (
    <>
      {!uploadedImage && (
        <label>
          <PlusIconInSquare />
          <input
            className={styles.input}
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
      )}

      {!!uploadedImage && (
        <ImageWrapper
          imageUrl={URL.createObjectURL(uploadedImage)}
          cursor="default"
        />
      )}
    </>
  )
}
