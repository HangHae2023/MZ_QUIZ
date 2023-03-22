const multer = require('multer');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/multer');
const QuizController = require('../controller/quiz.controller');
const quizController = new QuizController();


router.get('/', quizController.getAllQuiz);
router.get('/:quizId', quizController.getQuiz);
router.post('/',upload.single('img'),authMiddleware,quizController.createQuiz);
//아래 두 라우터 확인 (img)
router.post('/:quizId', upload.single('img'),authMiddleware, quizController.checkAnswer);
router.put('/:quizId', upload.single('img'), authMiddleware, quizController.updateQuiz);
router.delete('/:quizId', authMiddleware, quizController.deleteQuiz);
router.get('/authChk/:quizId', authMiddleware, quizController.getAuth);

module.exports = router;
