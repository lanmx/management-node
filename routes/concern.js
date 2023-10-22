var express = require('express')
var router = express.Router()
const ConcernService = require('../service/concern.service')
const expressJoi = require('@escook/express-joi')
const { reg_care, reg_uncare, reg_cares, reg_fans } = require('../schema/concern')


/* 关注 */
router.post('/care', expressJoi(reg_care), ConcernService.concernUser)
/* 取消关注 */
router.post('/uncare', expressJoi(reg_uncare), ConcernService.uncareUser)
/* 获取关注列表 */
router.get('/cares', expressJoi(reg_cares), ConcernService.getCares)
/* 获取粉丝列表 */
router.get('/fans',expressJoi(reg_fans), ConcernService.getFans)


module.exports = router;