const joi = require('joi')

exports.reg_add = { 
  body: { 
    songname: joi.string().required(),
    songlink: joi.string().required(),
    author: joi.string().required(),
    lyric: joi.string().allow(''),
    cover: joi.string().allow(''),
  }
}
exports.reg_delete = { 
  body: { 
    id: joi.number().required(),
  } 
}
exports.reg_edit = { 
  body: {
    id: joi.number().required(),
    songname: joi.string().required(),
    songlink: joi.string().required(),
    author: joi.string().required(),
    lyric: joi.string().allow(''),
    cover: joi.string().allow(''),
  }
}
exports.reg_search = {
  body: { 
    search: joi.string().allow(''),
  } 
}