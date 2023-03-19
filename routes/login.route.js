

const express = require('express');
const router = express.Router();
const authLoginMiddleware = require('../middlewares/auth-login-middleware');

const LoginController = require('../controller/login.controller');
const loginController = new LoginController();

router.post('/', authLoginMiddleware, loginController.userLogin);
router.get('/loginck', authLoginMiddleware, loginController.checkLogin);

module.exports = router;