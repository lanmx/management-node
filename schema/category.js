const joi = require('joi')

const name = joi.string().max(15).required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.category_add = { body: { name, alias } }
exports.category_del = { params: { id } }
exports.category_get = { params: { id } }
exports.category_upd = { body: { id, name, alias } }