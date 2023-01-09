import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { FeedbackBlock } from '../../components/FeedbackBlock/FeedbackBlock'
import { Modal } from '../Modal/Modal'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useCreateCommentMutation } from '../../services/commentsApi'
import { useGetProductCommentsQuery } from '../../services/productsApi'
import { useLoadCredentialsFromCookies } from '../../hooks/useLoadCredentialsFromCookies'

import styles from './style.module.css'
import { Feedback } from '../../types'

type Props = {
  setIsOpened: Function
  productId: number
}

export const FeedbackModal: FC<Props> = ({ setIsOpened, productId }) => {
  const { data: productComments, isLoading: isLoadingComments } =
    useGetProductCommentsQuery(productId)
  const [createComment] = useCreateCommentMutation()

  const isLoggedIn = useLoadCredentialsFromCookies()

  const { register, handleSubmit } = useForm<{ text: string }>({
    mode: 'onBlur',
  })

  const [isBlocked, setIsBlocked] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('Опубликовать')
  const [comments, setComments] = useState<Feedback[] | undefined>(
    productComments
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setButtonText('Опубликовать')
    setFeedback(e.target.value)
    setIsBlocked(!e.target.value.trim().length)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  useEffect(() => {
    setComments(productComments)
  }, [productComments?.length])

  const onSubmit: SubmitHandler<{ text: string }> = async (newComment) => {
    try {
      setLoading(true)
      setButtonText('Публикуется...')

      const newCommentData = await createComment({
        productId,
        body: {
          text: newComment.text,
        },
      }).unwrap()

      if (comments) {
        setComments([newCommentData, ...comments])
      } else {
        setComments([newCommentData])
      }

      setButtonText('Опубликовано')
      setFeedback('')
      setIsBlocked(true)
      setLoading(false)
    } catch (error) {
      console.log('error creating comment', error)
    }
  }

  return (
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
                {buttonText}
              </Button>
            </form>
          )}

          {!comments?.length && <p>Отзывов пока нет</p>}

          {comments?.map((comment) => (
            <FeedbackBlock comment={comment} key={comment.created_on} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
