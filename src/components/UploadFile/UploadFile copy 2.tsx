import { useRef, useState } from 'react'
import { API_URL, TOKEN } from '../../constants'
import { Product } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import styles from './style.module.css'

export const UploadFile = () => {
  const filePicker = useRef<HTMLInputElement>(null)
  // const [selectedFile, setSelectedFile] = useState(null)
  const [uploaded, setUploaded] = useState<Product>()

  const handleChange = async (event: any) => {
    // console.log('event.target.files', event.target.files)
    // setSelectedFile(event.target.files[0])
    const file = event.target.files[0]
    // console.log('selectedFile', selectedFile)
    // }

    // const handleUpload = async () => {
    // console.log('selectedFile', selectedFile)

    if (!file) {
      console.log('no file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    // console.log('formData', formData)

    const res = await fetch(`${API_URL}ads/1/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: formData,
    })

    const data = await res.json()
    // console.log('data', data)

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

          {/* {selectedFile && selectedFile.name} */}
        </div>
      )}
      {!!uploaded && (
        <ImageWrapper
          imageUrl={
            uploaded?.images[0]?.url
              ? API_URL + uploaded?.images[uploaded?.images.length - 1]?.url
              : ''
          }
          cursor="pointer"
        />
      )}
    </>
  )
}
