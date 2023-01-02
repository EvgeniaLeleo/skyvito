import React, { FC, useState } from 'react'
import cn from 'classnames'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { Modal } from '../Modal/Modal'
import { Product } from '../../types'
import { UploadFile } from '../../components/UploadFile/UploadFile'
import { NUMBER_OF_IMAGES } from '../../constants'
import { ProductImages } from '../../components/ProductImages/ProductImages'

import styles from './style.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

type Props = {
  setIsOpened: Function
  mode?: 'new' | 'edit'
  product?: Product
}

type Form = {
  [index: string]: string
  name: string
  description: string
  price: string
}

const initialValue = {
  name: '',
  description: '',
  price: '',
}

export const EditProductModal: FC<Props> = ({
  mode = 'new',
  setIsOpened,
  product,
}) => {
  // const dispatch = useAppDispatch()
  // const modalShownName = useAppSelector(selectModal)
  // const { data: product, isLoading: productIsLoading } =
  //   useGetProductQuery(productId)

  // console.log(product)

  const [fieldValue, setFieldValue] = useState<Form>(initialValue)

  const title = mode === 'new' ? 'Новое объявление' : 'Редактировать объявление'
  const buttonName = mode === 'new' ? 'Опубликовать' : 'Сохранить'

  const handleClose = () => {
    console.log('close btn')
    // dispatch(hideModals())
  }

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setFieldValue((prev: Form) => ({ ...prev, [field]: e.target.value }))
  }

  const checkFormValid = () => {
    // for (const input in fieldValue) {
    //   if (fieldValue[input].length === 0) {
    //     return false
    //   }
    // }

    if (fieldValue.name.length === 0 || fieldValue.price.length === 0) {
      return false
    }

    return true
  }

  return (
    <Modal isOpen={setIsOpened}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.closeButton} onClick={handleClose}>
          <CrossIcon />
        </div>
        <form className={styles.form} id="formNewArt" action="#">
          <div className={styles.formContent}>
            <label htmlFor="name" className={styles.label}>
              Название
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Введите название"
              value={fieldValue.name}
              onChange={(e) => handleFieldChange(e, 'name')}
              autoFocus
            />
          </div>
          <div className={cn(styles.formContent, styles.areaContent)}>
            <label htmlFor="text" className={styles.label}>
              Описание
            </label>
            <textarea
              className={styles.textArea}
              rows={1}
              placeholder="Введите описание"
              value={fieldValue.description}
              onChange={(e) => handleFieldChange(e, 'description')}
            />
          </div>
          <div className={styles.formContent}>
            <p className={styles.textPhoto}>
              Фотографии товара&nbsp;&nbsp;
              <span className={styles.limit}>
                не более {NUMBER_OF_IMAGES} фотографий
              </span>
            </p>
            <div className={styles.imagesWrapper}>
              {mode === 'new' &&
                imgArray.map((image) => (
                  <React.Fragment key={image}>
                    <UploadFile productId={product?.id} />
                  </React.Fragment>
                ))}
              {mode === 'edit' && !!product && (
                <ProductImages product={product} />
              )}
            </div>
          </div>
          <div className={cn(styles.formContent, styles.priceBlock)}>
            <label htmlFor="price" className={styles.label}>
              Цена
            </label>
            <div className={styles.priceInput}>
              <input
                className={cn(styles.input, styles.price)}
                type="text"
                value={fieldValue.price}
                onChange={(e) => handleFieldChange(e, 'price')}
              />
              {/* TODO: проверка на натуральное число */}
              <div className={styles.currency}>₽</div>
            </div>
          </div>

          <Button buttonStatus={checkFormValid() ? 'normal' : 'disabled'}>
            {buttonName}
          </Button>
        </form>
      </div>
    </Modal>
  )
}

// {isModalOpen && (
//   <Modal isOpen={setIsOpened}>
