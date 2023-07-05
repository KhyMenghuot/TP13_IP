const Joi = require('joi');

const create_productValidation = async(data) => {
    try {
        const schema = Joi.object({
            name: Joi.string()
            .pattern(new RegExp("^[A-Z]+[a-z]+$")),
            subcategoryID:Joi
            .number()
            .integer()
            .min(1)
            .max(10000),
            image : Joi
            .string(),
            store : Joi
            .array()
            .items(
                Joi.object({
                    shop : Joi
                    .string()
                    .required(),
                    price : Joi
                    .number()
                    .required()   
                })
            )
        })
        await schema.validate(data)
    } catch (error) {
        console.log(error)
    }
}

const update_productValidation = async(data) => {
    try {
        const schema = Joi.object({
            name: Joi.string()
            .pattern(new RegExp("^[A-Z]+[a-z]+$")),
            subcategoryID:Joi
            .number()
            .integer()
            .min(1)
            .max(10000),
            productID:Joi
            .number()
            .integer()
            .min(1)
            .max(10000),
            image : Joi
            .binary()
            .encoding('base64'),
        })
        return await schema.validate(data)
    } catch (error) {
        console.log(error)
    }
}

const delete_productValidation = async(data) => {
    try {
        const schema = Joi.object({
            productID:Joi
             .number()
             .integer()
             .min(1)
             .max(10000)
        })
        return await schema.validate(data)
    } catch (error) {
        console.log(error)
    }
}

const pushValidation = async(data) => {
   try {
        const schema = Joi.object({
            shop: Joi.string(),
            price: Joi.number(),
            productID:Joi
            .number()
            .integer()
            .min(1)
            .max(10000),
        })
        return await schema.validate(data)
   } catch (error) {
        console.log(error)
   }
    
}

const pullValidation = async(data) => {
    try {
         const schema = Joi.object({
             shop: Joi.string(),
             productID:Joi
             .number()
             .integer()
             .min(1)
             .max(10000),
         })
         return await schema.validate(data)
    } catch (error) {
         console.log(error)
    }
     
 }

module.exports = {create_productValidation,update_productValidation,delete_productValidation,pushValidation,pullValidation}