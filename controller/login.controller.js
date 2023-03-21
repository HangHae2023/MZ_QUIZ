const LoginService = require('../services/login.service');
const { InvalidParamsError } = require('../exceptions/index.exception');
const Boom = require('boom');

class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/

  userLogin = async (req, res, next) => {
    try {
      const { userId, password } = req.body;

      if (!userId || !password) {
        throw Boom.forbidden('아이디 혹은 비밀번호를 입력해주세요.', false);
      }

      const user = await this.loginService.userLogin(userId, password);

      const UserId = user.userId;

      const token = await this.loginService.generateToken(UserId);

      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      // authorization 헤더 설정
      res.set('Authorization', `Bearer ${token}`);

      // res.cookie('authorization', `Bearer ${token}`, {
      //   secure: false,
      //   httpOnly: true,
      // })

      return res.status(200).json({
        success: true,
        message: '로그인에 성공했습니다',
      });
    } catch (error) {
      next(error);
    }
  };

  checkLogin = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      const [tokenType, tokenValue] = authorization.split(' ');

      jwt.verify(tokenValue, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          // 토큰이 유효하지 않은 경우
          // res.clearCookie('authorization');
          return res.status(403).send({
            success: false,
            errorMessage: '다시 로그인이 필요합니다.',
          });
        } else {
          // 토큰이 유효한 경우
          return res.status(403).send({
            success: true,
            errorMessage: '유효한 상태입니다',
          });
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = LoginController;
