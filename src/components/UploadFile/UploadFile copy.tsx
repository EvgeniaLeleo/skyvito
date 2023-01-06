import { FC, SetStateAction, useState } from 'react'

import { useUploadProductImageMutation } from '../../services/productsApi'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import styles from './style.module.css'

type Props = {
  productId?: number
  state: 'newProduct' | 'editProduct'
}

export const UploadFile: FC<Props> = ({ productId, state }) => {
  const [uploadedImage, setUploadedImage] = useState(null)
  // const [uploadImage] = useUploadProductImageMutation()

  // const dispatch = useAppDispatch()

  // const handleChange = async (event: { target: { files: any } }) => {
  const handleChange = (event: any) => {
    console.log(event.target.files[0])
    setUploadedImage(event.target.files[0])
  }
  // (event: { target: { files: any } }) => {
  //   const files = event.target.files
  //   const file = files[0]

  //   if (!file) {
  //     console.log('no file')
  //     return
  //   }

  //   if (files && file && state === 'newProduct') {
  //     // setUploadedImage(file)
  //     setUploadedImage(file)
  //   }

  //   const formData = new FormData()
  //   formData.append('file', file)

  //   // if (productId) {
  //   //   await uploadImage({ idx: productId, body: formData }).unwrap()
  //   // }
  // }

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
        <ImageWrapper
          imageUrl={URL.createObjectURL(uploadedImage)}
          cursor="default"
        />
      )}
    </>
  )
}

{
  /* <button onClick={() => setSelectedImage(null)}>Remove</button> */
}
