import { FC, useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { formatPhone } from '../../utils/formatPhone'
import { formatHiddenPhone } from '../../utils/formatHiddenPhone'

export const PhoneButton: FC<{ phone?: string }> = ({ phone }) => {
  const [sellersPhone, setSellersPhone] = useState<string | undefined>(
    formatPhone(phone)
  )

  const handleShowPhone = () => {
    setSellersPhone(formatPhone(phone))
  }

  useEffect(() => {
    setSellersPhone(formatHiddenPhone(phone))
  }, [phone])

  return (
    <>
      {sellersPhone ? (
        <Button size="l" mb="34px" onClick={handleShowPhone}>
          <span>
            Показать&nbsp;телефон
            <br />
            {sellersPhone}
          </span>
        </Button>
      ) : (
        <Button size="l" mb="34px" buttonStatus="disabled">
          Телефон не указан
        </Button>
      )}
    </>
  )
}
