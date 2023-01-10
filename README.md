# Сайт-аналог "Авито"

<img width="379" alt="image" src="https://user-images.githubusercontent.com/88904845/211633849-2a6b99b3-433a-45e2-9851-45f7e7fbd2c3.png">

## Установка

### Бекенд

Для запуска бекенда на компьютере должен быть установлен docker и docker-compose ([https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)):

- Windows — Docker Desktop for Windows.
- MacOS — Docker Desktop for Mac.
- Linux — в зависимости от версии: CentOS, Debian, Fedora, Raspbian, Ubuntu.

Запустите Docker Desktop.

Склонируйте репозиторий. Из корневой папки проекта, где находится скрипт `docker-compose.yaml`, запустите скрипт:

```sh
cd skyvito
docker-compose up -d
```

Бэкенд и документация в Swagger GUI будут доступны по адресу:
[http:///localhost:8090/](http:///localhost:8090/)

Остановить работу бэкенда можно командой:

```sh
docker-compose down
```

### Фронтенд

Установите зависимости:

```sh
npm install
```

Для запуска в development режиме выполните команду

```sh
npm run start
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

При необходимости production сборки выполните команду

```sh
npm run build
```

## Описание проекта:

Сайт-аналог "Авито". Макет доступен [здесь](https://www.figma.com/file/ISqzPS7Sym7V004jFo5buE/%D0%A1%D0%B0%D0%B9%D1%82-%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3-%D0%90%D0%B2%D0%B8%D1%82%D0%BE?node-id=0%3A1&t=TkHwMTtpkVn5B1xD-0)

## Структура и функционал приложения

### Главная страница приложения

- [x] кнопка входа в личный кабинет, при клике на которую пользователь попадает на страницу авторизации
- [x] для зарегистрированных пользователей вместо кнопки входа отображаются кнопки "Разместить объявление" и "Личный кабинет"
- [x] список товаров, которые размещены на площадке
- [x] строка поиска по списку всех товаров

<img width="362" alt="image" src="https://user-images.githubusercontent.com/88904845/211635561-be2ee76b-5bbb-4582-b37f-aa7765c98cc9.png">

### Страница / модальное окно авторизации

- [x] на данной странице пользователь имеет возможность войти в свой аккаунт или перейти на страницу регистрации

### Страница / модальное окно регистрации

- [x] на данной странице пользователь имеет возможность зарегистрироваться

### Страница профиля

- [x] в меню отображаются кнопки "Разместить объявление" и "Личный кабинет"
- [x] отображается приветствие пользователя
- [x] информация о пользователе: аватарка, имя, фамилия, город, телефон с возможностью редактирования
- [x] кнопки для сохранения отредактированных данных и для выхода из профиля
- [x] список товаров пользователя
- [x] кнопка возврата на главную страницу

<img width="360" alt="image" src="https://user-images.githubusercontent.com/88904845/211634919-a88e2013-4469-4c6d-97bc-96fde430fd7f.png">

### Страница продавца

- [x] в меню отображается кнопка входа в личный кабинет либо кнопки "Разместить объявление" и "Личный кабинет"
- [x] кнопка возврата на главную страницу
- [x] информация о продавце: аватарка, имя, фамилия, город, дата размещения первого объявления
- [x] кнопка для отображения телефона продавца
- [x] список всех товаров продавца

<img width="356" alt="image" src="https://user-images.githubusercontent.com/88904845/211636418-28958b46-2f2e-41b1-8102-6bcdaed27eba.png">

### Страница товара

- [x] в меню отображается кнопка входа в личный кабинет (либо кнопки "Разместить объявление" и "Личный кабинет" для авторизованного пользователя)
- [x] кнопка возврата на Главную страницу
- [x] информация о товаре: фото, дата размещения объявления, цена, количество отзывов, описание
- [x] в мобильной версии вместо превью фото отображаются кнопки, которые подсвечиваются в соответствии с отображаемым фото, а также имеется кнопка возврата на предыдущую страницу
- [x] информация о продавце: аватарка, имя, фамилия, город, дата размещения первого объявления
- [x] кнопка для отображения телефона продавца либо кнопки для редактирования и снятия с публикации (для товара пользователя)

<img width="346" alt="image" src="https://user-images.githubusercontent.com/88904845/211635126-f79752e5-3aff-4e83-a7f9-837f74cce700.png">

### Страница / модальное окно отзывов

- [x] отображается список всех отзывов о товаре с указанием имени продавца, его аватаркой и датой размещения отзыва
- [x] авторизованный пользователь имеет возможность оставить отзыв

### Страница / модальное создания нового объявления

- [x] отображается только для авторизованных пользователей
- [x] пользователь имеет возможность указать название, описание, цену товара, а также загрузить до 5 фотографий

<img width="289" alt="image" src="https://user-images.githubusercontent.com/88904845/211634572-373e8f73-e8a1-42f7-8533-4fb8632a7ed6.png">

### Страница / модальное редактирования объявления

- [x] отображается только для авторизованных пользователей
- [x] пользователь имеет возможность изменить название, описание, цену товара, а также удалить / загрузить до 5 фотографий

### Работа приложения

- [x] приложение реализовано как SPA
- [x] пользователь имеет возможность авторизации и регистрации на сайте
- [x] пока пользователь не авторизован, он:
  - [x] имеет доступ к главной странице, странице товара, странице продавца
  - [x] может осуществлять поиск по названиям товаров с помощью строки поиска
  - [x] может читать отзывы о товаре
- [x] при попытке неавторизованного пользователя перейти на другие страницы происходит автоматический редирект на главную страницу
- [x] главная страница:

  - [x] при клике на кнопку "Вход в личный кабинет" пользователь попадает на страницу авторизации
  - [x] если пользователь авторизован, то в меню отображаются кнопки "Разместить объявление" и "Личный кабинет"

  - [x] пользователь может осуществлять поиск по объявлениям с помощью строки поиска товара (поиск ведется по названию товаров вне зависимости от регистра), при удалении запроса из строки поиска отображаются все товары
  - [x] список товаров выводится в соответствии с данными, имеющимися в базе данных
  - [x] при загрузке данных или при ошибке запроса на странице выводится соответствующая надпись
  - [x] пока загружаются изображения, пользователь видит скелетоны загрузки
  - [x] по клику на выбранный товар пользователь попадает на страницу, где может ознакомиться с его описанием

- [x] страницы авторизации и регистрации:

  - [x] настроена валидация полей логина и пароля
  - [x] при возникновении ошибки выводится соответствующее сообщение
  - [x] при отправке данных до момента ответа сервера кнопка блокируется

- [x] для авторизованного пользователя:

  - [x] при нажатии на кнопку "Разместить объявление" отображается окно / страница для создания объявления с указанием цены, наименования, описания товара и загрузки фотографий
  - [x] есть возможность удалять только что загруженные фото
  - [x] реализована валидация полей названия и цены, в поле для цены есть возможность ввести только цифры и точку
  - [x] при сохранении в зависимости от статуса загрузки отображается соответствущая надпись на кнопке сохранения
  - [x] после сохранения происходит редирект на страницу только что созданного товара

- [x] страница профиля пользователя:

  - [x] пользователь имеет возможность редактировать свое имя, фамилию, город и телефон, а также загружать новую аватарку
  - [x] если пользователь не редактировал эти поля, то кнопка "Сохранить" неактивна
  - [x] кнопка становится активной только при редактировании хотя бы одного поля
  - [x] в качестве аватарки пользователь имеет возможность загрузить только файл-изображение
  - [x] при загрузке новой аватарки сразу появляется ее превью
  - [x] в поле для телефона есть возможность ввести только цифры и знак `+`
  - [x] все изменения сохраняются только после нажатия на кнопку "Сохранить"
  - [x] в соответствии с состоянием загрузки меняется надпись на кнопке сохранения, а также превью аватарки (меняется надпись или показывается скелетон загрузки)
  - [x] после сохранения изменений в приветствии пользователя обновляется его имя
  - [x] при нажатии на кнопку "Выйти" происходит разлогинивание пользователя, удаляются данные о токенах и происходит перенаправление на главную страницу
  - [x] при клике на карточку товара отображается страница товара

- [x] страница товара:

  - [x] при клике на одно из превью фото меняется соответствующее увеличенное изображение
  - [x] количество отзывов отображается в соответствии в данными в базе
  - [x] при клике на данные об отзывах отображается модальное окно / страница отзывов
  - [x] при отсутствии описания показывается соответствующая надпись
  - [x] для товара пользователя:

    - [x] при клике на кнопку "Редактировать" появляется модальное окно / страница для возможности редактирования цены, наименования, описания товара и списка фотографий
    - [x] есть возможность удалять старые или только что загруженные фото
    - [x] при сохранении изменений в зависимости от статуса загрузки отображается соответствущая надпись на кнопке сохранения
    - [x] после сохранения происходит редирект на страницу только что созданного товара
    - [x] при клике на кнопку "Снять с публикации" объявление удаляется и происходит редирект в профиль пользователя

  - [x] для товара другого продавца:

    - [x] при клике на кнопку "Показать телефон" вместо символов ХХХ отображается телефон продавца

- [x] страница / модальное окно с отзывами:

  - [x] возможность оставлять отзывы имеет только авторизованный пользователь
  - [x] кнопка добавления отзывов активна только при введенном тексте (кроме строки, состоящей только из пробелов)
  - [x] при добавлении отзыва из него удаляются пробелы в начале и в конце
  - [x] в процессе загрузки нового отзыва меняется надпись на кнопке
  - [x] после этого новый отзыв сразу отображается в модальном окне / на странице
  - [x] также сразу меняется количество отзывов на странице товара

- [x] при открытом модальном окне нет доступа к основной странице, блокируется ее прокрутка, модальное окно закрывается соответствующей кнопкой или нажатием клавиши Esc
- [x] при активном поле ввода соответствующее поле и его label подсвечиваются цветом
- [x] при попытке авторизованного пользователя зайти на страницу товара, которого нет в базе, пользователю показывается соответствующее сообщение, на несуществующую страницу - страница 404.
- [x] при переходе на некоторые страницы реализована прокрутка страницы в начало
- [x] реализована адаптивная верстка
- [x] реализованы e2e-тесты

### e2e тестирование

Для запуска cypress тестирования в development-режиме запустите бекенд и выполните команду

```sh
npm run cypress
```

**_N.B._** Тест `01_signupForm.cy.ts` необходимо запустить первым для регистрации нового пользователя: все последующие тесты будут использовать эту учетную запись.

При повторном запуске теста `01_signupForm.cy.ts` возникнет ошибка в пункте `should successfully submit the signup form`, поскольку еще один пользователь с тем же e-mail не может быть зарегистрирован. Это нормальное поведение.

<img width="331" alt="image" src="https://user-images.githubusercontent.com/88904845/211633607-789f1e8c-397d-43ce-9ab1-f601ac1c5d92.png">

При необходимости создать еще одного пользователя предварительно следует задать новое значение переменной `USER_EMAIL` в файле `./cypress/support/constants.ts` и повторно запустить `01_signupForm.cy.ts`.

### Технический стек приложения

- [x] React
- [x] Redux + Redux Toolkit + RTK Query
- [x] React Router DOM, реализация routing
- [x] js-cookie, react-responsive, react-hook-form
- [x] TypeScript
- [x] [Cypress](https://docs.cypress.io/)
- [x] [Material UI](https://mui.com/material-ui/getting-started/overview/)
