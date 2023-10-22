const db = require('../db/index')
// 用户密码加密包
const bcrypt = require('bcryptjs')
// 生成token包
const jwt = require('jsonwebtoken')
const config = require('../config')

class UserService {
  /* 注册 */
  regUser(req, res) {
    console.log(req.body, "reqxxx");
    const user = req.body
    // 检测用户名是否被占用
    const sql = 'SELECT * FROM users WHERE username=?'
    db.query(sql, user.username, function (err, results) {
      if(err) return res.back(err)
      if(results.length > 0) {
        return res.back('用户名被占用，请更换其它用户名')
      } else {
        // 密码加密
        user.password = bcrypt.hashSync(user.password, 10)
        // 插入一条新的用户
        const sql = 'INSERT INTO users SET ?'
        console.log(sql)
        db.query(sql, {
            username: user.username,
            password: user.password,
            email: user.email
          }, (err, results) => {
            if(err) res.send({ status: 1, message: err.message })
            // if(err) return res.back(err)
            if(results.affectedRows !== 1) {
              return res.send({ status: 1, message: '注册失败，请稍后尝试' })
            }
            return res.send({ status: 0, message: '注册成功' })
        })
      }
    })
  }

  /* 登录 */
  logUser(req, res) {
    const user = req.body
    console.log(user, "req.body");
    const sql = 'SELECT * FROM users WHERE username=?'
    db.query(sql, user.username, (err,results) => {
        if(err) return res.back(err)
        if(results.length !== 1) {
            return res.back('用户未注册，登录失败')
        } else {
            // 判断密码是否和数据库加密的密码一致
            const comRes = bcrypt.compareSync(user.password, results[0].password)
            if(!comRes) {
              return res.back('密码或用户名错误')
            } else {
              // 生成token字符串
              // 先清空密码和头像
              const user = { ...results[0], password: '', user_image: '' }
              const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
              return res.send({
                status: 0,
                message: '登录成功！',
                token: 'Bearer ' + tokenStr,
                data: user.username
              })
            }
            
        }
    })
  }

  /* 获取用户列表 */
  getUser(req,res) {
    const sql = 'SELECT id,username,email,role,department FROM users WHERE status=?'
    db.query(sql, 1, (err, results) => {
        if(err) return res.back(err)
        console.log(results)
        if(results.length >= 0) {
          return res.send({
            status: 0,
            message: 'success',
            data: results,
          })
        }
    })
  }

  /* 获取用户信息 */
  getUserInfo(req,res) {
    const user = req.body
    const sql = 'SELECT id,username,email,user_image FROM users WHERE username=?'
    db.query(sql, user.username, (err, results) => {
      if(err) return res.back(err)
      if(results.length !== 1) {
        return res.back('查询用户信息失败！')
      } else {
        return res.send({
          status: 0,
          message: 'success',
          data: results[0]
        })
      }
    })
  }

  /* 更新用户信息 */
  updateUserInfo(req,res) {
    const user = req.body
    console.log(user,"update")
    // 检查用户名字是否被占用
    const sql = 'SELECT * FROM users WHERE username=?'
    db.query(sql, user.username, (err, results) => {
      if(err) return res.back(err)
      if(results.length > 0) {
        return res.back('用户名被占用，请更换其它用户名')
      } else {
        // 更新用户信息
        const sql = 'UPDATE users SET ? WHERE id=?'
        db.query(sql, [user, user.id], (err, results) => {
          if(err) return res.back(err)
          // affectedRows影响行数
          if(results.affectedRows !==1) {
            return res.back('更新用户信息失败！')
          } else {
            return res.back('更新用户信息成功！')
          }
        })
      }
    })
  }

  /* 重置密码 */
  updatePassword(req,res) {
    const user = req.body
    // 根据id查询用户信息
    const sql = 'SELECT * FROM users WHERE id=?'
    db.query(sql, user.id, (err, results) => {
      if(err) return res.back(err)
      if(results.length !== 1) {
        return res.back('用户不存在！')
      } else {
        // 拿到用户加密的密码解密,判断是否和旧密码一致
        const same =  bcrypt.compareSync(user.oldPwd, results[0].password)
        if(!same) {
          return res.back('输入的旧密码和原密码不一致！')
        } else {
          // 密码加密处理
          const newPwd = bcrypt.hashSync(user.newPwd,10)
          const sql = 'UPDATE users SET password=? WHERE id = ?'
          db.query(sql, [newPwd, user.id], (err,results) => {
            if(err) return res.back(err)
            if(results.affectedRows !== 1) {
              return res.back('重置密码失败！')
            } else {
              return res.back('重置密码成功！')
            }
          })
        }
      }
    })
  }

  /* 更换头像 */
  updateAvatar(req,res) {
    const param = req.body
    const sql = 'UPDATE users SET user_image=? WHERE id=?'
    db.query(sql, [param.avatar, param.id], (err, results) => {
      if(err) return res.back(err)
      if(results.affectedRows !==1) {
        return res.back('更新头像失败！')
      } else {
        return res.back('更新头像成功！')
      }
    })
  }

  /* 退出登录 */
  logout(req,res) {
    return res.back('退出成功!')
  }

  
  
}
module.exports = new UserService();
