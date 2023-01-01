import { FC, useRef, useState } from 'react'

import { API_URL, TOKEN } from '../../constants'
import { useAppDispatch } from '../../hook'
import { Product } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import styles from './style.module.css'

type Props = {
  productId?: number
}

export const UploadFile: FC<Props> = ({ productId }) => {
  const filePicker = useRef<HTMLInputElement>(null)
  const [uploaded, setUploaded] = useState<Product>()

  const dispatch = useAppDispatch()

  const handleChange = async (event: any) => {
    const file = event.target.files[0]

    if (!file) {
      console.log('no file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch(`${API_URL}ads/${productId}/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: formData,
    })

    const data = await res.json()

    setUploaded(data)
  }

  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click()
    }
  }

  return (
    <>
      {!uploaded && (
        <div>
          <PlusIconInSquare onClick={handlePick} />
          <input
            className={styles.input}
            type="file"
            ref={filePicker}
            onChange={handleChange}
            accept="image/*"
          ></input>
        </div>
      )}
      {!!uploaded && (
        <ImageWrapper
          imageUrl={
            uploaded.images[0]?.url
              ? API_URL + uploaded.images[uploaded.images.length - 1]?.url
              : ''
          }
          cursor="default"
        />
      )}
    </>
  )
}
