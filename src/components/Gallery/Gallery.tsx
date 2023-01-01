import { Link } from 'react-router-dom'
import { FC } from 'react'

import { ROUTES } from '../../routes'
import { Card } from '../Card/Card'
import { useGetProductsQuery } from '../../services/productsApi'
import { Product } from '../../types'

import styles from './style.module.css'

type Props = { state?: 'buyer' | 'seller' }

export const Gallery: FC<Props> = ({ state = 'buyer' }) => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  // const prefetchCourse = usePrefetch('getCourse')

  if (isLoading)
    return (
      // <Page>
      <div className={styles.content}>Загрузка...</div>
      // </Page>
    )

  return (
    <div className={styles.gallery} data-cy="gallery-products">
      {products?.map((product: Product, index) => (
        <Link
          key={product.id}
          to={`${ROUTES.product}/${Number(product.id)}`}
          className={styles.link}
          // onMouseEnter={() => prefetchCourse(product.id!)}
        >
          <Card product={product} key={product.images[0]?.url + index} />
        </Link>
      ))}
      {/*{courses &&
        courses.map((product) => (
          <Link
            key={product.id}
            to={`${ROUTES.aboutCourse}/${Number(product.id) + 1}`}
            className={styles.link}
            onMouseEnter={() => prefetchCourse(product.id!)}
          >
            <Card product={product} />
          </Link>
        ))}
       {isLoading &&
        Array.from(new Array(NUMBER_OF_SKELETONS)).map((product, index) => (
          <Skeleton
            sx={{ bgcolor: SKELETON_COLOR, borderRadius: '30px' }}
            variant="rounded"
            key={index.toString()}
            className={styles.skeleton}
          />
        ))}
      {error && (
        <p className={styles.errorMessage}>
          Извините, произошла ошибка! {JSON.stringify(error)}
        </p>
      )} */}
    </div>
  )
}
