import { FC, useState } from 'react'

import { UserRESTAPI } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Input } from './Input'

import styles from './style.module.css'

type Props = {
  user: UserRESTAPI
}

export const UserSettings: FC<Props> = ({ user }) => {
  const [name, setName] = useState<string>('')

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // const handleEmailClick = () => {
  //   setIsModalEmailShown(true)
  // }

  // const handlePasswordClick = () => {
  //   setIsModalPasswordShown(true)
  // }

  return (
    <div className={styles.userSettings}>
      <div className={styles.avatarBlock}>
        <Avatar user={user} mb="10px" />
        <span className={styles.changeAvatar}>Заменить</span>
      </div>

      <form className={styles.settingsForm} action="#">
        <div className={styles.nameWrapper}>
          <Input
            label="Имя"
            placeholder="Имя"
            onChange={handleChangeImage}
            value={name}
          />
          <Input label="Фамилия" placeholder="Фамилия" />
        </div>
        <Input label="Город" placeholder="Город" size="m" />
        <Input label="Телефон" type="tel" placeholder="Телефон" size="l" />

        <Button>Сохранить</Button>
      </form>

      {/* <div className={styles.infoBlock}>
        <p className={styles.user}>
          {`Логин: ${user.displayName || user.email}`}
        </p>
      </div> 
      <div className={styles.editBlock} data-cy="edit-data-user">
        <Button onClick={handleEmailClick}>Редактировать e-mail</Button>
        <Button onClick={handlePasswordClick}>Редактировать пароль</Button> </div> */}
    </div>
  )
}
