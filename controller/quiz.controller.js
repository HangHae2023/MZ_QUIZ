const QuizService = require('../services/quiz.service');
//라이브러리 필요한지 확인
const path = require('path');
const fs = require('fs');
const multer = require('multer');

class QuizController {
  constructor() {
    this.quizService = new QuizService(); // QuizService 인스턴스 생성
  }
  //모든 퀴즈 조회
  getAllQuiz = async (req, res, next) => {
    try {
      const quiz = await this.quizService.getAllQuiz(); // QuizService의 getAllQuiz 함수 실행

      res.status(200).json({ allQuizs: quiz }); // 가져온 퀴즈를 JSON 형태로 반환
    } catch (error) {
      next(error);
    }
  };
  //퀴즈 상세 조회
  getQuiz = async (req, res, next) => {
    try {
      const { quizId } = req.params; // URL 파라미터에서 퀴즈 ID 추출

      const quiz = await this.quizService.getQuiz(quizId); // QuizService의 getQuiz 함수 실행

      res.status(200).json({ quiz: quiz }); // 가져온 퀴즈를 JSON 형태로 반환
    } catch (error) {
      next(error);
    }
  };
  //퀴즈생성
  createQuiz = async (req, res, next) => {
    try {
      const { title, answer, explain } = req.body; // 요청 바디에서 퀴즈 제목, 정답, 해설 추출
      const { userId } = res.locals.user; // 로그인한 사용자 ID 추출
      const file = req.file
      if(!file){
        await this.quizService.createQuiz(userId, title, answer, explain); // QuizService의 createQuiz 함수 실행
        return res.status(201).json({
        success: true,
        message: '성공적으로 등록되었습니다.',
      });
      }
      const filename = req.file.filename
      const resourceUrl = `http://52.78.166.176:3000/uploads/${filename}`
      await this.quizService.createQuiz(userId, title, answer, explain, resourceUrl)
      return res.status(201).json({
        success: true,
        message: '성공적으로 등록되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
  // 퀴즈 수정
  updateQuiz = async (req, res, next) => {
    try {
      const { title, answer, explain } = req.body;
      const { userId } = res.locals.user;
      const { quizId } = req.params;
      const file = req.file
      
      if(!file){
        await this.quizService.updateQuiz(userId, quizId, title, answer, explain); // QuizService의 createQuiz 함수 실행
        return res.status(200).json({
        success: true,
        message: '게시글을 수정하였습니다.',
      });
      }
      
      const filename = req.file.filename
      const resourceUrl = `http://52.78.166.176:3000/uploads/${filename}`
      await this.quizService.updateQuiz(userId, quizId, title, answer, explain, resourceUrl);
      return res.status(200).json({
        success: true,
        message: '게시글을 수정하였습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
  // 퀴즈 삭제
  deleteQuiz = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { quizId } = req.params;

      await this.quizService.deleteQuiz(userId, quizId);
      return res.status(200).json({
        success: true,
        message: '게시글을 삭제하였습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
  // 권한 확인
  getAuth = async (req, res, next) => {
    try {
      const { quizId } = req.params;
      const { userId } = res.locals.user;
      await this.quizService.checkAuth(quizId, userId);
      // const chk = await this.quizService.checkAuth(quizId, userId)
      return res.status(200).json({
        success: true,
        message: '수정 및 삭제 권한이 확인 되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
  // 정답 확인
  checkAnswer = async (req, res, next) => {
    try {
      const { answer } = req.body;

      const check = await this.quizService.checkAnswer(answer);
      const collect = '정답 입니다.';
      const wrong = '오답 입니다.';
      if (check) {
        return res.status(200).json({
          success: true,
          message: collect,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: wrong,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = QuizController;
