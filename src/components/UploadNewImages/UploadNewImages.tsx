import React, { useEffect } from 'react'
import { FC, useState } from 'react'

import { NUMBER_OF_IMAGES } from '../../constants'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import deleteButton from './assets/delete-button.svg'
import styles from './style.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

type Props = {
  formData: any
  uploadedImagesArray: any // Blob[] | MediaSource[]
}

export const UploadNewImages: FC<Props> = ({
  formData,
  uploadedImagesArray,
}) => {
  const [uploadedImages, setUploadedImages] = useState(uploadedImagesArray)

  // Updating the photo-preview array
  useEffect(() => {
    setUploadedImages(uploadedImagesArray)
  }, [uploadedImagesArray])

  const handleChange = async (event: any, index: number) => {
    const files = event.target.files
    const file = files[0]

    // Loading photo-preview
    setUploadedImages((prev: Blob[] | MediaSource[]) => [
      ...prev.slice(0, index),
      file,
      ...prev.slice(index + 1),
    ])

    formData[index] = new FormData()
    formData[index].append('file', file)
  }

  const handleDeleteImages = (index: number) => {
    setUploadedImages((prev: any) => [
      ...prev.slice(0, index),
      undefined,
      ...prev.slice(index + 1),
    ])

    formData[index] = undefined
  }

  return (
    <>
      {imgArray.map((el, index) => (
        <React.Fragment key={index.toString()}>
          {!!uploadedImages[index] && (
            <div className={styles.imgContainer}>
              <img
                className={styles.deleteImageButton}
                src={deleteButton}
                alt="Delete"
                onClick={() => handleDeleteImages(index)}
              />
              <ImageWrapper
                imageUrl={URL.createObjectURL(uploadedImages[index])}
                cursor="default"
              />
            </div>
          )}

          {!uploadedImages[index] && (
            <label className={styles.labelUpload}>
              <PlusIconInSquare />
              <input
                className={styles.input}
                type="file"
                onChange={(e) => handleChange(e, index)}
                accept="image/*"
              />
            </label>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
