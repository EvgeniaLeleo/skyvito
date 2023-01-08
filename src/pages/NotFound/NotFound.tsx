import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const NotFound = () => {
  return (
    <PageWrapper>
      <div className={styles.wrapper}>
        <p>Такой страницы нет</p>
      </div>
    </PageWrapper>
  )
}
