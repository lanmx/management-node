const joi = require('joi')

// 定义用户名、密码、邮箱的验证规则
const username = joi.string().alphanum().min(1).max(16).required()
const password = joi.string().required().pattern(/^[\S]{6,12}/)  // 非空字符串
const email = joi.string().required().pattern(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)  // 邮箱
// const email = joi.string().email().required()
const id = joi.number().integer().min(1).required()
// dataUri格式为 data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=的字符串数据
const avatar = joi.string().dataUri().required()
const signature = joi.string().allow('')

// 注册验证
exports.reg_signup = { body: { username, password, email } }
// 登录验证
exports.reg_login = { body: { username, password } }
// 修改用户信息验证
exports.reg_user = { body: { id, username, email, signature } }
// 重置密码验证
exports.reg_pwd = {
    body: {
        id, oldPwd: password,
        // joi.ref('oldPwd')表示newPwd的值必须和oldPwd一致
        // joi.not(joi.ref('oldPwd'))表示newPwd的值不能等于oldPwd
        // concat用户合并验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
// 头像验证
exports.reg_avatar = { body: { id, avatar } }
// 删除用户
exports.reg_delete = { body: { id } }
// 搜索用户
exports.reg_search = { body: { username: joi.string().allow('') }}