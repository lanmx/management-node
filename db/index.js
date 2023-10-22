const mysql = require('mysql')

/** 创建数据库连接对象 */
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'local',
    multipleStatements: true // 设置可以同时查询多条语句
})

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'local'
// })

module.exports = db