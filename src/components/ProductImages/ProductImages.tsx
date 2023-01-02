import React from 'react'
import { FC, useState } from 'react'
import { API_URL, NUMBER_OF_IMAGES } from '../../constants'
import { useDeleteProductImageMutation } from '../../services/productsApi'
import { Product } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { UploadFile } from '../UploadFile/UploadFile'
import deleteButton from './delete-button.svg'

import styles from './style.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

type Props = {
  product: Product
}

export const ProductImages: FC<Props> = ({ product }) => {
  const [deleting, setDeleting] = useState(false)

  const [deleteImage] = useDeleteProductImageMutation()

  const additionArrayLength = product?.images.length
  const additionArray = additionArrayLength
    ? Array.from(Array(imgArray.length - additionArrayLength).keys())
    : imgArray

  const handleDeleteImage: ({
    idx,
    imgUrl,
  }: {
    idx: number
    imgUrl: string
  }) => Promise<void> = async ({ idx, imgUrl }) => {
    if (deleting) {
      return
    }

    setDeleting(true)
    try {
      await deleteImage({ idx, imgUrl }).unwrap()
    } catch (error) {
      console.log(error)
    }
    setDeleting(false)
  }

  return (
    <>
      {product.images.map((image, index) => (
        <div
          className={styles.imgContainer}
          key={image.url}
          onClick={() => {
            handleDeleteImage({ idx: product.id, imgUrl: image.url })
          }}
        >
          <img
            className={!deleting ? styles.deleteImageButton : styles.blocked}
            src={deleteButton}
            alt="Delete"
          />

          <ImageWrapper
            imageUrl={image.url ? API_URL + image.url : ''}
            name={`Фото ${index}`}
            key={image.url}
            cursor="default"
          />
        </div>
      ))}

      {product?.images.length < NUMBER_OF_IMAGES &&
        additionArray.map((el) => (
          <React.Fragment key={el}>
            <UploadFile productId={product?.id} />
          </React.Fragment>
        ))}
    </>
  )
}
