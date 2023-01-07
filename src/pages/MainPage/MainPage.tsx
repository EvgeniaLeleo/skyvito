import { Gallery } from '../../components/Gallery/Gallery'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const MainPage = () => {
  return (
    <PageWrapper searchHeader={true}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Объявления</h1>
        <Gallery />
      </div>
    </PageWrapper>
  )
}

// <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}></Link>
