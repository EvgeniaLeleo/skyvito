import { useRef, useState } from 'react'
import { API_URL, TOKEN } from '../../constants'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import styles from './style.module.css'

export const UploadFile = () => {
  const filePicker = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  // const [uploaded, setUploaded] = useState()

  const handleChange = (event: any) => {
    console.log(event.target.files)
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('no file')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    console.log('formData', formData)

    const res = await fetch(`${API_URL}ads/1/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: formData,
    })

    const data = await res.json()
    console.log(data)

    // setUploaded(data)
  }

  // const handlePick = () => {
  //   if (filePicker.current) {
  //     filePicker.current.click()
  //   }
  // }

  return (
    <>
      <PlusIconInSquare
      // key={image + index}
      // onClick={handlePick}
      />
      <input
        className={styles.input}
        type="file"
        ref={filePicker}
        onChange={handleChange}
        accept="image/*"
      ></input>

      <button onClick={handleUpload}>Upload now!</button>

      {/* {selectedFile && selectedFile.name} */}
    </>
  )
}
