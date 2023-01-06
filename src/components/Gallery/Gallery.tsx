import { Link } from 'react-router-dom'
import { FC, useEffect } from 'react'

import { ROUTES } from '../../routes'
import { Card } from '../Card/Card'
import { useGetProductsQuery } from '../../services/productsApi'
import { Product } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { filteredProductsSelector } from '../../store/selectors/filteredProducts'
import { setProducts } from '../../store/productsSlice'
import { querySelector } from '../../store/selectors/querySelector'
import { currentUserSelector } from '../../store/selectors/currentUser'

import styles from './style.module.css'

type Props = { sellerId?: number; isProfilePage?: boolean }

export const Gallery: FC<Props> = ({ sellerId, isProfilePage }) => {
  const dispatch = useAppDispatch()

  const filteredProducts = useAppSelector(filteredProductsSelector)
  const query = useAppSelector(querySelector)

  // const currentUser = useAppSelector(currentUserSelector)
  // const isSeller = currentUser?.id === sellerId

  const { data: products, isLoading, error } = useGetProductsQuery(sellerId)

  useEffect(() => {
    if (!query && products) {
      dispatch(setProducts(products))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  // const {
  //   data: sellersProducts,
  //   isLoading: sellersProductsLoading,
  //   error: sellersProductsError,
  // } = useGetSellersProductsQuery(sellerId)
  // const prefetchCourse = usePrefetch('getCourse')

  // {error.status} {error.data.message}

  if (isLoading) {
    return <div className={styles.content}>Загрузка...</div>
  }

  return (
    <div className={styles.gallery} data-cy="gallery-products">
      {error && (
        <p className={styles.errorMessage}>
          Извините, произошла ошибка! {JSON.stringify(error)}
        </p>
      )}

      {!error && !filteredProducts?.length && (
        <p className={styles.errorMessage}>
          {isProfilePage
            ? 'Товары еще не добавлены'
            : 'По вашему запросу ничего не найдено'}
        </p>
      )}

      {filteredProducts.map((product: Product, index: number) => (
        <Link
          key={product.id}
          to={`${ROUTES.product}/${product.id}`}
          className={styles.link}
          // onMouseEnter={() => prefetchCourse(product.id!)}
        >
          <Card product={product} key={product.images[0]?.url + index} />
        </Link>
      ))}
    </div>
  )
}

//       {courses &&
//       courses.map((product) => (
//         <Link
//           key={product.id}
//           to={`${ROUTES.aboutCourse}/${Number(product.id) + 1}`}
//           className={styles.link}
//           onMouseEnter={() => prefetchCourse(product.id!)}
//         >
//           <Card product={product} />
//         </Link>
//       ))}
