const joi = require('joi')

const id = joi.number().integer().min(1).required()
const user_id = joi.number().integer().min(1).required()
const author_id = joi.number().integer().min(1).required().not(joi.ref('user_id'))

exports.reg_care = { body: { user_id, author_id } }
exports.reg_uncare = { body: { id } }
exports.reg_cares = { query: { id } }
exports.reg_fans = { query: { id } }