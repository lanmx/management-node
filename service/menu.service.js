const db = require('../db/index')

class MenuService {
  addMenu(req, res) {
    const params = req.body;
    const menuSQL = 'SELECT * FROM menu WHERE menu=?'
    db.query(menuSQL, params.menu, (err, results) => {
      if(err) return res.back(err)
      if(results.length === 1) {
        return res.back('菜单已存在！')
      } else {
        const sql = 'INSERT INTO menu SET ?'
        db.query(sql, params, (err, results) => {
            if(err) return res.back(err)
            if(results.affectedRows !==1) {
                return res.back('fail')
            } else {
                return res.back('success', 0)
            }
        })
      }
    })
  }

  editMenu(req, res) {
    const params = req.body;
    const sql = 'UPDATE menu SET ? WHERE id=?'
    db.query(sql, [params, params.id] ,(err, results) => {
        if(err) res.back(err)
        if(results.affectedRows !==1) {
            return res.back('fail!')
        } else {
            return res.back('success!', 0)
        }
    })
  }
  deleteMenu(req, res) {
    const params = req.body
    const sql = 'DELETE FROM menu WHERE id=?'
    db.query(sql, params.id, (err, results) => {
        if(err) return res.back(err)
        if(results.affectedRows !==1) {
          return res.back('fail')
        } else {
          return res.back('success', 0)
        }
    })
  }
  getMenu(req, res) {
    const sql = `SELECT * FROM menu`
    db.query(sql, (err, results) => {
      if(err) return res.back(err)
      return res.send({
        status: 0,
        message: 'success',
        data: results
      })
    })
  }

  searchMenu(req, res) {
    const params = req.body
    const sql = `SELECT * FROM menu WHERE menu like '%${params.menu}%'`
    db.query(sql, (err, results) => {
      if(err) return res.back(err)
      return res.send({
        status: 0,
        message: 'success',
        data: results
      })
    })
  }

}

module.exports = new MenuService()