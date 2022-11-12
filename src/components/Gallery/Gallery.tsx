import { Link } from 'react-router-dom'

// import { useGetCoursesQuery } from '../../api/courses.api'
// import { usePrefetch } from '../../api/courses.api'
import { Card } from '../Card/Card'
import { ROUTES } from '../../routes'

import data from '../../data.json'

import styles from './style.module.css'

export const Gallery = () => {
  // const { data: courses, isLoading, error } = useGetCoursesQuery()
  // const prefetchCourse = usePrefetch('getCourse')

  return (
    <div className={styles.gallery} data-cy="gallery-courses">
      {data.map((product) => (
        <Link
          key={product.id}
          to={`${ROUTES.product}/${Number(product.id)}`}
          className={styles.link}
          // onMouseEnter={() => prefetchCourse(product.id!)}
        >
          <Card product={product} key={product.image_link} />
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
