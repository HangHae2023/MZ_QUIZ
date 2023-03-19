const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.route');
const loginRouter = require('./login.route');
const logoutRouter = require('./logout.route');
const quizRouter = require('./quiz.routes');

router.use('/api', quizRouter);
router.use('/user/signup', signupRouter);
router.use('/user/login', loginRouter);
router.use('/user/logout', logoutRouter);


module.exports = router;