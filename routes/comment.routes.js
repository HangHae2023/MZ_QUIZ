const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const CommentsController = require('../controller/comment.controller');

const commentController = new CommentsController();

// 댓글 작성 - authMiddleware 추가 필요
router.post('/:quizId', authMiddleware, commentController.writeComment);
// 댓글 조회
router.get('/:quizId', commentController.selectComments);
// 댓글 수정 - authMiddleware 추가 필요
router.put('/:commentId', authMiddleware, commentController.updateComment);
// 댓글 삭제 - authMiddleware 추가 필요
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
