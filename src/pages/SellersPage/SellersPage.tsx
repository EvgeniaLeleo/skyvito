import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar } from '../../components/Avatar/Avatar'
import { Button } from '../../components/Button/Button'
import { Gallery } from '../../components/Gallery/Gallery'
import { useGetProductsQuery } from '../../services/productsApi'
import { formatDate } from '../../utils/formatDate'
import { formatHiddenPhone } from '../../utils/formatHiddenPhone'
import { formatPhone } from '../../utils/formatPhone'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const SellersPage = () => {
  const sellerId = Number(useParams()?.id)
  const { data: products, isLoading } = useGetProductsQuery(sellerId)

  const seller = products
    ? products[0].user
    : { id: 0, email: '', city: '', name: '', surname: '', phone: '' }

  const [sellersPhone, setSellersPhone] = useState<string | undefined>(
    formatPhone(seller?.phone)
  )

  const handleShowPhone = () => {
    setSellersPhone(formatPhone(seller?.phone))
  }

  useEffect(() => {
    setSellersPhone(formatHiddenPhone(seller?.phone))
  }, [seller])

  // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  // const { data: user } = useGetCurrentUserQuery()

  return (
    <PageWrapper scrollToTop={true}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Профиль продавца</h1>

        <div className={styles.sellersInfo}>
          <div className={styles.sellerAvatar}>
            <Avatar user={seller} />
          </div>

          <div className={styles.sellersData}>
            {isLoading && <p className={styles.sellerCity}>Загрузка...</p>}
            <p className={styles.sellerName}>
              {seller.name} {seller.surname}
            </p>
            <p className={styles.sellerCity}>{seller.city}</p>
            <p className={styles.sellerDate}>
              {seller.sells_from && (
                <span>Продает товары с {formatDate(seller.sells_from)}</span>
              )}
            </p>
          </div>

          <Button size="l" mb="34px" onClick={handleShowPhone}>
            Показать&nbsp;телефон {sellersPhone}
          </Button>
        </div>

        <h2 className={styles.subtitle}>Товары продавца</h2>
        <Gallery sellerId={sellerId} />
      </div>
    </PageWrapper>
  )
}
