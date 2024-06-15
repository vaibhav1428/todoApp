const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../../.env') });
const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        // developement
        DB_HOST: Joi.string().required().description('Database host'),
        DEV_DB_URL: Joi.string().required().description('Database name'),
        DEV_DB_USER: Joi.string().required().description('Database Username'),
        DEV_DB_PASSWORD: Joi.string().allow('').optional().description('Database Password'),

        // production db
        PROD_DB_HOST: Joi.string().required().description('ORACLE Production host'),
        PROD_DB_URL: Joi.string().required().description('ORACLE Production name'),
        PROD_DB_USER: Joi.string().required().description('Database Production Username'),
        PROD_DB_PASSWORD: Joi.string().allow('').optional().description('Database Production Password'),

        // jwt keys
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),

        // encryption key
        SECRET_KEY: Joi.string().required().description('SECRET_IV required'),
        SECRET_IV: Joi.string().required().description('SECRET_IV required'),

        // smtp details
        SMTP_HOST: Joi.string().optional().allow('').description('server that will send the emails'),
        SMTP_PORT: Joi.number().optional().allow('').description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().optional().allow('').description('username for email server'),
        SMTP_PASSWORD: Joi.string().optional().allow('').description('password for email server'),
        EMAIL_FROM: Joi.string().optional().allow('').description('the from field in the emails sent by the app'),
        CLIENT_NAME: Joi.string().optional().allow('').description('the client of the app'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    db: {
        host: envVars.DB_HOST,
        name: envVars.DEV_DB_URL,
        user: envVars.DEV_DB_USER,
        password: envVars.DEV_DB_PASSWORD,
    },
    proddb: {
        host: envVars.PROD_DB_HOST,
        name: envVars.PROD_DB_URL,
        user: envVars.PROD_DB_USER,
        password: envVars.PROD_DB_PASSWORD,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },
    encryption: {
        secret_key: envVars.SECRET_KEY,
        secret_iv: envVars.XPassword,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
        clientName: envVars.CLIENT_NAME,
    },
};
