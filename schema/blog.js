const joi = require('joi')

exports.reg_add = { 
  body: { 
    text: joi.string().required(),
    link: joi.string().required(),
    parent: joi.string().required(),
    label: joi.string().allow(''),
    description: joi.string().allow(''),
    cate: joi.string().required(),
    read_count: joi.number().required(),
    good: joi.number().required(),
    publish_time: joi.string().allow(''),
    update_time: joi.string().allow(''),
  }
}
exports.reg_edit = { 
  body: {
    id: joi.number().required(),
    text: joi.string().required(),
    link: joi.string().required(),
    parent: joi.string().required(),
    label: joi.string().allow(''),
    description: joi.string().allow(''),
    cate: joi.string().required(),
    read_count: joi.number().required(),
    good: joi.number().required(),
    publish_time: joi.string().allow(''),
    update_time: joi.string().allow(''),
  }
}
exports.reg_delete = { 
  body: { 
    id: joi.number().required(),
  } 
}
exports.reg_search = {
  body: { 
    search: joi.string().allow(''),
  } 
}