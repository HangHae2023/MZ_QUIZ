const Joi = require('joi');
const Boom = require('boom');
const QuizRepository = require('../repositories/quiz.repository');

//파라미터 값 검증
const quizSchema = Joi.object({
  title: Joi.string().required(), // 제목 필수
  answer: Joi.string().required(), // 해설 필수
  explain: Joi.string().required(), // 힌트 필수
});

class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository(); //QuizRepository 인스턴스 생성
  }
  // 모든 퀴즈를 반환하는 함수
  getAllQuiz = async () => {
    const allQuiz = await this.quizRepository.getAllQuiz();
    // 최신순으로 정렬
    allQuiz.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    // 필요한 정보만 반환
    return allQuiz.map((quiz) => {
      return {
        quizId: quiz.quizId,
        userId: quiz.userId,
        nickname: quiz.nickname,
        title: quiz.title,
        answer: quiz.answer,
        explain: quiz.explain,
        likes: quiz.likes,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
        imgUrl: quiz.resourceUrl,
      };
    });
  };
  // 하나의 퀴즈를 반환하는 함수
  getQuiz = async (quizId) => {
    //게시글이 존재하는지 확인
    const existQuiz = await this.quizRepository.existQuizChk(quizId);
    if (!existQuiz) {
      throw Boom.preconditionFailed('게시글이 존재하지 않습니다.', false);
      // throw new CustomError('게시글이 존재하지 않습니다.', 412, false);
    }
    const quiz = await this.quizRepository.getQuiz(quizId);

    // 필요한 정보만 반환
    return {
      quizId: quiz.quizId,
      userId: quiz.userId,
      nickname: quiz.nickname,
      title: quiz.title,
      answer: quiz.answer,
      explain: quiz.explain,
      likes: quiz.likes,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      imgUrl: quiz.resourceUrl,
    };
  };
  // 퀴즈를 생성하는 함수
  createQuiz = async (userId, title, answer, explain, resourceUrl) => {
    const resultSchema = await quizSchema.validate({ title, answer, explain });
    // 스키마 검증 실패 시, 각각의 필드에 대한 오류 메시지를 반환
    if (resultSchema.error && title.length < 1) {
      throw Boom.preconditionFailed('제목을 입력해주세요.', false);
    }
    if (resultSchema.error && answer.length < 1) {
      throw Boom.preconditionFailed('해설 내용을 입력해주세요.', false);
    }
    if (resultSchema.error && explain.length < 1) {
      throw Boom.preconditionFailed('힌트 내용을 입력해주세요.', false);
    }
    // 퀴즈 생성
    await this.quizRepository.createQuiz(
      userId,
      title,
      answer,
      explain,
      resourceUrl
    );
  };

  createImgUrl = async (resourceUrl) => {
    await this.quizRepository.createImgUrl(resourceUrl);
  };
  // 퀴즈를 수정하는 함수
  updateQuiz = async (userId, quizId, title, answer, explain) => {
    const resultSchema = await quizSchema.validate({ title, answer, explain });
    // 스키마 검증 실패 시, 각각의 필드에 대한 오류 메시지를 반환
    if (resultSchema.error && title.length < 1) {
      throw Boom.preconditionFailed('제목을 입력해주세요.', false);
    }
    if (resultSchema.error && answer.length < 1) {
      throw Boom.preconditionFailed('해설 내용을 입력해주세요.', false);
    }
    if (resultSchema.error && explain.length < 1) {
      throw Boom.preconditionFailed('힌트 내용을 입력해주세요.', false);
    }
    const existQuiz = await this.quizRepository.existQuizChk(quizId);
    if (!existQuiz) {
      throw Boom.notFound('게시글이 존재하지 않습니다.', false);
    }
    const userAuthChk = await this.quizRepository.findUpdateAuth(quizId);
    if (userAuthChk.userId !== userId) {
      throw Boom.forbidden('수정할 권한이 없습니다.' , false);
    }
    //퀴즈 정보 업데이트
    await this.quizRepository.updateQuiz(
      userId,
      quizId,
      title,
      answer,
      explain
    );
  };
  // 퀴즈를 삭제하는 함수
  deleteQuiz = async (userId, quizId) => {
    const existQuiz = await this.quizRepository.existQuizChk(quizId);
    if (!existQuiz) {
      throw Boom.notFound('게시글이 존재하지 않습니다.', false);
    }
    const userAuthChk = await this.quizRepository.findUpdateAuth(quizId);
    if (userAuthChk.userId !== userId) {
      throw Boom.forbidden('삭제할 권한이 없습니다.' , false);
    }
    await this.quizRepository.deleteQuiz(userId, quizId);
  };
  //정답을 확인하는 함수
  checkAnswer = async (answer) => {
    if (answer.length < 1) {
      throw Boom.preconditionFailed('정답을 입력해주세요.', false);
    }
    const checkAnswer = await this.quizRepository.checkAnswer(answer);
    if (!checkAnswer) {
      return false;
    } else return true;
  };
  //권한 확인
  checkAuth = async (quizId, userId) => {
    const userAuthChk = await this.quizRepository.findUpdateAuth(quizId);
    if (userAuthChk.userId !== userId) {
      throw Boom.forbidden('권한이 없습니다.' , false);
    }
  };
}
module.exports = QuizService;
