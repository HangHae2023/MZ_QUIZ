const { QuizPost, Comments, Likes, sequelize, Users } = require('../models');
const { parseModelToFlatObject } = require('../helpers/sequelize.helper');
const { Op } = require('sequelize');

class QuizRepository extends QuizPost {
  constructor() {
    super();
  }
  getAllQuiz = async () => {
    const quiz = await QuizPost.findAll({
        attributes: [
          'quizId',
          'title',
          'answer',
          'explain',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: Users,
            attributes: ['userId', 'nickname'],
          },
        ],
        group: ['QuizPost.quizId'],
        order: [['createdAt', 'DESC']],
        raw: true, // raw: true를 하면 데이터를 JSON 형태로 반환해준다.
    });
    
    const allQuizs = quiz.map(parseModelToFlatObject);
    return allQuizs
  }

  getQuiz = async (quizId) => {
    const quiz = await QuizPost.findOne({
      attributes: [
          'quizId',
          'title',
          'answer',
          'explain',
          'createdAt',
          'updatedAt',
        ],
        where: {quizId},
        include: [
          {
            model: Users,
            attributes: ['userId', 'nickname'],
          },
        ],
        raw: true,
      }).then(parseModelToFlatObject);
    
    return quiz
  }

  createQuiz = async ( userId, title, answer, explain) => {
    const createQuizData =  await QuizPost.create({ userId, title, answer, explain});

    return createQuizData;
  }
  createImgUrl = async ( resourceUrl) => {
    const createImgUrl =  await QuizPost.create({ resourceUrl });
    return createImgUrl;
  }
  findUpdateAuth = async ( quizId ) => {
    const findAuth = await QuizPost.findOne({ 
      where : { quizId }
    });
    return findAuth
  }
  updateQuiz = async ( userId, quizId, title, answer, explain) => {
    const updateQuiz = await QuizPost.update(
      {title, answer, explain},
      {where: {quizId, userId}}
    )
    return updateQuiz
  }
  existQuizChk = async ( quizId ) => {
    const existQuiz = await QuizPost.findOne({ 
      where : { quizId }
    });
    return existQuiz
  }

  deleteQuiz = async ( userId, quizId) => {
    const deleteQuiz = await QuizPost.destroy({
      where: { quizId, userId },
    });
    return deleteQuiz;
  }

  checkAnswer = async (answer) => {
    const checkAnswer = await QuizPost.findOne({ 
      where : { answer }
    });
    return checkAnswer
  }
}
module.exports = QuizRepository;