## Установка

Для запуска проекта на компьютере должен быть установлен Docker ([https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)):

- Windows — Docker Desktop for Windows.
- MacOS — Docker Desktop for Mac.
- Linux — в зависимости от версии: CentOS, Debian, Fedora, Raspbian, Ubuntu.

Запустите Docker Desktop.

Откройте терминал (macOS и Linux) или Git Bash (Windows) и введите команду:

```sh
docker run -d -p 127.0.0.1:27017:27017 --name library mongo
```

Склонируйте репозиторий и установите зависимости (dependencies, devDependencies).

```sh
cd skyvito
npm install
```

Для запуска в development режиме выполните команду

```sh
npm run start
```
