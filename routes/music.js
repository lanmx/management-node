var express = require('express')
var router = express.Router()
const MusicService = require('../service/music.service')
const expressJoi = require('@escook/express-joi')
const { reg_add, reg_delete, reg_edit, reg_search } = require('../schema/music')


/* 音乐列表 */
router.get('/list', MusicService.getMusic)
/* 添加音乐 */
router.post('/add', expressJoi(reg_add), MusicService.addMusic)
/* 编辑音乐 */
router.post('/edit', expressJoi(reg_edit), MusicService.editMusic)
/* 删除音乐 */
router.post('/delete', expressJoi(reg_delete), MusicService.deleteMusic)
/* 搜索音乐 */
router.post('/search', expressJoi(reg_search),  MusicService.searchMusic)

module.exports = router;