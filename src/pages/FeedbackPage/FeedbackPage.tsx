import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { FeedbackBlock } from '../../components/FeedbackBlock/FeedbackBlock'
import { useCreateCommentMutation } from '../../services/commentsApi'
import { useGetProductCommentsQuery } from '../../services/productsApi'
import { useLoadCredentialsFromCookies } from '../../hooks/useLoadCredentialsFromCookies'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { Feedback } from '../../types'
import { ROUTES } from '../../routes'

import back from './assets/back.svg'
import styles from './style.module.css'

export const FeedbackPage: FC = () => {
  const productId = Number(useParams()?.id)

  const navigate = useNavigate()
  const { data: productComments } = useGetProductCommentsQuery(productId)
  const [createComment] = useCreateCommentMutation()
  const isLoggedIn = useLoadCredentialsFromCookies()

  const [isBlocked, setIsBlocked] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('Опубликовать')
  const [comments, setComments] = useState<Feedback[] | undefined>(
    productComments
  )

  useEffect(() => {
    setComments(productComments)
  }, [productComments?.length])

  const { register, handleSubmit } = useForm<{ text: string }>({
    mode: 'onBlur',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value)
    setIsBlocked(!e.target.value.trim().length)
  }

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

  const handleBack = () => {
    // navigate(-1)
    navigate(ROUTES.product + '/' + productId)
  }

  return (
    <PageWrapper scrollToTop={true}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          <img
            className={styles.backbtn}
            src={back}
            alt="back"
            onClick={handleBack}
          />
          Отзывы о товаре
        </h1>

        <div className={styles.contentWrapper}>
          {isLoggedIn && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.formContent}>
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
    </PageWrapper>
  )
}
