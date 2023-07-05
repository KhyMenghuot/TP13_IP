const Joi = require('joi');

const create_categoryValidation = (data) => {
    const schema = Joi.object({
        categoryID : Joi.number()
        .integer()
        .min(100)
        .max(10000)
        .required(),
        name: Joi.string()
        .pattern(new RegExp("^[A-Z]+[a-z]+$"))
    })
    return schema.validate(data);
}

const update_categoryValidation = (data) => {
    const schema = Joi.object({
        categoryID : Joi.number()
        .integer()
        .min(100)
        .max(10000)
        .required(),
        name: Joi.string()
        .pattern(new RegExp("^[A-Z]+[a-z]+$"))
    })  
    return schema.validate(data); 
}

const delete_categoryValidation = (data) => {
    const schema = Joi.object({
        categoryID : Joi.number()
        .integer()
        .min(100)
        .max(10000)
        .required(),
    })  
    return schema.validate(data); 
}
module.exports = { create_categoryValidation, update_categoryValidation,delete_categoryValidation };