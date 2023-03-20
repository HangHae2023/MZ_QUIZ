const { QuizPost, Users } = require('../models');
const { parseModelToFlatObject } = require('../helpers/sequelize.helper');
// const { Op } = require('sequelize');

class QuizRepository extends QuizPost {
  // QuizPost 모델을 상속하는 QuizRepository 클래스 선언
  constructor() {
    super();
  }
  // 모든 퀴즈를 가져오는 함수
  getAllQuiz = async () => {
    const quiz = await QuizPost.findAll({
      attributes: [
        'quizId',
        'title',
        'answer',
        'explain',
        'createdAt',
        'updatedAt',
        'resourceUrl',
      ],
      include: [
        {
          model: Users,
          attributes: ['userId', 'nickname'],
        },
      ],
      group: ['QuizPost.quizId'], // quizId로 그룹화하여 집계
      order: [['createdAt', 'DESC']], // 생성일 기준으로 내림차순 정렬
      raw: true, // raw: true를 하면 데이터를 JSON 형태로 반환해준다.
    });

    const allQuizs = quiz.map(parseModelToFlatObject); // 각 퀴즈 데이터를 평면 객체로 변환하여 배열에 저장
    return allQuizs; // 변환된 데이터 배열 반환
  };
  // 특정 퀴즈를 가져오는 함수
  getQuiz = async (quizId) => {
    const quiz = await QuizPost.findOne({
      attributes: [
        'quizId',
        'title',
        'answer',
        'explain',
        'createdAt',
        'updatedAt',
        'resourceUrl',
      ],
      where: { quizId },
      include: [
        {
          model: Users,
          attributes: ['userId', 'nickname'],
        },
      ],
      raw: true,
    }).then(parseModelToFlatObject); // 퀴즈 데이터를 평면 객체로 변환

    return quiz;
  };
  // 새로운 퀴즈를 생성하는 함수
  createQuiz = async (userId, title, answer, explain, resourceUrl) => {
    const createQuizData = await QuizPost.create({
      userId,
      title,
      answer,
      explain,
      resourceUrl,
    });

    return createQuizData;
  };
  // 이미지 URL을 생성하는 함수 테스트 후 삭제 예정
  createImgUrl = async (resourceUrl) => {
    const createImgUrl = await QuizPost.create({ resourceUrl });
    return createImgUrl;
  };
  // 수정 권한이 있는지 확인하는 함수
  findUpdateAuth = async (quizId) => {
    const findAuth = await QuizPost.findOne({
      where: { quizId },
    });
    return findAuth;
  };
  // 퀴즈를 수정하는 함수
  updateQuiz = async (userId, quizId, title, answer, explain) => {
    const updateQuiz = await QuizPost.update(
      { title, answer, explain },
      { where: { quizId, userId } }
    );
    return updateQuiz;
  };
  // 퀴즈가 존재 하는지 확인하는 함수
  existQuizChk = async (quizId) => {
    const existQuiz = await QuizPost.findOne({
      where: { quizId },
    });
    return existQuiz;
  };
  // 퀴즈를 삭제하는 함수
  deleteQuiz = async (userId, quizId) => {
    const deleteQuiz = await QuizPost.destroy({
      where: { quizId, userId },
    });
    return deleteQuiz;
  };
  // 퀴즈 정답이 맞는지 확인하는 함수
  checkAnswer = async (answer) => {
    const checkAnswer = await QuizPost.findOne({
      where: { answer },
    });
    return checkAnswer;
  };
}
module.exports = QuizRepository;
