// import { Link } from 'react-router-dom'

// import { Button } from '../../components/Button/Button'
// import { Footer } from '../../components/Footer/Footer'
// import { Gallery } from '../../components/Gallery/Gallery'
// import { Logo } from '../../components/Logo/Logo'
// import { LOGO_COLOR_LIGHT } from '../../constants'
// import { useAppSelector } from '../../hooks/appHooks'
// import { ROUTES } from '../../routes'
// import { selectCurrentUser } from '../../slices/currentUserSlice'

import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../components/Header/Header'

import styles from './style.module.css'

import data from '../../data.json'
import { ending } from '../../utils'
import { Button } from '../../components/Button/Button'
import { Avatar } from '../../components/Avatar/Avatar'
import { USER } from '../../constants'
import { ImageWrapper } from '../../components/ImageWrapper/ImageWrapper'

export const ProductPage: FC = () => {
  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  const params = useParams()
  const product = data.find((item) => item.id === Number(params.productId))

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.productContent}>
          <div className={styles.imgBlock}>
            <ImageWrapper
              imageUrl={product?.image_link}
              name={product?.name}
              mb="30px"
            />
            <div className={styles.previewWrapper}></div>
          </div>

          <div className={styles.productData}>
            <h1 className={styles.title}>{product?.name}</h1>
            {/* <p className={styles.price}>{item.price}</p>
            <p className={styles.location}>{item.location} ₽</p>
            <p className={styles.date}>{item.date}</p> */}
            <p className={styles.location}>{product?.animal_type}</p>
            <p className={styles.date}>{product?.length_min}</p>
            <p className={styles.feedback}>
              {product?.lifespan} отзыв{ending(product?.lifespan)}
            </p>
            <p className={styles.price}>{product?.weight_min} ₽</p>

            <Button size="l" mb="34px">
              Показать телефон
              <br />8 905 ХХХ ХХ ХХ
            </Button>

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

        {/* <UserSettings user={USER} />
        <h2 className={styles.subtitle}>Мои товары</h2>
        <Gallery /> */}

        {/* <header className={styles.header}>
          <nav className={styles.nav}>
            <Logo color={LOGO_COLOR_LIGHT} />
            <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>
          </nav> 
        </header>          
        </main>*/}
      </div>
      {/* <Footer />  */}
    </>
  )
}
