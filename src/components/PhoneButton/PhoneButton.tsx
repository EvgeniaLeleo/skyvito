import { FC, useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { formatPhone } from '../../utils/formatPhone'
import { formatHiddenPhone } from '../../utils/formatHiddenPhone'
import { Product } from '../../types'

export const PhoneButton: FC<{ product: Product }> = ({ product }) => {
  const [sellersPhone, setSellersPhone] = useState<string | undefined>(
    formatPhone(product.user.phone)
  )

  const handleShowPhone = () => {
    setSellersPhone(formatPhone(product.user.phone))
  }

  useEffect(() => {
    setSellersPhone(formatHiddenPhone(product.user.phone))
  }, [product.images, product.user])

  return (
    <>
      {sellersPhone ? (
        <Button size="l" mb="34px" onClick={handleShowPhone}>
          Показать&nbsp;телефон {sellersPhone}
        </Button>
      ) : (
        <Button size="l" mb="34px" buttonStatus="disabled">
          Телефон не указан
        </Button>
      )}
    </>
  )
}
