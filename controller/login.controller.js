const LoginService = require('../services/login.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

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
    try{
      const { userId, password } = req.body;
      
      if (!userId || !password ) {
        throw new InvalidParamsError();
      }

      const user = await this.loginService.userLogin(userId, password);
      
      const UserId = user.userId

      const token = await this.loginService.generateToken(UserId);
      
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      res.cookie('Cookie', `Bearer ${token}`, {
        expires: expires,
      });

      return res.status(200).json({ 
        success: true,
        message: '로그인에 성공했습니다.'});
      
      } catch (error) {
        next(error);
      }
    }


    checkLogin = async (req, res, next) => {
      try {
        const cookies = req.cookies['Cookie'];
        if (!cookies) {
          return res.status(403).json({
            success: false,
            errorCode : req.status,
            message: '로그인이 필요한 기능입니다.'
          });
        } 
    
        const [tokenType, tokenValue] = cookies.split(' ');
        if (tokenType !== 'Bearer') {
          res.clearCookie('Cookie'); 
          return res.status(403).json({
            success: false,
            message: '다시 로그인이 필요합니다.'
          });
        } else {

          return res.status(true).json({
            success: true,
            message: '유효한 상태입니다.'
          });

        }
      } catch (error) {
        next(error);
      }
    };


}
module.exports = LoginController;
