const UserService = require('../services/user.service');

class UserController {
    constructor() {
      this.userService = new UserService(); 
    }
    createLogin = async (req, res, next) => {
        try{
          const { userId,  password } = req.body;
          
          await this.userService.createLogin(userId,  password);
          
          const token = await this.userService.generateToken(userId);
          
          let expires = new Date();
          expires.setMinutes(expires.getMinutes() + 120);
    
          res.cookie('middleProjectCookie', `Bearer ${token}`, {
            expires: expires, // cookie의 만료시간 설정
          });
    
          return res.status(200).json({ token });
          
          } catch (error) {
            next(error);
          }
    }

    createSignup = async (req, res) => {
        try{
          const { userId, nickname, password } = req.body;  
          
          await this.userService.createSignup(userId, nickname, password);
    
          return res.status(201).send({ message: '회원 가입에 성공하였습니다.' });
        } catch (error) {
          console.error(error);
          res.status(error.status || 400);
          res.json({ errorMessage: error.message });
        }
      }
}

module.exports = UserController;