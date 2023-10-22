var express = require('express')
var router = express.Router()
const MessageService = require('../service/message.service')


/** 消息列表 */
router.post('/list', MessageService.getMessage)


module.exports = router