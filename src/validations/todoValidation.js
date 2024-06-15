const Joi = require('joi');
const httpStatus = require('http-status');
const ServerResponse = require('../utils/response/ServerResponse');
const authService = require('../services/auth.service');
const { cjs_decrypt } = require('../utils/encryption/encryptor');

class TodoValidationClass {

    async createTodo(req, res, next) {
        const schema = Joi.object({
            task: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Task is required',
                    'any.required': 'Task is required',
                }),
        }).options({ abortEarly: false });
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error?.message));
            }
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse('An unknown error occurred'));
        }
    }

    async updateTodo(req, res, next) {
        const schema = Joi.object({
            task: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Task is required',
                    'any.required': 'Task is required',
                }),
            task_id: Joi.string()
                .required()
                .messages({
                    'number.base': 'Task ID must be a number',
                    'any.required': 'Task ID is required',
                }),
        }).options({ abortEarly: false });

        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error?.message));
            }
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse('An unknown error occurred'));
        }
    }

    async deleteTodo(req, res, next) {
        const schema = Joi.object({
            task_id: Joi.string()
                .required()
                .messages({
                    'number.base': 'Task ID must be a number',
                    'any.required': 'Task ID is required',
                }),
        }).options({ abortEarly: false });

        try {
            await schema.validateAsync(req.params);
            next();
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error?.message));
            }
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse('An unknown error occurred'));
        }
    }

    async completeTodo(req, res, next) {
        const schema = Joi.object({
            task_id: Joi.string()
                .required()
                .messages({
                    'number.base': 'Task ID must be a number',
                    'any.required': 'Task ID is required',
                }),
        }).options({ abortEarly: false });

        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error?.message));
            }
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse('An unknown error occurred'));
        }
    }



}

const TodoValidation = new TodoValidationClass();

module.exports = TodoValidation;