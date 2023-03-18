const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const quizErrorMiddleware = require('../middlewares/quizErrorMiddleware');

const QuizController = require('../controllers/quiz.controller');
const quizController = new QuizController();

router.get('/quiz', quizController.getAllQuiz);
// router.get('/:quizId', quizController.getQuiz);
router.post('/quiz', authMiddleware, quizErrorMiddleware, quizController.createQuiz);
// router.put('/:quizId', authMiddleware, quizController.updateQuiz);
// router.delete('/:quizId', authMiddleware, quizController.deleteQuiz);

module.exports = router;