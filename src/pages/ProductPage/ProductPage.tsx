import { FC, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import cn from 'classnames'

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
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { API_URL, SCREEN_SIZE } from '../../constants'
import { formatDate } from '../../utils/formatDate'
import { PhoneButton } from '../../components/PhoneButton/PhoneButton'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { accessTokenSelector } from '../../store/selectors/tokens'
import { getUserEmailFromJWT } from '../../utils/parseTokens'
import { ending } from '../../utils/ending'

import back from './assets/back.svg'
import styles from './style.module.css'
import { skipToken } from '@reduxjs/toolkit/dist/query'

export const ProductPage: FC = () => {
  const productId = Number(useParams()?.id)
  const navigate = useNavigate()

  const access_token = useAppSelector(accessTokenSelector)

  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const { data: product, isLoading: productIsLoading } =
    useGetProductQuery(productId)

  const [delProduct] = useDeleteProductMutation()
  const { data: productComments, isLoading: isLoadingComments } =
    useGetProductCommentsQuery(productId, {
      refetchOnMountOrArgChange: true,
    })

  const [isFeedbackModalShown, setIsFeedbackModalShown] =
    useState<boolean>(false)
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  // const [comments, setComments] = useState<Feedback[] | undefined>(
  //   productComments
  // )
  const [numberOfComments, setNumberOfComments] = useState<number | undefined>(
    productComments?.length
  )

  const [imgUrl, setImgUrl] = useState(
    product?.images[0]?.url ? API_URL + product?.images[0]?.url : ''
  )

  const userEmail = access_token ? getUserEmailFromJWT(access_token) : ''
  const isSeller = userEmail === product?.user.email

  const handleFeedbackClick = () => {
    if (isDesktop) {
      setIsFeedbackModalShown(true)
    }
    if (isMobile && product?.id) {
      navigate(`${ROUTES.comments}/${product?.id}`)
    }
  }

  const handleEditProduct = () => {
    if (isDesktop) {
      setIsEditModalShown(true)
    }
    if (isMobile) {
      navigate(`${ROUTES.editProduct}/${product?.id}`)
    }
  }

  const handleDeleteProduct = async () => {
    if (product && product.id) {
      setIsBlocked(true)
      await delProduct(product.id).unwrap()
      setIsBlocked(false)
      navigate(ROUTES.profile)
    }
  }

  const handleShowImage = (event: any) => {
    let target = event.target.src //? event.target.src : ''
    setImgUrl(target)
  }

  const handleShowImageMobile = (index: number) => {
    if (product) {
      setImgUrl(API_URL + product.images[index].url)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  // console.log('comments', comments)

  useEffect(() => {
    setImgUrl(product?.images[0]?.url ? API_URL + product?.images[0]?.url : '')
  }, [product?.images])

  useEffect(() => {
    // setComments(productComments)
    setNumberOfComments(productComments?.length)
  }, [productComments])

  if (productIsLoading)
    return (
      <PageWrapper>
        <div>Загрузка...</div>
      </PageWrapper>
    )

  if (!product)
    return (
      <PageWrapper>
        <p>Такого объявления нет</p>
      </PageWrapper>
    )

  return (
    <PageWrapper scrollToTop={true}>
      <div className={styles.wrapper}>
        <div className={styles.productContent}>
          <div className={styles.imgBlock}>
            <div className={styles.shadow}>
              <img
                className={styles.backbtn}
                src={back}
                alt="back"
                onClick={handleBack}
              />
            </div>

            <div className={styles.bottomShadow}></div>

            {isMobile && (
              <div className={styles.swiperButtons}>
                {product.images.map((image, index) => (
                  <div
                    className={cn(styles.swiperButton, {
                      [styles.active]: API_URL + image.url === imgUrl,
                    })}
                    onClick={() => handleShowImageMobile(index)}
                  ></div>
                ))}
              </div>
            )}

            <ImageWrapper
              imageUrl={imgUrl}
              name={product.title}
              mb={isDesktop ? '30px' : '0'}
            />
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
              {isLoadingComments && 'Загрузка...'}
              {!!numberOfComments && (
                <span>
                  {numberOfComments} отзыв{ending(numberOfComments)}
                </span>
              )}
              {!numberOfComments && !isLoadingComments && 'Нет отзывов'}
            </p>

            <p className={styles.price}>{product.price} ₽</p>

            {!isSeller ? (
              <PhoneButton phone={product.user.phone} />
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
    </PageWrapper>
  )
}
