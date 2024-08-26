import Joi from "joi";
import errorHandler from "./handleError.middleware";

class validateMiddleware {
    validateResgister(req, res, next) {
        const schema = Joi.object({
            Email: Joi.string().email().required().messages({
                "any.required": "Email is not empty",
                "string.email": "Email is not valid"
            }),
            Name: Joi.string().required().messages({
                "any.required": "Name is not empty"
            }),
            Password: Joi.string().required().messages({
                "any.required": "Password is not empty",
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const ERR = new Error(error.details[0].message);
            ERR.status = 400;
            return errorHandler(ERR, req, res, next);
        }
        next();
    }

    validateForgetPassword(req, res, next) {
        const schema = Joi.object({
            Email: Joi.string().email().required().messages({
                "any.required": "Email is not empty",
                "string.email": "Email is not valid"
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const ERR = new Error(error.details[0].message);
            ERR.status = 400;
            return errorHandler(ERR, req, res, next);
        }
        next();
    }

    validatePoll(req, res, next) {
        const schema = Joi.object({
            Title: Joi.string().required().messages({
                "any.required": "Title is not empty"
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const ERR = new Error(error.details[0].message);
            ERR.status = 400;
            return errorHandler(ERR, req, res, next);
        }
        next();
    }

    validateUpdatePoll(req, res, next) {
        const schema = Joi.object({
            PollID: Joi.string().required().messages({
                "any.required": "PollID is not empty"
            }),
            Title: Joi.string().required().messages({
                "any.required": "Title is not empty"
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const ERR = new Error(error.details[0].message);
            ERR.status = 400;
            return errorHandler(ERR, req, res, next);
        }
        next();
    }

    validateOption(req, res, next) {
        const schema = Joi.object({
            PollID: Joi.string().required().messages({
                "any.required": "PollID is not empty"
            }),
            Content: Joi.string().required().messages({
                "any.required": "Content is not empty"
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const ERR = new Error(error.details[0].message);
            ERR.status = 400;
            return errorHandler(ERR, req, res, next);
        }
        next();
    }

    validateVote(req, res, next) {
        const schema = Joi.object({
            OptionID: Joi.string().required().messages({
                "any.required": "OptionID is not empty"
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const ERR = new Error(error.details[0].message);
            ERR.status = 400;
            return errorHandler(ERR, req, res, next);
        }
        next();
    }
}

export default new validateMiddleware();
