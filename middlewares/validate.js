const APIError = require("../utils/APIError");

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            for (const key in schema) {
                const value = await schema[key].validateAsync(req[key], {
                    abortEarly: false,
                });
                req[key] = value;
            }
            next();
        } catch (error) {
            const message = error.details
                ? error.details.map((detail) => detail.message).join(". ")
                : error.message;

            throw new APIError(message, 400);
        }
    }
}

module.exports = validate;