const { body, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const createPostSchema = [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
];

const updatePostSchema = [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("author").optional().notEmpty().withMessage("Author cannot be empty"),
    body("content").optional().notEmpty().withMessage("Content cannot be empty"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
];

const validate = (schemas) => {
    return async (req, res, next) => {
        try {
            await Promise.all(schemas.map((schema) => schema.run(req)));
        } catch (err) {
            return next(err);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const apiError = new ApiError(400, "Validation failed");
            apiError.data = errors.array();
            return next(apiError);
        }
        next();
    };
};

module.exports = {
    createPostSchema,
    updatePostSchema,
    validate,
};
