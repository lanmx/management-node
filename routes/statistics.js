var express = require('express')
var router = express.Router()
const StatisticsService = require('../service/statistics.service')
const expressJoi = require('@escook/express-joi')


/* 博客阅读量条形图 */
router.post('/read', StatisticsService.getArticleStatistics)

module.exports = router;