require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use('/uploads', express.static('uploads'))

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization'],
  })
);

const PORT = process.env.SERVER_PORT;

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/', routes);

console.log('\n\n\n서버 API 요청 \n\n\n');
// 에러 핸들러
app.use((err, req, res, next) => {
  console.log('\n\n\n\n에러 핸들러 ==>>', err + '\n\n\n\n');

  return res.status(err.output.payload.statusCode || 500).json({
    success: err.data || false,
    errorMessage: err.output.payload.message || '서버 에러가 발생했습니다.',
  });
});

app.get('/', (req, res) => {
  res.send('modu quiz!');
});

//quiz img upload 경로 설정
app.listen(PORT, () => {
  console.log(PORT, ' 포트 번호로 서버가 실행되었습니다.');
});

module.exports = app;
