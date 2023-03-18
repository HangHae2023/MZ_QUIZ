const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const QuizController = require('../controllers/quiz.controller');
const quizController = new QuizController();

router.get('/quiz', quizController.getAllQuiz);
router.get('/quiz/:quizId', quizController.getQuiz);
router.post('/quiz', authMiddleware, quizController.createQuiz);
router.post('/quiz/:quizId', authMiddleware, quizController.checkAnswer);
router.put('/quiz/:quizId', authMiddleware, quizController.updateQuiz);
router.delete('/quiz/:quizId', authMiddleware, quizController.deleteQuiz);

module.exports = router;