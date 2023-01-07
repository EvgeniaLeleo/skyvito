import { FC, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { ImageWrapper } from '../../components/ImageWrapper/ImageWrapper'
import { FeedbackModal } from '../../modals/FeedbackModal/FeedbackModal'
import { EditProductModal } from '../../modals/EditProductModal/EditProductModal'
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from '../../services/productsApi'
import { convertDate } from '../../utils/convertDate'
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { API_URL } from '../../constants'
import { formatDate } from '../../utils/formatDate'
import { NumberOfComments } from '../NumberOfComments/NumberOfComments'
import { PhoneButton } from '../PhoneButton/PhoneButton'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { accessTokenSelector } from '../../store/selectors/tokens'
import { getUserEmailFromJWT } from '../../utils/parseTokens'

import styles from './style.module.css'

export const ProductPage: FC = () => {
  const productId = Number(useParams()?.id)
  const navigate = useNavigate()

  const access_token = useAppSelector(accessTokenSelector)

  const { data: product, isLoading: productIsLoading } =
    useGetProductQuery(productId)
  const [delProduct] = useDeleteProductMutation()

  const [isFeedbackModalShown, setIsFeedbackModalShown] =
    useState<boolean>(false)
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)

  const [imgUrl, setImgUrl] = useState(
    product?.images[0]?.url ? API_URL + product?.images[0]?.url : ''
  )

  const userEmail = access_token ? getUserEmailFromJWT(access_token) : ''
  const isSeller = userEmail === product?.user.email

  const handleFeedbackClick = () => {
    setIsFeedbackModalShown(true)
  }

  const handleEditProduct = () => {
    setIsEditModalShown(true)
  }

  const handleDeleteProduct = async () => {
    if (product && product.id) {
      setIsBlocked(true)
      await delProduct(product.id).unwrap()
      setIsBlocked(false)
      navigate(ROUTES.profile)
    }
  }

  const handleShowImage = (event: { target: { src: string } }) => {
    let target = event.target.src //? event.target.src : ''
    setImgUrl(target)
  }

  useEffect(() => {
    setImgUrl(product?.images[0]?.url ? API_URL + product?.images[0]?.url : '')
  }, [product?.images])

  useEffect(() => {
    if (isFeedbackModalShown || isEditModalShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isFeedbackModalShown, isEditModalShown])

  if (productIsLoading)
    return (
      <PageWrapper>
        <div>Загрузка...</div>
      </PageWrapper>
    )

  return (
    <PageWrapper scrollToTop={true}>
      {!product && <p>Такого объявления нет</p>}

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
                <NumberOfComments productId={product.id} />
              </p>
              <p className={styles.price}>{product.price} ₽</p>

              {!isSeller ? (
                <PhoneButton product={product} />
              ) : (
                <div className={styles.buttonWrapper}>
                  <Button size="xl" onClick={handleEditProduct}>
                    Редактировать
                  </Button>
                  <Button
                    size="xl"
                    onClick={handleDeleteProduct}
                    buttonStatus={isBlocked ? 'disabled' : 'normal'}
                  >
                    Снять с публикации
                  </Button>
                </div>
              )}

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
            <FeedbackModal
              setIsOpened={setIsFeedbackModalShown}
              productId={product.id}
            />
          )}

          {isEditModalShown && (
            <EditProductModal
              setIsOpened={setIsEditModalShown}
              product={product}
            />
          )}
        </div>
      )}
    </PageWrapper>
  )
}
