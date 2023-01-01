import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ending } from '../../utils/ending'
import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { ImageWrapper } from '../../components/ImageWrapper/ImageWrapper'
import { FeedbackModal } from '../../modals/FeedbackModal/FeedbackModal'
import { EditProductModal } from '../../modals/EditProductModal/EditProductModal'
import {
  useGetProductCommentsQuery,
  useGetProductQuery,
} from '../../services/productsApi'
import { convertDate } from '../../utils/convertDate'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { API_URL } from '../../constants'

import styles from './style.module.css'
import { useGetCurrentUserQuery } from '../../services/usersApi'

type Props = { state?: 'buyer' | 'seller' }

export const ProductPage: FC<Props> = ({ state = 'seller' }) => {
  const productId = Number(useParams()?.id)

  const { data: user } = useGetCurrentUserQuery()
  const { data: product, isLoading: productIsLoading } =
    useGetProductQuery(productId)
  const { data: comments } = useGetProductCommentsQuery(productId)

  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  const handleFeedbackClick = () => {
    setIsFeedbackModalShown(true)
  }

  const handleEditProduct = () => {
    setIsEditModalShown(true)
  }

  const [imgUrl, setImgUrl] = useState(
    product?.images[0]?.url ? API_URL + product?.images[0]?.url : ''
  )

  useEffect(() => {
    setImgUrl(product?.images[0]?.url ? API_URL + product?.images[0]?.url : '')
  }, [product])

  const [isFeedbackModalShown, setIsFeedbackModalShown] =
    useState<boolean>(false)
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false)

  const handleShowImage = (event: { target: { src: string } }) => {
    let target = event.target.src //? event.target.src : ''
    setImgUrl(target)
  }

  if (productIsLoading)
    return (
      <PageWrapper>
        <div>Загрузка...</div>
      </PageWrapper>
    )

  return (
    <PageWrapper scrollToTop={true}>
      {/* {productIsLoading && <div className={styles.content}>Загрузка...</div>} */}

      <div className={styles.wrapper}>
        <div className={styles.productContent}>
          <div className={styles.imgBlock}>
            <ImageWrapper imageUrl={imgUrl} name={product?.title} mb="20px" />
            <div className={styles.previewWrapper}>
              {product?.images.map((image, index) => (
                <ImageWrapper
                  imageUrl={image?.url ? API_URL + image?.url : ''}
                  key={index.toString() + image?.url}
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
              {comments?.length
                ? comments.map((comment, index) => (
                    <span key={index.toString() + comment?.text}>
                      {comment?.text} отзыв{ending(comment?.text)}
                    </span>
                  ))
                : 'Нет отзывов'}
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
                <Avatar user={user} />
              </div>
              <div className={styles.sellerData}>
                <p className={styles.sellerName}>{product?.user.name}</p>
                <p className={styles.sellerExp}>
                  Продает товары с{' '}
                  {user?.sells_from?.split('-').reverse().join('.')}
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
          <EditProductModal
            setIsOpened={setIsEditModalShown}
            mode="edit"
            product={product}
          />
        )}
      </div>
    </PageWrapper>
  )
}
