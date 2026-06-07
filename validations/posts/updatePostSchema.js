const joi = require("joi");

const bodySchema = joi.object({
    title: joi.string().trim().messages({
        "string.empty": "Title cannot be empty",
    }),
    content: joi.string().trim().messages({
        "string.empty": "Content cannot be empty",
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
