const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

morgan.token('message', function(req, res) {
    return res.locals.errorMessage || '';
});

const getIpFormat = function() {
    return (config.env === 'production' ? ':remote-addr - ' : '');
};

const successResponseFormat = getIpFormat() + ':method :url :status - :response-time ms';
const errorResponseFormat = getIpFormat() + ':method :url :status - :response-time ms - message: :message';

const successHandler = morgan(successResponseFormat, {
    skip: function(req, res) {
        return res.statusCode >= 400;
    },
    stream: { write: function(message) {
        logger.info(message.trim());
    }}
});

const errorHandler = morgan(errorResponseFormat, {
    skip: function(req, res) {
        return res.statusCode < 400;
    },
    stream: { write: function(message) {
        logger.error(message.trim());
    }}
});

exports.morgans = {
    successHandler: successHandler,
    errorHandler: errorHandler
};
