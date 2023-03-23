const Joi = require('joi');
const SignupService = require('../services/signup.service');
const { InvalidParamsError } = require('../exceptions/index.exception');
const { ValidationError } = require('../exceptions/index.exception');
const Boom = require('boom');

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
    try {
      const { userId, password, nickname } = req.body;

      const User = await this.signupService.userSignup( userId, password, nickname);

        return res
          .status(201)
          .json({ success: true, message: '회원 가입에 성공하였습니다.'});

    
  } catch (error) {
      next(error);
    }
  };

  isIDDuple = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const User = await this.signupService.isIDDuple(userId);


        return res
          .status(201)
          .json({ success: true, message: "사용 가능한 아이디입니다"});
      
    } catch (error) {
      next(error);
    }
  };

  isNicknameDuple = async (req, res, next) => {
    try {
      const { nickname } = req.body;

      const User = await this.signupService.isNicknameDuple(nickname);

        return res
          .status(201)
          .json({ success: true, message: "사용 가능한 닉네임입니다"});
      
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SignupController;