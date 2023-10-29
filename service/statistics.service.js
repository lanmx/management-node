const db = require('../db/blog')

class MusicService {
  getArticleStatistics(req, res) {
    const sql = 'SELECT id,text,read_count,publish_time,good FROM article'
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