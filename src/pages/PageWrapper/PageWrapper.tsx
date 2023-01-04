import { FC, ReactNode } from 'react'

import { Header } from '../../components/Header/Header'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'
import { useAppSelector } from '../../hook'
import { accessTokenSelector } from '../../store/selectors/tokens'

import styles from './style.module.css'

type Props = {
  children?: ReactNode
  scrollToTop?: boolean
  searchHeader?: boolean
}

export const PageWrapper: FC<Props> = ({
  children,
  searchHeader = false,
  scrollToTop = false,
}) => {
  const userId = useAppSelector(accessTokenSelector)
  const authorized = userId ? true : false

  return (
    <>
      {scrollToTop && <ScrollToTop />}
      <Header authorized={authorized} searchHeader={searchHeader} />
      <div className={styles.wrapper}>{children}</div>
      {/* <Footer />  */}
    </>
  )
}
