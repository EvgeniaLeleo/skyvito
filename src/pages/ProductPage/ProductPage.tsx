// import { Link } from 'react-router-dom'

// import { useAppSelector } from '../../hooks/appHooks'
// import { selectCurrentUser } from '../../slices/currentUserSlice'

import { FC, SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../components/Header/Header'
import { ending } from '../../utils/ending'
import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { USER } from '../../constants'
import { ImageWrapper } from '../../components/ImageWrapper/ImageWrapper'

// import data from '../../data.json'

import styles from './style.module.css'
import { FeedbackModal } from '../../modals/FeedbackModal/FeedbackModal'
import { EditProductModal } from '../../modals/EditProductModal/EditProductModal'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'
import {
  useGetProductCommentsQuery,
  useGetProductQuery,
} from '../../services/productsApi'
import { convertDate } from '../../utils/convertDate'

type Props = { state?: 'buyer' | 'seller' }

export const ProductPage: FC<Props> = ({ state = 'seller' }) => {
  const productId = Number(useParams()?.id)
  const { data: product, isLoading: productIsLoading } =
    useGetProductQuery(productId)
  const { data: comments } = useGetProductCommentsQuery(productId)
  const productPreview = [
    product?.images[0],
    product?.images[1],
    product?.images[2],
    product?.images[3],
    product?.images[4],
  ]
  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  // const product = product.find((item) => item.id === Number(params.productId))

  const handleFeedbackClick = () => {
    setIsFeedbackModalShown(true)
  }

  const handleEditProduct = () => {
    setIsEditModalShown(true)
  }

  const [imgUrl, setImgUrl] = useState(product?.images[0]?.url || '')
  const [isFeedbackModalShown, setIsFeedbackModalShown] =
    useState<boolean>(false)
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false)

  const handleShowImage = (e: {
    target: { src: SetStateAction<string | undefined> }
  }) => {
    // let target = e.target.src ? e.target.src : ''
    // setImgUrl(target)
  }

  if (productIsLoading)
    return (
      // <Page>
      <div className={styles.content}>Загрузка...</div>
      // </Page>
    )

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.productContent}>
          <div className={styles.imgBlock}>
            <ImageWrapper imageUrl={imgUrl} name={product?.title} mb="20px" />
            <div className={styles.previewWrapper}>
              {productPreview.map((product, index) => (
                <ImageWrapper
                  imageUrl={product?.url}
                  // name={product?.title}
                  key={index.toString() + product?.url}
                  onClick={handleShowImage}
                  cursor="pointer"
                />
              ))}
            </div>
          </div>

          <div className={styles.productData}>
            <h1 className={styles.title}>{product?.title}</h1>
            <p className={styles.location}>{product?.user.city}</p>
            <p className={styles.date}>
              {convertDate(product?.created_on || '')}
            </p>
            <p className={styles.feedback} onClick={handleFeedbackClick}>
              {comments?.map((comment, index) => (
                <span key={index.toString() + comment?.text}>
                  {comment?.text} отзыв{ending(comment?.text)}
                </span>
              ))}
            </p>
            <p className={styles.price}>{product?.price} ₽</p>

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
                {/* <Avatar user={USER} /> */}
              </div>
              <div className={styles.sellerData}>
                <p className={styles.sellerName}>{product?.user.name}</p>
                <p className={styles.sellerExp}>
                  Продает товары с{/*  {product?.user.} */}
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
