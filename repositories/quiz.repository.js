const { QuizPost, Comments, Likes, sequelize, Users } = require('../models');
const { parseModelToFlatObject } = require('../helpers/sequelize.helper');

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

  createQuiz = async ( userId, title, answer, explain) => {
    const createQuizData =  await QuizPost.create({ userId, title, answer, explain});

    return createQuizData;
  }
  createImgUrl = async ( resourceUrl) => {
    const createImgUrl =  await QuizPost.create({ resourceUrl });
    return createImgUrl;
  }
  
}
module.exports = QuizRepository;