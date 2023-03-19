
const express = require('express');
const router = express.Router();
const authLoginMiddleware = require('../middlewares/auth-login-middleware');

const LogoutController = require('../controller/logout.controller');
const logoutController = new LogoutController();

// 미들웨어 필요없을듯
router.get('/logout', authLoginMiddleware, logoutController.logout);

module.exports = router;