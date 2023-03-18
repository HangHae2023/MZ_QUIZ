require('dotenv').config();
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.SERVER_PORT;

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/', routes);

// 에러 핸들러
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    success: err.expect,
    errorMessage: err.message || '서버 에러가 발생했습니다.',
  });
});

app.get('/', (req, res) => {
  res.send('modu quiz!');
});

//quiz img upload 경로 설정
app.listen(PORT, () => {
  console.log(PORT, ' 포트 번호로 서버가 실행되었습니다.');
});



//test