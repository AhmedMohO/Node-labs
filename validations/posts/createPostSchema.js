const joi = require("joi");

const schema = joi.object({
    title: joi.string().trim().required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
    }),
    content: joi.string().trim().required().messages({
        "string.empty": "Content is required",
        "any.required": "Content is required",
    }),
}).unknown(false);

module.exports = {
    body: schema,
    // query: joi.object({}).unknown(false),
    // params: joi.object({}).unknown(false),
    // headers: joi.object({}).unknown(false),
};
