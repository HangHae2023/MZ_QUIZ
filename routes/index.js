const express = require('express');
const router = express.Router();

const quizRouter = require('./quiz.routes');
const userRouter = require('./user.routes');

router.use('/api', quizRouter);
router.use('/user', userRouter);

module.exports = router;
