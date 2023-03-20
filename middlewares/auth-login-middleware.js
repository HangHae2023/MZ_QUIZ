require('dotenv').config();

const jwt = require('jsonwebtoken');
const { Users } = require('../models');
// 로그인 되어 있는 유저일 경우 Error를 반환한다.
module.exports = (req, res, next) => {
  try {
    // const { authorization } = req.cookies;
    const authorization = req.headers.authorization;

    if (authorization) {
      const [tokenType, tokenValue] = authorization.split(' ');

      if (tokenType !== 'Bearer') {
        res.clearCookie('authorization');
        return res.status(403).send({
          errorMessage: '쿠키가 올바르지 않습니다.',
        });
      }

      jwt.verify(tokenValue, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          // 토큰이 유효하지 않은 경우
          res.clearCookie('authorization');
          return res.status(403).send({
            success: false,
            errorMessage: '다시 로그인이 필요합니다.',
          });
        } else {
          // 토큰이 유효하지 않은 경우
          return res.status(403).send({
            success: false,
            errorMessage: '이미 로그인이 되어있습니다.',
          });
        }
      });
    }

    next();
  } catch (error) {
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  }
};
