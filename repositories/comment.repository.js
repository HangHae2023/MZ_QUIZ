const { QuizPost, QuizComment, Users } = require('../models');

class AuthRepository {
  /**
   * 퀴즈 검색
   * @param {Integer} quizId
   * @return {퀴즈 검색} QuizComments.findOne()
   */
  findQuiz = async (quizId) => {
    // quiz 검색
    const writeComment = await QuizPost.findOne({ where: { quizId } });

    return writeComment;
  };

  /**
   * 댓글 검색
   * @param {Integer} commentId
   * @param {String} userId
   * @return {퀴즈 검색} QuizComments.findOne()
   */
  findQuizComment = async (commentId, userId) => {
    // quiz 검색
    const findQuizComment = await QuizComment.findOne({
      where: { commentId, userId },
    });

    return findQuizComment;
  };

  /**
   * 댓글 생성
   * @param {Integer} quizId
   * @param {String} userId
   * @param {String} content
   * @return {생성된 댓글 데이터} QuizComments.create()
   */
  writeComment = async (quizId, userId, content) => {
    // create() 메서드는 반환
    const writeComment = await QuizComment.create({
      quizId,
      userId,
      content,
    });

    return writeComment;
  };

  /**
   * 댓글 수정
   * @param {Integer} commentId
   * @param {String} userId
   * @param {String} content
   * @return {수정된 행의 수} QuizComments.update()
   */
  updateComment = async (commentId, userId, content) => {
    // 수정된 행의 수
    const updateComment = await QuizComment.update(
      { content },
      { where: { commentId, userId } }
    );

    return updateComment;
  };

  /**
   * 댓글 삭제
   * @param {string} commentId
   * @return {삭제된 행의 수} QuizComments.destory()
   */
  deleteComment = async (commentId) => {
    // 삭제된 행의 수
    const deleteComment = QuizComment.destroy({
      where: {
        commentId: commentId,
      },
    });

    return deleteComment;
  };

  /**
   * 댓글 조회
   * @param {string} quizId
   * @return {조회된 댓글 리스트} QuizComments.findAll()
   */
  selectComments = async (quizId) => {

    console.log("\n\n왜",quizId+"\n\n?")
    // 조회된 댓글 리스트
    const selectComments = await QuizComment.findAll({
      where: {
        quizId,
      },
      attributes: ['commentId', 'quizId', 'content', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
    });

    const comments = selectComments.map((comment) => ({
      commentId: comment.commentId,
      quizId: comment.quizId,
      nickname: comment.User.nickname,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    return selectComments;
  };

  /**
   *
   * @param {Integer} commentId
   * @returns 검색된 댓글 정보
   */
  findUpdateAuth = async (commentId) => {
    const findAuth = await QuizComment.findOne({
      where: { commentId },
    });
    return findAuth;
  };
}

module.exports = AuthRepository;
