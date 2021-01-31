# LearnWords
A backend part of [React RS.School task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/react-rslang.md)

#### [Wiki проекта](https://github.com/rolling-scopes-school/-LearnWords-react/wiki)  
#### [Swagger документация](https://react-learnwords-example.herokuapp.com/doc/#)
#### [Примеры запросов к API](https://github.com/rolling-scopes-school/-LearnWords-react/wiki/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%BE%D0%B2-%D0%BA-API)

## Деплой

Сделайте форк репозитория и следуйте [инструкции по деплою и настройке приложения](https://github.com/rolling-scopes-school/-LearnWords-react/wiki).

## Локальный запуск
1. Создайте файл ```.env``` в корне приложения
2. В созданном файе укажите переменные окружения:  
```
PORT=<порт на котором будет запущено приложение>
MONGO_CONNECTION_STRING=<адрес вашей локальной или облачной mongodb>
JWT_SECRET_KEY=<ваш секретный ключ для подписи JWT>
JWT_REFRESH_SECRET_KEY=<ваш секретный ключ для подписи refresh JWT>
```
3. ```npm install```
4. ```npm run start:dev```
