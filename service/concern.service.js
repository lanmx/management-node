const db = require('../db/index')

class ConcernService {
  /* 关注用户 */
  concernUser(req, res) {
    const params = req.body
    const sql = `SELECT * FROM users WHERE id in (${params.user_id}, ${params.author_id})`
    db.query(sql, (err, results) => {
      if(err) return res.back(err)
      if(results.length === 1) return res.back('用户id或被关注的id不存在！')
      if(results.length === 2) {
        // 判断是否已关注
        const sql = 'SELECT * FROM concern WHERE user_id=? and author_id=?'
        db.query(sql, [ params.user_id, params.author_id ], (err, results) => {
          if(err) return res.back(err)
          if(results.length === 1) {
            if(results[0].is_uncare === 0) {
                return res.back('你已关注该用户，无需再次关注!')
            } else if (results[0].is_uncare === 1) {
                const sql = 'UPDATE concern SET is_uncare=0 WHERE user_id=? and author_id=?'
                db.query(sql, [ params.user_id, params.author_id ], (err, results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('关注用户失败！')
                    } else {
                        return res.back('关注用户成功！')
                    }
                })
            }
          } else {  
            const sql = 'INSERT INTO concern SET ?'
            db.query(sql, params, (err, results) => {
                if(err) return res.back(err)
                if(results.affectedRows !==1) {
                    return res.back('关注用户失败！')
                } else {
                    return res.back('关注用户成功！')
                }
            })
          }
        })
      } else {
        return res.back('fail!')
      }
    })
  }

  /* 取消关注 */
  uncareUser(req, res) {
    const params = req.body
    const sql = 'UPDATE concern SET is_uncare=1 WHERE id=?'
    db.query(sql, params.id, (err, results) => {
      if(err) return res.back(err)
      if(results.affectedRows !==1) {
        return res.back('取消关注用户失败！')
      } else {
        return res.back('取消关注用户成功！')
      }
    })
  }

  /* 获取关注列表 */
  getCares(req, res) {
    const params = req.query
    const sql = 'SELECT * FROM concern WHERE author_id=? and is_uncare=0'
    db.query(sql, params.id, (err, results) => {
      if(err) return res.back(err)
      const ids = results.map(item => item.user_id)
      console.log(ids);
      const sql = `SELECT id,username,email,user_image FROM users WHERE id in (${ids.toString() ? ids.toString() : null})`
      console.log(sql);
      db.query(sql, (err, results) => {
        if(err) return res.back(err)
        return res.send({
          status: 0,
          message: '获取关注列表成功！',
          data: results
        })
      })
    })
  }

  /* 获取粉丝列表 */
  getFans(req, res) {
    const params = req.query
    const sql = 'SELECT * FROM concern WHERE user_id=? and is_uncare=0'
    db.query(sql, params.id, (err, results) => {
      if(err) return res.back(err)
      const ids = results.map(item => item.author_id)
      const sql = `SELECT id,username,email,user_image FROM users WHERE id in (${ids.toString() ? ids.toString() : null})`
      db.query(sql, (err, results) => {
        if(err) return res.back(err)
          return res.send({
            status: 0,
            message: '获取粉丝列表成功！',
            data: results
          })
        })
    })
  }

}

module.exports = new ConcernService()