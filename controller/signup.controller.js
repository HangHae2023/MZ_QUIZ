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

      return res
        .status(201)
        .send({ success: true, message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  isIDDuple = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const User = await this.signupService.isIDDuple(userId);

      if (!User.length) {
        return res
          .status(200)
          .json({ success: true, message: "사용 가능한 아이디입니다"});
      }
    } catch (error) {
      next(error);
    }
  };

  isNicknameDuple = async (req, res, next) => {
    try {
      const { nickname } = req.body;

      const User = await this.signupService.isNicknameDuple(nickname);

      if (!User.length) {

        return res
          .status(200)
          .json({ success: true, message: "사용 가능한 닉네임입니다"});
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SignupController;


// const Joi = require('joi');
// const SignupService = require('../services/signup.service');
// const { InvalidParamsError } = require('../exceptions/index.exception');
// const { ValidationError } = require('../exceptions/index.exception');
// const Boom = require('boom');

// class SignupController {
//   constructor() {
//     this.signupService = new SignupService();
//   }

//   /**
//    * @param {import("express").Request} req - express Request
//    * @param {import("express").Response} res - express Response
//    * @param {import("express").NextFunction} next - express Response
//    * **/

//   userSignup = async (req, res, next) => {
//     try {
//       const { userId, password, nickname } = req.body;
//       if (!userId || !password || !nickname) {
//         throw Boom.badRequest('데이터를 입력해주세요', false);
//       }

//       const userSchema = Joi.object({
//         userId: Joi.string().required(),
//         nickname: Joi.string().required(),
//         password: Joi.string().required(),
//       });

//       const validate = userSchema.validate({ userId, password, nickname });
//       if (validate.error) {
//         throw Boom.badData('입력형식을 확인해 주세요', false);
//       }

//       const User = await this.signupService.userSignup(
//         userId,
//         password,
//         nickname
//       );

//       if (!User) {
//         throw Boom.notImplemented('회원 생성에 실패했습니다', false);
//       }

//       return res
//         .status(200)
//         .send({ success: true, message: '회원 가입에 성공하였습니다.' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   isIDDuple = async (req, res, next) => {
//     try {
//       const { userId } = req.body;
//       if (!userId) {
//         throw Boom.badRequest('ID를 입력해주세요', false);
//       }

//       const User = await this.signupService.isIDDuple(userId);

//       if (User) {
//         return res
//           .status(200)
//           .json({ success: User.success, message: User.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };

//   isNicknameDuple = async (req, res, next) => {
//     try {
//       const { nickname } = req.body;
//       if (!nickname) {
//         throw Boom.badRequest('닉네임을 입력해주세요', false);
//       }

//       const User = await this.signupService.isNicknameDuple(nickname);

//       if (User) {
//         return res
//           .status(200)
//           .json({ success: User.success, message: User.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// module.exports = SignupController;
