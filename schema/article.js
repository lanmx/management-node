const joi = require('joi')

const title = joi.string().max(120).required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required()
const cover_img = joi.string().allow('')
const status = joi.string().max(50).required()
const author_id = joi.number().integer().min(1).required()
const id = joi.number().integer().min(1).required()
const article_id = joi.number().integer().min(1).required()

exports.article_add = { body: { title, cate_id, content, cover_img, status, author_id } }
exports.article_del = { params: { id } }
exports.article_det = { params: { id } }
exports.article_upd = { body: { title, cate_id, content, cover_img, status, author_id, id } }
exports.article_like = { body: { id } }
exports.article_collect = { body: { article_id, author_id } }
exports.article_read = { body: { id } }