var express = require('express')
var router = express.Router()
const MenuService = require('../service/menu.service')
const expressJoi = require('@escook/express-joi')
const { reg_add, reg_delete, reg_edit, reg_search } = require('../schema/menu')


/* 添加菜单 */
router.post('/add', expressJoi(reg_add), MenuService.addMenu)
/* 删除菜单 */
router.post('/delete', expressJoi(reg_delete), MenuService.deleteMenu)
/* 编辑菜单 */
router.post('/edit', expressJoi(reg_edit), MenuService.editMenu)
/* 菜单列表 */
router.get('/list', MenuService.getMenu)
/* 搜索菜单 */
router.post('/search', expressJoi(reg_search),  MenuService.searchMenu)

module.exports = router;