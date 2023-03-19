


const SignupService = require('../services/signup.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class SignupController {
  constructor() {
  this.signupService = new SignupService(); 
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/

  userSignup = async (req, res, next) => {
    try{
        const { userId, password, nickname } = req.body; 
      if (!userId || !password || !nickname) {
        throw new InvalidParamsError();
      }

      const User = await this.signupService.userSignup(userId, nickname, password);

      if(! User) {
        throw new InvalidParamsError('회원 생성에 실패했습니다', 400)
      }


      return res.status(200).send({ success:true, message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      next(error)
 
      };
    }



  isIDDuple = async (req, res, next) => {
    try{
        const { userId } = req.body; 
      if (!userId ) {
        throw new InvalidParamsError();
      }

      const User = await this.signupService.isIDDuple(userId);

      //if(User) {
      //  return res.status(200).send({ userId });}
    
      return res.status(200).send({isDuplicated})
    } catch (error) {
      next(error)
 
      };
    }
  

    isNicknameDuple = async (req, res, next) => {
      try{
          const { nickname } = req.body; 
        if (!nickname ) {
          throw new InvalidParamsError();
        }
  
        const User = await this.signupService.isNicknameDuple(nickname);
  
        //if(User) {
        //  return res.status(200).send({ nickname });}
      
        return res.status(200).send({isDuplicated})
      } catch (error) {
        next(error)
   
        };
      }
    
    }

module.exports = SignupController;