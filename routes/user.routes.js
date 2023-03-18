const express = require('express');
const router = express.Router();
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/login', authLoginUserMiddleware, userController.createLogin);
router.post('/signup',  userController.createSignup);

module.exports = router;