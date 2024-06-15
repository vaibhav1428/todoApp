const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const poolConnection = require('./db/db-connection');

class Server {
    constructor() {
        this.server = null;
        this.start();
        this.handleProcessEvents();
    }

    start() {
        this.server = app.listen(config.port, () => {
            logger.info(`Server listening on port ${config.port}`);
        });
    }

    exitHandler() {
        if (this.server) {
            this.server.close(() => {
                logger.info('Server closed');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    }

    unexpectedErrorHandler(error) {
        logger.error(error);
        this.exitHandler();
    }

    handleProcessEvents() {
        process.on('uncaughtException', this.unexpectedErrorHandler.bind(this));
        process.on('unhandledRejection', this.unexpectedErrorHandler.bind(this));
        process.on('SIGTERM', () => {
            logger.info('SIGTERM received');
            if (this.server) {
                this.server.close(() => {
                    logger.info('Server closed on SIGTERM');
                });
            }
        });
    }
}

new Server();
