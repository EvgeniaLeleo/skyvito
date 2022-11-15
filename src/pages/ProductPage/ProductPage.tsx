// import { Link } from 'react-router-dom'

// import { useAppSelector } from '../../hooks/appHooks'
// import { selectCurrentUser } from '../../slices/currentUserSlice'

import { FC, SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../components/Header/Header'
import { ending } from '../../utils'
import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { USER } from '../../constants'
import { ImageWrapper } from '../../components/ImageWrapper/ImageWrapper'

import data from '../../data.json'

import styles from './style.module.css'
import { FeedbackModal } from '../../modals/FeedbackModal/FeedbackModal'
import { EditProductModal } from '../../modals/EditProductModal/EditProductModal'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'

const dataPrev = [data[0], data[1], data[2], data[3], data[4]]

type Props = { state?: 'buyer' | 'seller' }

export const ProductPage: FC<Props> = ({ state = 'seller' }) => {
  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  const params = useParams()
  const product = data.find((item) => item.id === Number(params.productId))

  const handleFeedbackClick = () => {
    setIsFeedbackModalShown(true)
  }

  const handleEditProduct = () => {
    setIsEditModalShown(true)
  }

  const [imgUrl, setImgUrl] = useState(product?.image_link)
  const [isFeedbackModalShown, setIsFeedbackModalShown] =
    useState<boolean>(false)
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false)

  const handleShowImage = (e: {
    target: { src: SetStateAction<string | undefined> }
  }) => {
    setImgUrl(e.target.src)
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.productContent}>
          <div className={styles.imgBlock}>
            <ImageWrapper imageUrl={imgUrl} name={product?.name} mb="20px" />
            <div className={styles.previewWrapper}>
              {dataPrev.map((product) => (
                <ImageWrapper
                  imageUrl={product.image_link}
                  name={product.name}
                  key={product.image_link}
                  onClick={handleShowImage}
                  cursor="pointer"
                />
              ))}
            </div>
          </div>

          <div className={styles.productData}>
            <h1 className={styles.title}>{product?.name}</h1>
            <p className={styles.location}>{product?.animal_type}</p>
            <p className={styles.date}>{product?.length_min}</p>
            <p className={styles.feedback} onClick={handleFeedbackClick}>
              {product?.lifespan} отзыв{ending(product?.lifespan)}
            </p>
            <p className={styles.price}>{product?.weight_min} ₽</p>

            {state === 'buyer' ? (
              <Button size="l" mb="34px">
                Показать&nbsp;телефон 8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ
              </Button>
            ) : (
              <div className={styles.buttonWrapper}>
                <Button size="xl" onClick={handleEditProduct}>
                  Редактировать
                </Button>
                <Button size="xl">Снять с публикации</Button>
              </div>
            )}

            <div className={styles.seller}>
              <div className={styles.avatarWrapper}>
                <Avatar user={USER} />
              </div>
              <div className={styles.sellerData}>
                <p className={styles.sellerName}>{product?.animal_type}</p>
                <p className={styles.sellerExp}>
                  Продает товары с {product?.weight_max}
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles.subtitle}>Описание товара</h2>
        <p className={styles.description}>
          {product?.description ? product?.description : 'Описание отсутствует'}
        </p>

        {isFeedbackModalShown && (
          <FeedbackModal setIsOpened={setIsFeedbackModalShown} />
        )}

        {isEditModalShown && (
          <EditProductModal setIsOpened={setIsEditModalShown} mode="edit" />
        )}
      </div>
      {/* <Footer />  */}
    </>
  )
}
