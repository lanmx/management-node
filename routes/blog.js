var express = require('express')
var router = express.Router()
const BlogService = require('../service/blog.service')
const expressJoi = require('@escook/express-joi')
const { reg_add, reg_delete, reg_edit, reg_search } = require('../schema/blog')


/* 文章列表 */
router.get('/list', BlogService.getBlog);
/* 添加文章 */
router.post('/add', expressJoi(reg_add),  BlogService.addBlog)
/* 删除文章 */
router.post('/delete', expressJoi(reg_delete), BlogService.deleteBlog)
/* 编辑文章 */
router.post('/edit', expressJoi(reg_edit), BlogService.editBlog)
/* 搜索文章 */
router.post('/search',  expressJoi(reg_search), BlogService.searchBlog)

module.exports = router;