const express = require('express');
const router = express.Router();


const SignupController = require('../controller/signup.controller');
const signupController = new SignupController();

router.post('/', signupController.userSignup);
router.post('/idck', signupController.isIDDuple);
router.post('/nkck', signupController.isNicknameDuple);

module.exports = router;