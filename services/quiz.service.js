const QuizRepository = require('../repositories/quiz.repository');
const { ValidationError } = require('../exceptions/index.exception');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

class QuizService {
    constructor() {
    this.quizRepository = new QuizRepository();
    }
    getAllQuiz = async () => {
    const allQuiz = await this.quizRepository.getAllQuiz();
    
    allQuiz.sort((a, b) => {
        return b.createdAt - a.createdAt;
    })

    return allQuiz.map(quiz => {
        return {
        quizId: quiz.quizId,
        userId: quiz.userId,
        nickname: quiz.nickname,
        title: quiz.title,
        answer: quiz.answer,
        explain: quiz.explain,
        likes: quiz.likes,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt
    }
    });
}
    createQuiz = async ( userId, title, answer, explain ) => {
        // if (title.length < 1 ) {
        //     throw new ValidationError('제목을 입력해 주세요.', 402);
        //     }
        // if (answer.length < 1 ) {
        //     throw new ValidationError('해설 내용을 입력해주세요.');
        // }
        // if (explain.length < 1 ) {
        //     throw new ValidationError('힌트 내용을 입력해주세요.');
        // }
    await this.quizRepository.createQuiz( userId, title, answer, explain );
    }

    createImgUrl = async ( resourceUrl ) => {
    await this.quizRepository.createImgUrl( resourceUrl );
    }

}
module.exports = QuizService;