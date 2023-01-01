import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useChangeUserDetailsMutation } from '../../services/usersApi'
import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Input } from './Input'

import styles from './style.module.css'

type Props = {
  user?: User
}

export const UserSettings: FC<Props> = ({ user }) => {
  // const user = useAppSelector(selectCurrentUser)
  const [name, setName] = useState<string | undefined>(user?.name)
  const [surname, setSurname] = useState<string | undefined>(user?.surname)
  console.log(name, surname)

  const [changeUserDetails] = useChangeUserDetailsMutation()
  // console.log(user?.name)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value)
  }

  // useEffect(() => {
  //   setName(user?.name)
  //   console.log('g')
  // }, [user?.name])

  useEffect(() => {
    setName(user?.name)
    setSurname(user?.surname)
    // console.log('n', name)
    return () => setName(user?.name)
  }, [user?.name, user?.surname])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<any> = async (data) => {
    // if (!user.idToken) {
    //   goToLoginWithMessage(EXP_MESSAGE)
    //   return
    // }
    console.log('dd', data.name)
    try {
      // dispatch(showSpinner())
      await changeUserDetails({
        // idToken: user?.idToken,
        email: data.email,
        name: data.name,
        surname: data.surname,
      }).unwrap()
      // dispatch(hideSpinner())
      // setIsOpened(false)
    } catch {
      // dispatch(hideSpinner())
      // goToLoginWithMessage(EXP_MESSAGE)
    }
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

      <form
        className={styles.settingsForm}
        action="#"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.nameWrapper}>
          <Input
            label="Имя"
            // placeholder={user?.name || 'Имя'}
            placeholder={name}
            onChange={handleChangeName}
            value={name}
          />
          <Input
            label="Фамилия"
            // placeholder="Фамилия"
            placeholder={surname}
            onChange={handleChangeSurname}
            value={surname}
          />
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
