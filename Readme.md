### Model 생성은 다음과 같이 진행했습니다.

```shell
npx sequelize model:generate --name Users --attributes userId:string,password:string,nickname:string,createdAt:date,updatedAt:date

npx sequelize model:generate --name QuizPost --attributes quizId:integer,userId:string,title:string,answer:string,explain:string,resourceUrl:string,createdAt:date,updatedAt:date

npx sequelize model:generate --name QuizComment --attributes commentId:integer,postId:string,userId:string,content:string,parentCommentId:integer,createdAt:date,updatedAt:date

npx sequelize model:generate --name QuizLike --attributes likeId:integer,quizId:integer,userId:string,createdAt:date,updatedAt:date

npx sequelize model:generate --name CommentLike --attributes likeId:integer,commentId:integer,userId:string,createdAt:date,updatedAt:date

npx sequelize model:generate --name QuizAnswerHistory --attributes historyId:integer,userId:string,quizId:integer,answer:string,createdAt:date,updatedAt:date
```

### 0. `clone`하신 후 `.env`, `.gitignore`, `.prettierrc.js`, `config/config.json` 파일을 생성하셔야 합니다.

### 1. 각자 `config` 폴더에 `config.json`에 `development` 환경을 설정해주시고
```json
{
  "development": {
    "username": "root",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

다음 명령을 입력하면 테이블을 생성할 수 있습니다.
```shell
npx sequelize db:create
```

이후 `makeTable.js`를 실행해주세요.
```shell
node makeTable.js
```