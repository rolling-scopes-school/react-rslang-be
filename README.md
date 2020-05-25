# LearnWords
A backend part of [Front-End Stage#2 RS.School task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/rslang.md)

#### [Deployed project](https://afternoon-falls-25894.herokuapp.com/)  
#### [Swagger docs](https://afternoon-falls-25894.herokuapp.com/doc/#)

## Примеры получения исходных данных

Для этого создан REST API по адресу: https://afternoon-falls-25894.herokuapp.com/

Для тестирования API можно пользоваться Swagger докой по адресу: https://afternoon-falls-25894.herokuapp.com/doc/#/

Описание эндпоинтов(не полное, смотри Swagger Doc):

### Words

GET для получения списка слов:
`https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0` - получить слова со 2-й страницы группы 0  
Строка запроса должна содержать в себе номер группы и номер страницы. Всего 6 групп(от 0 до 5) и в каждой группе по 30 страниц(от 0 до 29). В каждой странице по 20 слов. Группы разбиты по сложности от самой простой(0) до самой сложной(5).

### Users

Система поддерживает разграничение данных по пользователям, в рамках данной задачи вам понадобится создать форму для регистрации пользователя. Для этого надо использовать POST эндпоинт по адресу `/users`. В запросе надо передать JSON объект, который содержит e-mail и password пользователя. Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол из `+-_@$!%*?&#.,;:[]{}`. Пример запроса:  
```javascript
const createUser = async user => {
     const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
     });
     const content = await rawResponse.json();
   
     console.log(content);
   };

createUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
-------------------------------------------------------------------
Console: {
  id: "5ec993df4ca9d600178740ae", 
  email: "hello@user.com"
}
```

### Sign In

Чтобы пользоваться эндпоинтами требующими авторизации необходимо залогиниться в систему и получить JWT токен. Для этого существует POST эндоинт по адресу `/signin`. Токены имеют ограниченный срок жизни, в текущей реализации это 4 часа с момента получения. Пример запроса:  
```javascript
const loginUser = async user => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  console.log(content);
};

loginUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
-------------------------------------------------------------------
Console: 
{
  "message":"Authenticated",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzk5M2RmNGNhOWQ2MDAxNzg3NDBhZSIsImlhdCI6MTU5MDI2OTE1OCwiZXhwIjoxNTkwMjgzNTU4fQ.XHKmdY_jk1R7PUbgCZfqH8TxH6XQ0USwPBSKNHMdF6I",
  "userId":"5ec993df4ca9d600178740ae"
}
```

### Users/Words

Полученный при успешном логине токен надо использовать при каждом запросе к эндпоинтам требующим авторизации (в Swagger такие эндпоинты имеют иконку навесного замка. При работе со Swagger полученный токен надо вставить в соответствующее поле формы, которая появляется при нажатии на кнопку `Authorize` вверху страницы справа). Примеры запросов:    
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzk5M2RmNGNhOWQ2MDAxNzg3NDBhZSIsImlhdCI6MTU5MDI2OTE1OCwiZXhwIjoxNTkwMjgzNTU4fQ.XHKmdY_jk1R7PUbgCZfqH8TxH6XQ0USwPBSKNHMdF6I';
const createUserWord = async ({ userId, wordId, word }) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();

  console.log(content);
};

createUserWord({
  userId: "5ec993df4ca9d600178740ae",
  wordId: "5e9f5ee35eb9e72bc21af716",
  word: { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
});
-------------------------------------------------------------------
Console: {
  "id":"5ec9a92acbbd77001736b167",
  "difficulty":"weak",
  "optional":{
    "testFieldString":"test",
    "testFieldBoolean":true
  },
  "wordId":"5e9f5ee35eb9e72bc21af716"
}

const getUserWord = async ({ userId, wordId }) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  const content = await rawResponse.json();

  console.log(content);
};

getUserWord({
  userId: "5ec993df4ca9d600178740ae",
  wordId: "5e9f5ee35eb9e72bc21af716"
});
-------------------------------------------------------------------
Console: {
  "id":"5ec9a92acbbd77001736b167",
  "difficulty":"weak",
  "optional":{
    "testFieldString":"test",
    "testFieldBoolean":true
  },
  "wordId":"5e9f5ee35eb9e72bc21af716"
}
```
Также существуют эндпоинты для сохранения статистики и настроек пользователя. `\users\{id}\statistics` и `\users\{id}\settings` соответственно. Работа с ними основывается на тех же принципах, что описаны и показаны в примерах выше.  
Объект `optional` у UserWord, Statistics, Settings имеет ограничение по размеру - не более 30 полей и общая длина объекта после `JSON.stringify()` не должна превышать 1500 символов. Структуру этих объектов вы разрабатываете сами исходя из требований и вашей реализации задачи.   
