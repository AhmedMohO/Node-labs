const joi = require("joi");

const bodySchema = joi.object({
    name: joi.string().trim().messages({
        "string.empty": "Name cannot be empty",
    }),
    email: joi.string().trim().email().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Please enter a valid email address",
    }),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).messages({
        "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    }),
    confirmPassword: joi.valid(joi.ref('password')).messages({
        "any.only": "Passwords must match"
    }),
    dateOfBirth: joi.date().messages({
        "date.base": "Date of birth must be a valid date",
    }),
}).min(1).messages({
    "object.min": "Provide at least one field to update",
}).unknown(false);

const paramsSchema = joi.object({
    id: joi.string().length(24).hex().required().messages({
        "string.length": "ID must be 24 characters long",
        "string.hex": "ID must be a valid hex string",
    }),
}).unknown(false);

module.exports = {
    body: bodySchema,
    params: paramsSchema,
    // query: joi.object({}).unknown(false),
    // headers: joi.object({}).unknown(false),
};
