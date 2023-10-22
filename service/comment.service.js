const db = require('../db')
const moment = require('moment')

class CommentService {
    /**发表评论 */
    addComment(req, res) {
        const params = req.body
        // 判断评论的文章id是否存在
        const sql = 'SELECT * FROM article WHERE id=?'
        db.query(sql, params.article_id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                return res.back('该文章不存在，评论失败！')
            } else {
                // 判断评论人id是否存在
                const sql = 'SELECT * FROM users WHERE id=?'
                db.query(sql, params.author_id, (err, results) => {
                    if(err) return res.back(err)
                    if(results.length !==1) {
                        return res.back('评论人不存在，评论失败！')
                    } else {
                        params.date = moment().format('YYYY-MM-DD HH:mm:ss')
                        const sql = 'INSERT comment SET ?'
                        db.query(sql, params, (err, results) => {
                            if(err) return res.back(err)
                            if(results.affectedRows !==1) {
                                return res.back('发表评论失败！')
                            } else {
                                res.back('发表评论成功！')
                            }
                        })
                    }
                })
            }
        })
    }

    /**评论列表 */
    getComment(req, res) {
        const params = req.query
        const sql = 'SELECT * FROM comment WHERE is_delete=0 and article_id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            res.send({
                status: 0,
                message: '获取评论列表成功！',
                data: results
            })
        })
    }

    /**删除评论 */
    delComment(req, res) {
        const params = req.params
        const sql = 'SELECT * FROM comment WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                res.back('该评论不存在，删除失败！')
            } else {
                const sql = 'UPDATE comment SET is_delete=1 WHERE id=?'
                db.query(sql, params.id, (err, results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('删除评论失败！')
                    } else {
                        return res.back('删除评论成功！')
                    }
                })
            }
        })
    }

    /**回复评论 */
    answerComment(req, res) {
        const params = req.body
        // 判断文章id是否存在
        const sql_art = 'SELECT * FROM article WHERE id=?';
        // 判断该评论是否存在
        const sql_com = 'SELECT * FROM comment WHERE id=?';
        // 判断评论人id是否存在
        const sql_usr = 'SELECT * FROM users WHERE id=?';
        const sql = `${sql_art};${sql_com};${sql_usr}`
        db.query(sql, [params.article_id, params.comment_id, params.author_id ],(err, results) => {
            if(err) return res.back(err)
            console.log(results.length,"results");
            if(results[0].length !==1) return res.back('该文章不存在，回复评论失败！')
            if(results[1].length !==1) return res.back('该评论不存在，回复评论失败！')
            if(results[2].length !==1) return res.back('当前人信息出错，回复评论失败！')
            params.date = moment().format('YYYY-MM-DD HH:mm:ss')
            const sql = 'INSERT INTO comment SET ?'
            db.query(sql, params, (err, results) => {
                if(err) return res.back(err)
                if(results.affectedRows !==1) {
                    return res.back('回复评论失败！')
                } else {
                    return res.back('回复评论成功！')
                }
            })
        })
    }
}

module.exports = new CommentService()