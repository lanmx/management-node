const db = require('../db/blog')

class BlogService {
  /**获取文章列表 */
  getBlog(req, res) {
    const sql = 'SELECT * FROM article'
    db.query(sql, (err,results) => {
      if(err) return res.back(err)
      return res.send({
          status: 0,
          message: '获取文章列表成功，success！',
          data: results
      })
    })
  }

  addBlog(req, res) {
    const params = req.body;
    const sql = 'INSERT INTO article SET ?'
    db.query(sql, params, (err, results) => {
      if(err) return res.back(err)
      if(results.affectedRows !==1) {
          return res.back('fail')
      } else {
          return res.back('success', 0)
      }
    })
  }

  editBlog(req, res) {
    const params = req.body;
    const sql = 'UPDATE article SET ? WHERE id=?'
    db.query(sql, [params, params.id] ,(err, results) => {
        if(err) res.back(err)
        if(results.affectedRows !==1) {
            return res.back('fail!')
        } else {
            return res.back('success!', 0)
        }
    })
  }

  deleteBlog(req, res) {
    const params = req.body
    const sql = 'DELETE FROM article WHERE id=?'
    db.query(sql, params.id, (err, results) => {
        if(err) return res.back(err)
        if(results.affectedRows !==1) {
          return res.back('fail')
        } else {
          return res.back('success', 0)
        }
    })
  }

  searchBlog(req, res) {
    const params = req.body;
    const sql = `SELECT * FROM article WHERE text like '%${params.search}%' OR label like '%${params.search}%' OR description like '%${params.search}%' `
    db.query(sql, (err,results) => {
      if(err) return res.back(err)
      return res.send({
          status: 0,
          message: 'success！',
          data: results
      })
    })
  }
}

module.exports = new BlogService()