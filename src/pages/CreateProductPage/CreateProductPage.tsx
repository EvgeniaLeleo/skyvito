import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { Button } from '../../components/Button/Button'
import { NUMBER_OF_IMAGES } from '../../constants'
import { UploadNewImages } from '../../components/UploadNewImages/UploadNewImages'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../services/productsApi'
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import back from './assets/back.svg'
import styles from './style.module.css'

type Form = {
  title?: string
  description?: string
  price?: string
}

const validPrice = new RegExp(/^([0-9]*[.]?)?(\d{1,2})?$/i)
const regexp = new RegExp(/[^0-9.]/i)

let uploadedImagesArray = Array.from(Array(NUMBER_OF_IMAGES))
let formData = Array.from(Array(NUMBER_OF_IMAGES))

export const CreateProductPage = () => {
  const initialValue = {
    title: '',
    description: '',
    price: '',
  }

  const navigate = useNavigate()

  const [fieldValue, setFieldValue] = useState<Form>(initialValue)
  const [loading, setLoading] = useState<boolean>(false)
  const [price, setPrice] = useState<string>('')

  const [createProduct] = useCreateProductMutation()
  const [uploadImage] = useUploadProductImageMutation()

  const isFormValid = fieldValue.title?.length && price.toString().length

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ mode: 'onBlur' })

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setFieldValue((prev: Form) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPriceValue = e.target.value

    if (regexp.test(inputPriceValue)) {
      e.target.value = inputPriceValue.replace(regexp, '')
    }

    setPrice(e.target.value)
  }

  const handleBack = () => {
    navigate(-1)
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }

    let createdProductId: number | undefined

    try {
      setLoading(true)

      const response = await createProduct({
        title: data.title,
        price: Number(data.price),
        description: data.description,
      }).unwrap()

      createdProductId = response.id

      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        if (formData[i] && createdProductId) {
          await uploadImage({
            idx: createdProductId,
            body: formData[i],
          }).unwrap()
        }
      }

      setLoading(false)
      navigate(`${ROUTES.product}/${createdProductId}`)
    } catch {
      setLoading(false)
      console.log('error creating product')
      // goToLoginWithMessage(EXP_MESSAGE)
    }

    formData = formData.map((element) => undefined)
    uploadedImagesArray = uploadedImagesArray.map((element) => undefined)
  }

  return (
    <PageWrapper>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          <img
            className={styles.backbtn}
            src={back}
            alt="back"
            onClick={handleBack}
          />
          Новое объявление
        </h2>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cn(styles.inputRequired, styles.inputWrapper)}>
            <label className={styles.label}>
              Название
              <input
                {...register('title', {
                  required: 'Введите название',
                })}
                className={styles.input}
                type="text"
                placeholder="Введите название"
                value={fieldValue.title || ''}
                onChange={(e) => handleFieldChange(e, 'title')}
                autoFocus
              />
            </label>
            <div className={styles.error}>
              {errors.title && <p>{errors.title.message}</p>}
            </div>
          </div>
          <div className={cn(styles.areaContent, styles.inputWrapper)}>
            <label className={styles.label}>
              Описание
              <textarea
                {...register('description')}
                className={styles.textArea}
                rows={1}
                placeholder="Введите описание"
                value={fieldValue.description}
                onChange={(e) => handleFieldChange(e, 'description')}
              />
            </label>
          </div>
          <div className={styles.imgContent}>
            <p className={styles.textPhoto}>
              Фотографии товара
              <br />
              <span className={styles.limit}>
                не более {NUMBER_OF_IMAGES} фотографий
              </span>
            </p>
            <div className={styles.imagesWrapper}>
              <UploadNewImages
                formData={formData}
                uploadedImagesArray={uploadedImagesArray}
              />
            </div>
          </div>
          <div className={cn(styles.priceBlock, styles.inputWrapper)}>
            <label className={styles.label}>
              Цена
              <div className={styles.priceInput}>
                <input
                  {...register('price', {
                    required: 'Введите корректную цену',
                    pattern: {
                      value: validPrice,
                      message: 'Введите корректную цену',
                    },
                  })}
                  className={styles.input}
                  value={price}
                  onChange={handleChangePrice}
                />
                <div className={styles.currency}>₽</div>
              </div>
            </label>
            <div className={styles.error}>
              {errors.price && <p>{errors.price.message}</p>}
            </div>
          </div>

          <Button
            btnType="submit"
            buttonStatus={isFormValid && !loading ? 'normal' : 'disabled'}
          >
            Опубликовать
          </Button>
        </form>
      </div>
    </PageWrapper>
  )
}
