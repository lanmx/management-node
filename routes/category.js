var express = require('express')
var router = express.Router()
const CategoryService = require('../service/category.service')
const { category_add, category_del, category_get, category_upd } = require('../schema/category')
const expressJoi = require('@escook/express-joi')

// 获取文章分类列表
router.get('/list', CategoryService.getCate)
// 新增文章分类
router.post('/add', expressJoi(category_add), CategoryService.addCate)
// 删除文章分类
router.get('/delete/:id',expressJoi(category_del), CategoryService.deleteCate)
// 获取文章分类详情
router.get('/cate/:id', expressJoi(category_get), CategoryService.getCateId)
// 更新文章分类
router.post('/update', expressJoi(category_upd), CategoryService.updateCate)


module.exports = router;