// TODO redirect after deleting Product

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ending } from '../../utils/ending'
import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { ImageWrapper } from '../../components/ImageWrapper/ImageWrapper'
import { FeedbackModal } from '../../modals/FeedbackModal/FeedbackModal'
import { EditProductModal } from '../../modals/EditProductModal/EditProductModal'
import {
  useDeleteProductMutation,
  useGetProductCommentsQuery,
  useGetProductQuery,
} from '../../services/productsApi'
import { convertDate } from '../../utils/convertDate'
import { useGetCurrentUserQuery } from '../../services/usersApi'
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { API_URL } from '../../constants'
import { formatPhone } from '../../utils/formatPhone'
import { formatHiddenPhone } from '../../utils/formatHiddenPhone'
import { formatDate } from '../../utils/formatDate'
import { useAppSelector } from '../../hook'
import { currentUserSelector } from '../../store/selectors/currentUser'

import styles from './style.module.css'

export const ProductPage: FC = () => {
  const productId = Number(useParams()?.id)

  const { data: product, isLoading: productIsLoading } =
    useGetProductQuery(productId)
  const { data: comments } = useGetProductCommentsQuery(productId)
  const [delProduct] = useDeleteProductMutation()

  // const { data: user } = useGetCurrentUserQuery()
  const user = useAppSelector(currentUserSelector)

  const [sellersPhone, setSellersPhone] = useState<string | undefined>(
    formatPhone(product?.user.phone)
  )

  const isSeller = user?.id === product?.user.id

  const handleFeedbackClick = () => {
    setIsFeedbackModalShown(true)
  }

  const handleEditProduct = () => {
    setIsEditModalShown(true)
  }

  const handleDeleteProduct = async () => {
    if (product && product.id && product.id !== undefined) {
      await delProduct(product.id).unwrap()
    }
  }

  const handleShowPhone = () => {
    setSellersPhone(formatPhone(product?.user.phone))
  }

  const [imgUrl, setImgUrl] = useState(
    product?.images[0]?.url ? API_URL + product?.images[0]?.url : ''
  )

  useEffect(() => {
    setImgUrl(product?.images[0]?.url ? API_URL + product?.images[0]?.url : '')
    setSellersPhone(formatHiddenPhone(product?.user.phone))
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
      {!!product && (
        <div className={styles.wrapper}>
          <div className={styles.productContent}>
            <div className={styles.imgBlock}>
              <ImageWrapper imageUrl={imgUrl} name={product.title} mb="20px" />
              <div className={styles.previewWrapper}>
                {product.images.map((image, index) => (
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
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.location}>{product.user.city}</p>
              <p className={styles.date}>
                {convertDate(product.created_on || '')}
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
              <p className={styles.price}>{product.price} ₽</p>

              {!isSeller ? (
                sellersPhone ? (
                  <Button size="l" mb="34px" onClick={handleShowPhone}>
                    Показать&nbsp;телефон {sellersPhone}
                  </Button>
                ) : (
                  <Button size="l" mb="34px" buttonStatus="disabled">
                    Телефон не указан
                  </Button>
                )
              ) : (
                <div className={styles.buttonWrapper}>
                  <Button size="xl" onClick={handleEditProduct}>
                    Редактировать
                  </Button>
                  <Button size="xl" onClick={handleDeleteProduct}>
                    Снять с публикации
                  </Button>
                </div>
              )}

              {/* <Link
                key={product.id}
                to={`${ROUTES.product}/${Number(product.id)}`}
                className={styles.link}
                // onMouseEnter={() => prefetchCourse(product.id!)}
              > */}

              <div className={styles.seller}>
                <Link
                  to={
                    isSeller
                      ? ROUTES.profile
                      : `${ROUTES.seller}/${product.user.id}`
                  }
                  // onMouseEnter={() => prefetchCourse(product.id!)}
                >
                  <div className={styles.avatarWrapper}>
                    <Avatar user={product.user} cursor="pointer" />
                  </div>
                </Link>
                <div className={styles.sellerData}>
                  <Link
                    to={
                      isSeller
                        ? ROUTES.profile
                        : `${ROUTES.seller}/${product.user.id}`
                    }
                    className={styles.link}
                    // onMouseEnter={() => prefetchCourse(product.id!)}
                  >
                    <p className={styles.sellerName}>
                      {product.user.name ? product.user.name : 'Продавец'}
                    </p>
                  </Link>
                  <p className={styles.sellerExp}>
                    {product.user?.sells_from && (
                      <span>
                        Продает товары с {formatDate(product.user?.sells_from)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className={styles.subtitle}>Описание товара</h2>
          <p className={styles.description}>
            {product.description ? product.description : 'Описание отсутствует'}
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
      )}
    </PageWrapper>
  )
}
