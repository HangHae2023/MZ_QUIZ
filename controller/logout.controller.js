const LogoutService = require('../services/logout.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LogoutController {
  //constructor() {
  //  this.logoutService = new LogoutService();
  //}

  logout = async (req, res, next) => {
    try {
      // res.clearCookie('authorization', { maxAge: 0 });

      // 1.
      res.clearHeaders;

      res
        .status(200)
        .json({ success: true, message: '로그아웃이 잘 되었습니다.' });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, errorMessage: '서버 에러입니다.' });
    }
  };
}

module.exports = LogoutController;
