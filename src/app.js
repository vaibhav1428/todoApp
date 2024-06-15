const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const authLimiter = require('./middlewares/rateLimiter');
const config = require('./config/config');
const { morgans } = require('./config/morgan');

class App {
    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandlers();
    }

    setupMiddlewares() {
        if (config.env !== 'test') {
            this.app.use(morgans.successHandler);
            this.app.use(morgans.errorHandler);
        }

        this.app.set('view engine', 'ejs');
        this.app.use(express.static('public'));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(xss());
        this.app.use(compression());
        this.app.use(cors());
        this.app.options('*', cors());
        if (config.env === 'production') {
            this.app.use('/api/auth', authLimiter);
        }
    }

    setupRoutes() {
        this.app.use('/api/v1', routes);
    }

    setupErrorHandlers() {
        this.app.use(errorConverter);
        this.app.use(errorHandler);
    }

    getApp() {
        return this.app;
    }
}

module.exports = new App().getApp();
