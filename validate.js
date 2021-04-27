// Validation
const Joi = require('joi')

const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema)
}



const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema)
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;