import { FC, ReactNode } from 'react'

import { Header } from '../../components/Header/Header'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'

import styles from './style.module.css'

type Props = {
  children?: ReactNode
  scrollToTop?: boolean
  headerPage?: 'profile' | 'regular'
}

export const PageWrapper: FC<Props> = ({
  children,
  scrollToTop = false,
  headerPage,
}) => {
  // ATTENTION Temporary value of localId (for auth Header)
  let localId = 1 // const { localId } = useAppSelector(selectCurrentUser)
  const isLoggedIn = localId ? true : false

  return (
    <>
      {scrollToTop && <ScrollToTop />}
      <Header
        type={isLoggedIn ? 'auth' : 'main'}
        page={headerPage === 'profile' ? 'profile' : 'regular'}
      />
      <div className={styles.wrapper}>{children}</div>
      {/* <Footer />  */}
    </>
  )
}
