var Joi = require('joi');
var moment = require('moment');
var httpStatus = require('http-status');
var ServerResponse = require('../utils/response/ServerResponse');
const authService = require('../services/auth.service');
const { cjs_decrypt } = require('../utils/encryption/encryptor');

class AuthValidationClass {
    async userRegistration(req, res, next) {
        const schema = Joi.object({
            full_name: Joi.string()
                .min(2)
                .max(100)
                .pattern(/^[A-Za-z][A-Za-z .]*$/)
                .required()
                .messages({
                    'string.pattern.base': 'Name can contain only alphabets',
                    'string.min': 'Full Name must be at least {#limit} characters long',
                    'string.max': 'Full Name must be at most {#limit} characters long',
                    'any.required': 'Full Name is required',
                }),
            country_code: Joi.string()
                .min(1)
                .max(7)
                .required()
                .messages({
                    'string.empty': 'Valid country code required',
                    'string.min': 'Country code must be at least {#limit} characters',
                    'string.max': 'Country code must be at most {#limit} characters',
                    'any.required': 'Country code is required',
                }),
            mobile: Joi.string()
                .min(8)
                .max(15)
                .pattern(/^[0-9]+$/)
                .required()
                .messages({
                    'string.pattern.base': 'Mobile No. must contain only numbers',
                    'string.empty': 'Valid Mobile No. required',
                    'string.min': 'Mobile No. must be at least {#limit} characters',
                    'string.max': 'Mobile No. must be at most {#limit} characters',
                    'any.required': 'Mobile No. is required',
                }),
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Valid email address required',
                    'string.empty': 'Email is required',
                    'any.required': 'Email is required',
                }),
        }).options({ abortEarly: false });
        try {
            await schema.validateAsync(req.body);
            const checkEmail = await authService.findUserByEmail(req.body.email);
            if (checkEmail) throw new Error('Email already exist!!');

            next();

        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }


    async passwordSetup(req, res, next) {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Valid email address required',
                    'string.empty': 'Email is required',
                    'any.required': 'Email is required',
                }),
            token: Joi.string().required().messages({
                'string.empty': 'Token is required',
                'any.required': 'Token is required',
            }),
            password: Joi.string()
                .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z0-9]).{8,}$/)
                .required()
                .messages({
                    'string.pattern.base':
                        'Password must contain at least one capital letter, one alphanumeric character, and be at least 8 characters long.',
                }),
        }).options({ abortEarly: false });

        try {
            await schema.validateAsync(req.body);
            const checkEmail = await authService.findUserByEmail(req.body.email);
            if (!checkEmail) throw new Error('Email not found!!');

            const checktoken = await authService.findTokenDetails(checkEmail.id, req.body.token)
            if (checktoken && checktoken.is_expired) throw new Error('Token expired!!');

            req.body.user_details = checkEmail;
            req.body.token_details = checktoken;

            next();

        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }


    async login(req, res, next) {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Valid email address required',
                    'string.empty': 'Email is required',
                    'any.required': 'Email is required',
                }),
            password: Joi.string()
                .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z0-9]).{8,}$/)
                .required()
                .messages({
                    'string.empty': 'Password is required',
                    'any.required': 'Password is required',
                }),
        }).options({ abortEarly: false });

        try {
            await schema.validateAsync(req.body);

            const checkEmail = await authService.findUserByEmail(req.body.email);
            if (!checkEmail) throw new Error('Invalid credentials!!');
            
            req.body.user_details  = checkEmail
            next();
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }



}

const AuthValidation = new AuthValidationClass();

module.exports = AuthValidation;