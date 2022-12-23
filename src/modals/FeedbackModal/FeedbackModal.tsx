import { FC, useState } from 'react'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { Feedback } from '../../components/Feedback/Feedback'
import { Modal } from '../Modal/Modal'

import data from '../../data.json'
import styles from './style.module.css'
import { useEscapeKey } from '../../hooks/useEscapeKey'

type Props = {
  // courseId: number
  setIsOpened: Function
}

const FEEDBACKS = [0, 1, 2, 3, 4]

export const FeedbackModal: FC<Props> = ({ setIsOpened }) => {
  useEscapeKey(() => setIsOpened(false))
  // const { data } = useUserCourse(courseId)

  const [feedback, setFeedback] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={setIsOpened}>
          <div className={styles.content}>
            <h2 className={styles.title}>Отзывы о товаре</h2>
            <div className={styles.closeButton} onClick={handleClose}>
              <CrossIcon />
            </div>
            <div className={styles.contentWrapper}>
              <form className={styles.form}>
                <div className={styles.formContent}>
                  <label htmlFor="text" className={styles.label}>
                    Добавить отзыв
                  </label>
                  <textarea
                    className={styles.textArea}
                    rows={3}
                    placeholder="Введите отзыв"
                    onChange={handleChange}
                    value={feedback}
                  />
                </div>

                <Button
                  buttonStatus={feedback.length ? 'normal' : 'disabled'}
                  size="xl"
                >
                  Опубликовать
                </Button>
              </form>

              {/* {FEEDBACKS.map((feedback: number) => (
                <Feedback review={data[feedback]} key={feedback} />
              ))} */}
            </div>

            {/* {data && data.workouts && (
          <WorkoutList
            workouts={data.workouts}
            courseId={courseId}
            setIsOpened={setIsOpened}
          />
        )} */}
          </div>
        </Modal>
      )}
    </>
  )
}
