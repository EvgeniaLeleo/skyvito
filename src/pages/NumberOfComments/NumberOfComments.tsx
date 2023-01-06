// TODO redirect after deleting Product

import { FC } from 'react'

import { ending } from '../../utils/ending'
import { useGetProductCommentsQuery } from '../../services/productsApi'

type Props = {
  productId: number
}

export const NumberOfComments: FC<Props> = ({ productId }) => {
  const { data: comments } = useGetProductCommentsQuery(productId)

  const numberOfComments = comments?.length ? comments.length : 0

  return (
    <>
      {numberOfComments ? (
        <span>
          {numberOfComments} отзыв{ending(numberOfComments)}
        </span>
      ) : (
        'Нет отзывов'
      )}
    </>
  )
}
