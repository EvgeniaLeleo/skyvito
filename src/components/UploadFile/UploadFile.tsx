import { FC, useState } from 'react'

import { useUploadProductImageMutation } from '../../services/productsApi'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import styles from './style.module.css'

type Props = {
  productId?: number
}

export const UploadFile: FC<Props> = ({ productId }) => {
  const [uploadedImage, setUploadedImage] = useState<string>()
  const [uploadImage] = useUploadProductImageMutation()

  // const dispatch = useAppDispatch()

  const handleChange = async (event: any) => {
    const files = event.target.files
    const file = files[0]

    if (!file) {
      console.log('no file')
      return
    }

    if (files && file) {
      setUploadedImage(URL.createObjectURL(file))
    }

    const formData = new FormData()
    formData.append('file', file)

    await uploadImage({ idx: productId, body: formData }).unwrap()
  }

  // console.log(uploadedImage)

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
        <ImageWrapper imageUrl={uploadedImage} cursor="default" />
      )}
    </>
  )
}
