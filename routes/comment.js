var express = require('express')
var router = express.Router()
const CommentService = require('../service/comment.service')
const { comment_add, comment_del, comment_get, comment_answer } = require('../schema/comment')
const expressJoi = require('@escook/express-joi')

// 发表评论
router.post('/add', expressJoi(comment_add), CommentService.addComment)
// 评论列表
router.get('/list', expressJoi(comment_get), CommentService.getComment)
// 删除评论
router.get('/delete/:id', expressJoi(comment_del), CommentService.delComment)
// 回复评论
router.post('/answer', expressJoi(comment_answer), CommentService.answerComment)

module.exports = router