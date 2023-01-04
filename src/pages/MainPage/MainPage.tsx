import { Gallery } from '../../components/Gallery/Gallery'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const MainPage = () => {
  // let localId // const { localId } = useAppSelector(selectCurrentUser)
  // const isLoggedIn = localId ? true : false

  return (
    <PageWrapper headerPage="search">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Объявления</h1>
        <Gallery />

        {/* <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
            </Link>
          */}
      </div>
    </PageWrapper>
  )
}
