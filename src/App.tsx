import React from 'react'
import './App.css'
import { Button } from './components/Button/Button'

function App() {
  return (
    <div className="App">
      <Button>Найти</Button>
      <Button>Вернуться на главную</Button>
      <Button>Сохранить</Button>
      <Button type="secondary">Разместить объявление</Button>
      <Button type="secondary">Категории товаров</Button>
      <Button type="outlined">Личный кабинет</Button>
      <Button size="xl">Войти</Button>
      <Button size="xl">Зарегистрироваться</Button>
    </div>
  )
}

export default App
