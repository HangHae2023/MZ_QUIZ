const Joi = require('joi');
const Boom = require('boom');
const CustomError = require('../middlewares/errorHandler');
const CommentService = require('../services/comment.service');

class AuthController {
  commentService = new CommentService();

  /**
   * 댓글 작성
   */
  writeComment = async (req, res, next) => {
    try {
      const { quizId } = req.params;
      const { content } = req.body;
      const user = res.locals.user;

      // 검증할 스키마를 정의한다
      const schema = Joi.object({
        content: Joi.string().required(),
      });

      // 스키마를 이용해 데이터를 검증한다
      const { error } = schema.validate({ content });

      // 검증 결과를 확인한다
      if (error || content == '') {
        throw Boom.preconditionFailed('댓글 내용을 입력해주세요.', false);
      }

      const writeComment = await this.commentService.writeComment(
        quizId,
        user.userId,
        content
      );

      if (writeComment == null) {
        throw Boom.badRequest('댓글 작성에 실패했습니다.', false);
      } else {
        return res.status(200).json({
          success: true,
          message: '댓글을 작성하였습니다.',
        });
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * 댓글 조회
   */
  selectComments = async (req, res, next) => {
    try {
      const { quizId } = req.params;

      const selectComments = await this.commentService.selectComments(quizId);

      return res.status(200).json({
        success: true,
        comments: selectComments,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * 댓글 수정
   */
  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const user = res.locals.user;

      // 검증할 스키마를 정의한다
      const schema = Joi.object({
        content: Joi.string().required(),
      });

      // 스키마를 이용해 데이터를 검증한다
      const { error } = schema.validate({ content });

      // 검증 결과를 확인한다
      if (error || content == '') {
        throw Boom.preconditionFailed('댓글 내용을 입력해주세요', false);
      }

      const updateComment = await this.commentService.updateComment(
        commentId,
        content,
        user.userId
      );

      if (updateComment === 0) {
        throw Boom.badRequest('댓글 수정에 실패했습니다', false);
      } else {
        return res.status(200).json({
          success: true,
          message: '댓글을 수정하였습니다.',
        });
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * 댓글 삭제
   */
  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const user = res.locals.user;

      const deleteComment = await this.commentService.deleteComment(
        commentId,
        user.userId
      );

      if (deleteComment === 0) {
        throw Boom.badRequest('댓글 삭제에 실패했습니다', false);
      } else {
        return res.status(200).json({
          success: true,
          message: '댓글을 삭제하였습니다.',
        });
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * 댓글 권한 확인
   * @returns res
   */
  getAuth = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      await this.commentService.checkAuth(commentId, userId);
      // const chk = await this.quizService.checkAuth(quizId, userId)
      return res.status(200).json({
        success: true,
        message: '수정 및 삭제 권한이 확인 되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
