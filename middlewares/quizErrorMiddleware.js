const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res) => {
  try {
    const { title, answer, explain } = req.body

    if (title.length < 1) {
      return res.status(412).send({
        success: false,
        errorCode : 3,
        errorMessage: '제목을 입력해주세요.',
      });
    }

    if (answer.length < 1) {
        return res.status(412).send({
          success: false,
          errorCode : 4,
          errorMessage: '정답을 입력해주세요.',
        });
      }

    if (explain.length < 1) {
        return res.status(412).send({
          success: false,
          errorCode : 5,
          errorMessage: '해설을 입력해주세요.',
        });
    }
    
    } catch (error) {
    console.error(error);
    return res.status(404).send({
        success: false,
        errorMessage: '퀴즈에서 알수 없는 에러가 발생했습니다.',
    });
  }
};
