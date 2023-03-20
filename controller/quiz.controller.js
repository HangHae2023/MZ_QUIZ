const QuizService = require('../services/quiz.service');
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

      res.status(200).json({ quiz: quiz });// 가져온 퀴즈를 JSON 형태로 반환
    } catch (error) {
      next(error);
    }
  };
  //퀴즈생성
  createQuiz = async (req, res, next) => {
    try {
      const { title, answer, explain} = req.body; // 요청 바디에서 퀴즈 제목, 정답, 해설 추출
      const { userId } = res.locals.user; // 로그인한 사용자 ID 추출
      
      // 이미지 파일이 있는 경우, 파일 저장 및 파일 URL 추출
      if (req.file){
        const storage = multer.diskStorage({ //multer의 디스크 저장소를 생성
          destination: function (cb) {
        const dir = '../uploads';
        
        //multer의 디스크 저장소를 생성
        if (!fs.existsSync(dir)) { 
        fs.mkdirSync(dir);
        }
        cb(null, dir); // multer의 콜백 함수로, 디렉토리 생성이 완료된 후 호출. 첫 번째 인자는 에러를 전달하고, 두 번째 인자로 생성한 디렉토리 경로를 전달.
        },
        filename: function (file, cb) { 
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); //저장될 파일의 이름을 설정. 파일의 이름은 fieldname, Date.now(), originalname의 조합으로 생성.
        }
        });
        //이미지 크기 제한 설정 및 업로드
        multer({
          storage: storage,
          limits: { fileSize: 1024 * 1024 * 100 }, // 100MB
        });

        const resourceUrl = `http://${req.headers.host}/uploads/${req.file.filename}` //이미지 파일이 업로드된 후에 파일의 URL을 추출합니다. URL은 http://${req.headers.host}/uploads/${req.file.filename} 형태
        await this.quizService.createQuiz(userId, title, answer, explain, resourceUrl); //이미지 파일이 있는 경우, 파일 URL을 포함하여 퀴즈 게시글을 생성합니다.
      }

      await this.quizService.createQuiz(userId, title, answer, explain); // QuizService의 createQuiz 함수 실행
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

      await this.quizService.updateQuiz(userId, quizId, title, answer, explain);
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
