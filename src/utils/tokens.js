const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

const generateToken = (
    id,
    username,
    name,
    type,
    agent,
    expires,
    secret = config.jwt.secret
) => {
    const payload = {
        id,
        username,
        name,
        type,
        agent,
        iat: moment().unix(),
        exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, user.username, user.name, user.type, user.agent, accessTokenExpires);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate().toISOString(),
        },
    };
};

const generateAuthRefreshTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const accessToken = generateToken(user.id, user.username, user.name, user.type, user.agent, accessTokenExpires);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate().toISOString(),
        },
    };
};

module.exports = {
    generateAuthTokens,
    generateAuthRefreshTokens
};
