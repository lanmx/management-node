const joi = require('joi')

exports.reg_add = { 
  body: { 
    menu: joi.string().required(),
    parent: joi.string().allow('').allow(null),
    path: joi.string().allow('').allow(null),
    icon: joi.string().allow('').allow(null),
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
    menu: joi.string().required(),
    parent: joi.string().allow('').allow(null),
    path: joi.string().allow('').allow(null),
    icon: joi.string().allow('').allow(null),
  }
}
exports.reg_search = {
  body: { 
    menu: joi.string().allow('').allow(null),
  } 
}