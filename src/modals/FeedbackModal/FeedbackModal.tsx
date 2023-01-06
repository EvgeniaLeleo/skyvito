import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { FeedbackBlock } from '../../components/FeedbackBlock/FeedbackBlock'
import { Modal } from '../Modal/Modal'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useCreateCommentMutation } from '../../services/commentsApi'
import { useGetProductCommentsQuery } from '../../services/productsApi'
import { Feedback } from '../../types'

import styles from './style.module.css'
import { useLoadCredentialsFromCookies } from '../../hooks/useLoadCredentialsFromCookies'

type Props = {
  setIsOpened: Function
  productId: number
  // comments?: Feedback[]
}

export const FeedbackModal: FC<Props> = ({
  setIsOpened,
  // comments,
  productId,
}) => {
  useEscapeKey(() => setIsOpened(false))

  const [isBlocked, setIsBlocked] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>('')

  const { data: comments } = useGetProductCommentsQuery(productId)
  const [createComment] = useCreateCommentMutation()

  const isLoggedIn = useLoadCredentialsFromCookies()

  // console.log(comments)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value)
    setIsBlocked(!e.target.value.trim().length)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<{ text: string }>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }
    try {
      setLoading(true)
      // dispatch(showSpinner())
      await createComment({
        productId,
        body: {
          text: data.text,
        },
      }).unwrap()
      setFeedback('')
      setIsBlocked(true)
      setLoading(false)
      // dispatch(hideSpinner())
      // setIsOpened(false)
    } catch {
      // dispatch(hideSpinner())
      // goToLoginWithMessage(EXP_MESSAGE)
    }
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
              {isLoggedIn && (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit(onSubmit)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.formContent}>
                    <label htmlFor="text" className={styles.label}>
                      Добавить отзыв
                    </label>
                    <textarea
                      {...register('text')}
                      className={styles.textArea}
                      rows={3}
                      placeholder="Введите отзыв"
                      onChange={handleChange}
                      value={feedback}
                    />
                  </div>

                  <Button
                    buttonStatus={loading || isBlocked ? 'disabled' : 'normal'}
                    btnType="submit"
                    size="xl"
                  >
                    Опубликовать
                  </Button>
                </form>
              )}

              {!comments?.length && <p>Отзывов пока нет</p>}

              {comments?.map((comment) => (
                <FeedbackBlock comment={comment} key={comment.created_on} />
              ))}
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
