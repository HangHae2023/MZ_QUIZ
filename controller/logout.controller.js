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
      res.clearHeaders();

      // 2.
      // 'Authorization' 키 값을 지우기 위해 headers 정보를 가져온다.
      // const headers = req.headers;
      // headers 정보 내 'Authorization' 키 값을 삭제한다.
      // delete headers['authorization'];
      // 변경된 headers 정보를 다시 요청(request) 객체에 할당한다.
      // req.headers = headers;

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
