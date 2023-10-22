const db = require('../db/index')
const moment = require('moment')

class ArticleService {
    /**发布文章 */
    addArticle(req,res) {
        const params = req.body
        // 获取当下日期
        params.pub_date = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = 'INSERT INTO article SET ?'
        db.query(sql, params, (err, results) => {
            if(err) return res.back(err)
            if(results.affectedRows !==1) {
                return res.back('发布文章失败！')
            } else {
                return res.back('发布文章成功！')
            }
        })
        
    }

    /**获取文章列表 */
    getArticle(req,res) {
        const sql = 'SELECT * FROM article WHERE is_delete=0'
        db.query(sql, (err, results) => {
            if(err) return res.back(err)
            return res.send({
                status: 0,
                message: '获取文章列表成功！',
                data: results
            })
        })
    }

    /**删除文章 */
    delArticle(req,res) {
        const params = req.params
        const sql = 'SELECT * FROM article WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) res.back(err)
            if(results.length !== 1) {
                return res.back('不存在该条数据!')
            } else {
                const sql = 'UPDATE article SET is_delete=1 WHERE id=?'
                db.query(sql, params.id, (err, results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('删除文章失败！')
                    } else {
                        return res.back('删除文章成功！')
                    }
                })
            }
        })
    }

    /**获取文章详情 */
    getArticleDetail(req, res) {
        const params = req.params
        const sql = 'SELECT * FROM article WHERE id=?'
        db.query(sql, params.id, (err,results) => {
            if(err) res.back(err)
            if(results.length !==1) {
                res.back('不存在该文章！')
            } else {
                res.send({
                    status: 0,
                    message: '获取文章详情成功！',
                    data: results[0]
                })
            }
        })
    }

    /**更新文章内容 */
    updateArticle(req, res) {
        const params = req.body
        params.modified_date = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = 'SELECT * FROM article WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                return res.back('不存在该文章！')
            } else {
                const sql = 'UPDATE article SET ? WHERE id=?'
                db.query(sql, [params, params.id] ,(err, results) => {
                    if(err) res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('更新文章失败！')
                    } else {
                        return res.back('更新文章成功！')
                    }
                })
            }
        })
    }

    /**文章点赞 */
    likeArticle(req, res) {
        const params = req.body
        const sql = 'SELECT * FROM article WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                res.back('该文章不存在！')
            } else {
                const sql = 'UPDATE article SET likes_num = likes_num + 1 WHERE id=?'
                db.query(sql, params.id, (err, results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('出错了，点赞失败！')
                    } else {
                        return res.back('点赞成功！')
                    }
                })
            }
        })
    }

    /**文章收藏 */
    collectArticle(req, res) {
        const params = req.body
        const sql_art = 'SELECT * FROM article WHERE id=?'
        const sql_usr = 'SELECT * FROM users WHERE id=?'
        const sql = `${sql_art};${sql_usr}`
        db.query(sql, [ params.article_id, params.author_id ], (err, results) => {
            if(err) return res.back(err)
            if(results[0].length !==1) return res.back('该文章不存在，收藏失败！')
            if(results[1].length !==1) return res.back('登录人信息不存在，收藏失败！')
            const sql = 'INSERT INTO collection SET ?'
            db.query(sql, params, (err, results) => {
                if(err) return res.back(err)
                if(results.affectedRows !==1){
                    return res.back('出错了，收藏失败！')
                } else {
                    return res.back('收藏文章成功！')
                }
            })
        })

    }

    /**文章阅读量 */
    readArticle(req, res) {
        const params = req.body
        const sql = 'SELECT * FROM article WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                return res.back('该文章不存在！')
            } else {
                const sql = 'UPDATE article SET read_num = read_num + 1 WHERE id=?'
                db.query(sql, params.id, (err,results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('fail！')
                    } else {
                        return res.back('success!')
                    }
                })
            }
        })
    }

    /**热门文章 */
    getHot(req, res) {
        // 按照阅读量排序前三篇
        const sql = 'SELECT * FROM article WHERE is_delete=0 and status=? ORDER BY read_num desc limit 3'
        db.query(sql, '已发布', (err, results) => {
            if(err) return res.back(err)
            return res.send({
                status: 0,
                message: '获取热门文章成功！',
                data: results
            })
        })
    }

    /**最新发布 */
    getNewest(req, res) {
        const sql = 'SELECT * FROM article WHERE is_delete=0 and status=? ORDER BY pub_date desc limit 3'
        db.query(sql, '已发布', (err, results) => {
            if(err) return res.back(err)
            return res.send({
                status: 0, 
                message: '获取最新发布成功！',
                data: results
            })
        })
    }
}

module.exports = new ArticleService()