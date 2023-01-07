import { useRef } from 'react'

import { Gallery } from '../../components/Gallery/Gallery'
import { UserSettings } from '../../components/UserSettings/UserSettings'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { useGetCurrentUserQuery } from '../../services/usersApi'
import { currentUserSelector } from '../../store/selectors/currentUser'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const ProfilePage = () => {
  const timestamp = useRef(Date.now()).current
  const { data: user, error, isLoading } = useGetCurrentUserQuery(timestamp)

  // const user = useAppSelector(currentUserSelector)

  // if (error) {
  //   return (
  //     <PageWrapper scrollToTop={true}>
  //       <p>Извините, произошла ошибка! </p>
  //       <p>{JSON.stringify(error)}</p>
  //     </PageWrapper>
  //   )
  // }
  if (!user) {
    return (
      <PageWrapper scrollToTop={true}>
        <p>Извините, произошла ошибка! </p>
      </PageWrapper>
    )
  }

  // if (isLoading) {
  //   return (
  //     <PageWrapper scrollToTop={true}>
  //       <p>Загрузка...</p>
  //     </PageWrapper>
  //   )
  // }

  return (
    <PageWrapper scrollToTop={true}>
      {!!user && (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
            Здравствуйте{user.name ? `, ${user.name}` : ''}!
          </h1>

          <h2 className={styles.subtitle}>Настройки профиля</h2>
          <UserSettings user={user} />

          <h2 className={styles.subtitle}>Мои товары</h2>
          <Gallery sellerId={user.id} isProfilePage={true} />
        </div>
      )}
    </PageWrapper>
  )
}
