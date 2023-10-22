const db = require('../db/index')

class CategoryService {
    /**获取分类列表 */
    getCate(req,res) {
        const sql = 'SELECT * FROM article_cate WHERE is_delete=0 ORDER BY id asc'
        db.query(sql,(err,results) => {
            if(err) return res.back(err)
            return res.send({
                status: 0,
                message: '获取文章分类列表成功！',
                data: results
            })
        })
    }

    /**新增分类 */
    addCate(req,res) {
        const params = req.body
        // 判断该分类数据库是否已存在
        const sql = 'SELECT * FROM article_cate WHERE name=? OR alias=?'
        db.query(sql,[ params.name, params.alias ],(err,results) => {
            if(err) return res.back(err)
            if(results.length > 0) {
                const target = results[0]
                if(params.name===target.name && params.alias===target.alias) return res.back('分类名和别名都已被占用！')
                if(params.name===target.name && params.alias!==target.alias) return res.back('分类名已被占用！')
                if(params.name!==target.name && params.alias===target.alias) return res.back('别名已被占用！')
            } else {
                const sql = 'INSERT INTO article_cate SET ?'
                db.query(sql, params, (err, results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !== 1) {
                        return res.back('新增文章分类失败！')
                    } else {
                        return res.back('新增文章分类成功！')
                    }
                })
            }
        })
    }

    /**删除分类 */
    deleteCate(req,res) {
        const params = req.params
        // 判断是否存在该分类
        const sql = 'SELECT * FROM article_cate WHERE id=?'
        db.query(sql, params.id, (err,results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                return res.back('不存在该分类！')
            } else {
                const sql = 'UPDATE article_cate SET is_delete=1 WHERE id=?'
                db.query(sql, params.id, (err, results) => {
                    if(err) return res.back(err)
                    console.log(results,"results");
                    if(results.affectedRows !==1) {
                        return res.back('删除文章分类失败！')
                    } else {
                        return res.back('删除文章分类成功！')
                    }
                })
            }
        })
    }

    /**获取分类 */
    getCateId(req,res) {
        const params = req.params
        const sql = 'SELECT * FROM article_cate WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                res.back('不存在该分类')
            } else {
                return res.send({
                    status: 0,
                    message: '获取分类成功！',
                    data: results[0]
                })
            }
        })
    }

    /**更新分类 */
    updateCate(req,res) {
        const params = req.body
        const sql = 'SELECT * FROM article_cate WHERE id=?'
        db.query(sql, params.id, (err, results) => {
            if(err) return res.back(err)
            if(results.length !==1) {
                return res.back('不存在该条数据')
            } else if(results.length > 0) {
                // 判断更新数据是否已被占用
                const target = results[0]
                if(params.name===target.name && params.alias===target.alias) return res.back('分类名和别名都已被占用！')
                if(params.name===target.name && params.alias!==target.alias) return res.back('分类名已被占用！')
                if(params.name!==target.name && params.alias===target.alias) return res.back('别名已被占用！')
                const sql = 'UPDATE article_cate SET ? WHERE id=?'
                db.query(sql, [ params, params.id ], (err, results) => {
                    if(err) return res.back(err)
                    if(results.affectedRows !==1) {
                        return res.back('更新文章分类失败！')
                    } else {
                        return res.back('更新文章分类成功！')
                    }
                })
            }
        })
    }
}

module.exports = new CategoryService()