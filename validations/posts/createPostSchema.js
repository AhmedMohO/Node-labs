const joi = require("joi");
const User = require("../../models/users");

const schema = joi.object({
    title: joi.string().trim().required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
    }),
    content: joi.string().trim().required().messages({
        "string.empty": "Content is required",
        "any.required": "Content is required",
    }),
    userId: joi.string().trim().length(24).hex().required().messages({
        "string.empty": "User ID is required",
        "any.required": "User ID is required",
        "string.length": "User ID must be 24 characters long",
        "string.hex": "User ID must be a valid hex string",
    }).external(async (userId) => {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User ID does not exist");
        }

        return userId;
    }),
}).unknown(false);

module.exports = {
    body: schema,
    // query: joi.object({}).unknown(false),
    // params: joi.object({}).unknown(false),
    // headers: joi.object({}).unknown(false),
};
