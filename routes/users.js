var express = require('express');
var router = express.Router();
const UserService = require('../service/user.servive');
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象
const { reg_signup, reg_login, reg_user, reg_pwd, reg_avatar } = require('../schema/user')

/* 注册 */
router.post('/signup', expressJoi(reg_signup), UserService.regUser)
/* 登录 */
router.post('/login', expressJoi(reg_login),  UserService.logUser)
/* 获取所有用户列表 */
router.get('/list', UserService.getUser)
/* 获取用户信息 */
router.post('/info', UserService.getUserInfo)
/* 更新用户信息 */
router.post('/update', expressJoi(reg_user), UserService.updateUserInfo)
/* 重置密码 */
router.post('/updatepwd', expressJoi(reg_pwd), UserService.updatePassword)
/* 更换头像 */
router.post('/update/avatar',expressJoi(reg_avatar), UserService.updateAvatar)
/* 退出登录 */
router.post('/logout', UserService.logout)



module.exports = router;