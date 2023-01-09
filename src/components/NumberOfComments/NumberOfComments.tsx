import { FC, useEffect, useState } from 'react'

import { ending } from '../../utils/ending'
import { useGetProductCommentsQuery } from '../../services/productsApi'

type Props = {
  productId: number
}

export const NumberOfComments: FC<Props> = ({ productId }) => {
  const { data: comments, isLoading: isLoadingComments } =
    useGetProductCommentsQuery(productId)

  const [numberOfComments, setNumberOfComments] = useState<number | undefined>(
    comments?.length
  )

  useEffect(() => {
    setNumberOfComments(comments?.length)
  }, [comments])

  return (
    <>
      {isLoadingComments && 'Загрузка...'}
      {!!numberOfComments && (
        <span>
          {numberOfComments} отзыв{ending(numberOfComments)}
        </span>
      )}
      {!numberOfComments && !isLoadingComments && 'Нет отзывов'}
    </>
  )
}
