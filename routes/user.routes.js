const express = require('express');
const router = express.Router();
const authLoginMiddleware = require('../middlewares/auth-login-middleware');

const UserLogoutController = require('../controller/logout.controller');
const UserLoginController = require('../controller/login.controller');
const UserSignupController = require('../controller/signup.controller');

const userLogoutController = new UserLogoutController();
const userLoginController = new UserLoginController();
const userSignupController = new UserSignupController();

// 회원가입
router.post('/signup', userSignupController.userSignup);
// 아이디 중복 검사
router.post('/signup/idck', userSignupController.isIDDuple);
// 닉네임 중복 검사
router.post('/signup/nkck', userSignupController.isNicknameDuple);
// 로그인
router.post('/login', authLoginMiddleware, userLoginController.userLogin);
// 로그인 유효성 검사
router.get('/loginck', authLoginMiddleware, userLoginController.checkLogin);
// 로그아웃
router.get('/logout', authLoginMiddleware, userLogoutController.logout);

module.exports = router;
