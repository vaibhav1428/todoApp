/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-namespace */

const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ServerResponse = require('../utils/response/ServerResponse');
const  config  = require('../config/config');


const checkHeaders = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.errormsg('Invalid access token', 'E0060'));
        }
        
        jwt.verify(token, config.jwt.secret, (err, payload) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    return res
                        .status(httpStatus.UNAUTHORIZED)
                        .send(ServerResponse.errormsg('Token Expired Please Login', 'E0059'));
                }
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send(ServerResponse.errormsg('Unable To Validate Token', 'E0060'));
            }
            if (payload) {
                const decryptedPayload = payload;
                req.user = decryptedPayload;
            }
            next();
        });
    } catch (error) {
        const message =  error.message ||  'An unexpected error occurred';
        return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(message));
    }
};

module.exports = checkHeaders;
