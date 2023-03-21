const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('..//middlewares/multer');
const QuizController = require('../controller/quiz.controller');
const quizController = new QuizController();

router.get('/', quizController.getAllQuiz);
router.post(
  '/',
  upload.single('img'),
  authMiddleware,
  quizController.createQuiz
);

router.get('/', quizController.getAllQuiz);
router.post(
  '/',
  upload.single('img'),
  authMiddleware,
  quizController.createQuiz
);
router.get('/:quizId', quizController.getQuiz);
router.post('/:quizId', authMiddleware, quizController.checkAnswer);
router.put('/:quizId', authMiddleware, quizController.updateQuiz);
router.delete('/:quizId', authMiddleware, quizController.deleteQuiz);
router.get('/authChk/:quizId', authMiddleware, quizController.getAuth);

module.exports = router;
