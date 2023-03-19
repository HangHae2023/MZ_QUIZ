const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const quizRouter = require('./quiz.routes');
const commentRouter = require('./comment.routes');

router.use('/user', userRouter);
router.use('/api/quiz', quizRouter);
router.use('/api/comment', commentRouter);

module.exports = router;
