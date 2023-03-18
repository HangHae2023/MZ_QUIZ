const Joi = require('joi');
const QuizRepository = require('../repositories/quiz.repository');
const CustomError = require('../middlewares/errorHandler');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const quizSchema = Joi.object({
    title: Joi.string().required(),
    answer: Joi.string().required(),
    explain: Joi.string().required(),
    });

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

    getQuiz = async (quizId) => {
        const quiz = await this.quizRepository.getQuiz(quizId);
    
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
    }

    createQuiz = async ( userId, title, answer, explain ) => {
        const resultSchema = await quizSchema.validate({title, answer, explain});
        if (resultSchema.error && title.length < 1) {
            throw new CustomError('제목을 입력해주세요.', 412, 1, false);
        }
        if (resultSchema.error && answer.length < 1) {
            throw new CustomError('해설 내용을 입력해주세요.', 412, 2, false);
        }
        if (resultSchema.error && explain.length < 1) {
            throw new CustomError('힌트 내용을 입력해주세요.', 412, 3, false);
        }

        await this.quizRepository.createQuiz( userId, title, answer, explain );
    }

    createImgUrl = async ( resourceUrl ) => {
        await this.quizRepository.createImgUrl( resourceUrl );
    }

    updateQuiz = async ( userId, quizId, title, answer, explain ) => {
        const resultSchema = await quizSchema.validate({title, answer, explain});
        if (resultSchema.error && title.length < 1) {
            throw new CustomError('제목을 입력해주세요.', 412, 1, false);
        }
        if (resultSchema.error && answer.length < 1) {
            throw new CustomError('해설 내용을 입력해주세요.', 412, 2, false);
        }
        if (resultSchema.error && explain.length < 1) {
            throw new CustomError('힌트 내용을 입력해주세요.', 412, 3, false);
        }
        const existQuiz = await this.quizRepository.existQuizChk(quizId);
        if (!existQuiz){
            throw new CustomError('게시글이 존재하지 않습니다.', 412, 7, false);
        }
        const userAuthChk = await this.quizRepository.findUpdateAuth( quizId );
        if (userAuthChk.userId !== userId){
            throw new CustomError('수정할 권한이 없습니다.',412, 8, false);
        }
        await this.quizRepository.updateQuiz( userId, quizId, title, answer, explain );
    }

    deleteQuiz = async ( userId, quizId) => {
        const existQuiz = await this.quizRepository.existQuizChk(quizId);
        if (!existQuiz){
            throw new CustomError('게시글이 존재하지 않습니다.', 412, 7, false);
        }
        const userAuthChk = await this.quizRepository.findUpdateAuth( quizId );
        if (userAuthChk.userId !== userId){
            throw new CustomError('삭제 권한이 없습니다.',412, 8, false);
        }
        await this.quizRepository.deleteQuiz( userId, quizId );
    }

    checkAnswer = async ( answer ) => {
        if (answer.length < 1) {
            throw new CustomError('정답을 입력해주세요.', 412, 11, false);
        }
        const checkAnswer = await this.quizRepository.checkAnswer( answer );
        if (!checkAnswer){
            return false
        } else return true
    }

}
module.exports = QuizService;