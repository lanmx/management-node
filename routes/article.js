var express = require('express')
var router = express.Router()
const ArticleService = require('../service/article.service')
const expressJoi = require('@escook/express-joi')
const { 
    article_add, article_del, article_det, article_upd, 
    article_like, article_collect, article_read } = require('../schema/article')

// 发布文章
router.post('/add', expressJoi(article_add), ArticleService.addArticle)
// 获取文章列表
router.get('/list', ArticleService.getArticle)
// 删除文章
router.get('/delete/:id', expressJoi(article_del), ArticleService.delArticle)
// 获取文章详情
router.get('/detail/:id', expressJoi(article_det), ArticleService.getArticleDetail)
// 更新文章内容
router.post('/update', expressJoi(article_upd), ArticleService.updateArticle)
// 文章点赞
router.post('/like', expressJoi(article_like), ArticleService.likeArticle)
// 文章收藏
router.post('/collect', expressJoi(article_collect), ArticleService.collectArticle)
// 文章阅读量
router.post('/read', expressJoi(article_read), ArticleService.readArticle)
// 热门文章
router.get('/hot', ArticleService.getHot)
// 最新发布
router.get('/newest', ArticleService.getNewest)


module.exports = router