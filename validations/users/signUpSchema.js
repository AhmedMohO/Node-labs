const joi = require("joi");

const schema = joi.object({
    name: joi.string().trim().required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
    }),
    email: joi.string().trim().email().required().messages({
        "string.empty": "Email is required",
        "any.required": "Email is required",
        "string.email": "Please enter a valid email address",
    }),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    }),
    passwordConfirm: joi.valid(joi.ref('password')).messages({
        "any.only": "Passwords must match"
    }),
    confirmPassword: joi.valid(joi.ref('password')).messages({
        "any.only": "Passwords must match"
    }),
    dateOfBirth: joi.date().required().messages({
        "any.required": "Date of birth is required",
        "date.base": "Date of birth must be a valid date",
    }),
    role: joi.string().valid("user", "admin").messages({
        "any.required": "Role is required",
        "any.only": "Role must be either 'user' or 'admin'",
    }),
}).unknown(false);

schema.or("passwordConfirm", "confirmPassword");

module.exports = {
    body: schema,
    // query: joi.object({}).unknown(false),
    // params: joi.object({}).unknown(false),
    // headers: joi.object({}).unknown(false),
};
