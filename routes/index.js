const express = require('express');
const router = express.Router();
const commentRouter = require('./comment.routes');

router.use('/comment', [commentRouter]);

module.exports = router;
