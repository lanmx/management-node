const joi = require('joi')

const author = joi.string().required()
const author_id = joi.number().integer().min(1).required()
const content = joi.string().required()
const id = joi.number().integer().min(1).required()
const article_id = joi.number().integer().min(1).required()
const comment_id = joi.number().integer().min(1).required()

exports.comment_add = { body: { author, author_id, content, article_id } }
exports.comment_get = { query: { id } }
exports.comment_del = { params: { id } }
exports.comment_answer = { body: { author, author_id, content, article_id, comment_id } }