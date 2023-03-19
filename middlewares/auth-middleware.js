const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res, next) => {
  try {
    const cookies = req.cookies['Cookie'];
    if (!cookies) {
      return res.status(403).send({
        errorMessage: '로그인이 필요한 기능입니다.',
      });
    }

    const [tokenType, tokenValue] = cookies.split(' ');
    if (tokenType !== 'Bearer') {
      res.clearCookie('Cookie'); 
      return res.status(403).send({
        errorMessage: '쿠키가 올바르지 않습니다.',
      });
    }


    const decodedToken = jwt.verify(tokenValue, "SECRET_KEY");
    const userId = decodedToken.userId;

    const user = await Users.findByPk(userId);

    res.locals.user = user;
    next();
  } catch (error) {
    res.clearCookie('Cookie'); 
    console.error(error);
    return res.status(404).send({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
  }
};