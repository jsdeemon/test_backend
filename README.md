

### setting up environment
```bash
$ npm install
$ docker-compose up
```
PGadmin access:
http://localhost:5050

```bash
$ npm run start
``` 
### регистрация нового пользователя
POST http://localhost:5000/api/user/registration 

{
    "email": "dukenukem@mail.com",
    "password": "123123123" 
}

### логин пользователя
POST http://localhost:5000/api/user/login 

{
    "email": "dukenukem@mail.com",
    "password": "123123123" 
} 

### доступ по токену
GET http://localhost:5000/api/user/auth 