const db = require('../db/blog')

class MusicService {
  getMusic(req, res) {
    const sql = 'SELECT * FROM music'
    db.query(sql, (err,results) => {
      if(err) return res.back(err)
      return res.send({
          status: 0,
          message: 'success！',
          data: results
      })
    })
  }

  addMusic(req, res) {
    const params = req.body;
    const sql = 'INSERT INTO music SET ?'
    db.query(sql, params, (err, results) => {
      if(err) return res.back(err)
      if(results.affectedRows !==1) {
          return res.back('fail')
      } else {
          return res.back('success', 0)
      }
    })
  }

  editMusic(req, res) {
    const params = req.body;
    const sql = 'UPDATE music SET ? WHERE id=?'
    db.query(sql, [params, params.id] ,(err, results) => {
        if(err) res.back(err)
        if(results.affectedRows !==1) {
            return res.back('fail!')
        } else {
            return res.back('success!', 0)
        }
    })
  }

  deleteMusic(req, res) {
    const params = req.body
    const sql = 'DELETE FROM music WHERE id=?'
    db.query(sql, params.id, (err, results) => {
        if(err) return res.back(err)
        if(results.affectedRows !==1) {
          return res.back('fail')
        } else {
          return res.back('success', 0)
        }
    })
  }

  searchMusic(req, res) {
    const params = req.body;
    const sql = `SELECT * FROM music WHERE songname like '%${params.search}%' OR author like '%${params.search}%'`
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

module.exports = new MusicService()