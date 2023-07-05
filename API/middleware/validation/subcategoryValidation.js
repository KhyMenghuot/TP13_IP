const Joi = require('joi');

const create_subcategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
        .required()
        .pattern(new RegExp("^[A-Z]+[a-z]+$")),
        categoryID : Joi.number()
        .min(100)
        .max(10000)
        .required()
    })
    return schema.validate(data);
}
const update_subcategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
        .required()
        .pattern(new RegExp("^[A-Z]+[a-z]+$")),
        categoryID : Joi.number()
        .min(100)
        .max(10000)
        .required(),
        subcategoryID : Joi.number()
        .integer()
        .min(1)
        .max(10000)
        .required(),

    })
    return schema.validate(data);
}

const delete_subcategoryValidation = (data) => {
   const schema = Joi.object({
    subcategoryID : Joi.number()
    .integer()
    .min(1)
    .max(10000)
    .required(),
   })
    return schema.validate(data);
}
module.exports = {create_subcategoryValidation,update_subcategoryValidation,delete_subcategoryValidation};