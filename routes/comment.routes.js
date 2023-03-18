const express = require('express');
const router = express.Router();

const CommentsController = require('../controller/comment.controller');

const commentController = new CommentsController();

// 댓글 작성 - authMiddleware 추가 필요
router.post('/:quizId', commentController.writeComment);
// 댓글 조회 - authMiddleware 추가 필요
router.get('/:quizId', commentController.selectComments);
// 댓글 수정 - authMiddleware 추가 필요
router.put('/:commentId', commentController.updateComment);
// 댓글 삭제 - authMiddleware 추가 필요
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
