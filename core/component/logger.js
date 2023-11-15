const winston = require('winston');
const process = require('process');

class Logger {
    constructor() {
        this.logger = new winston.createLogger({
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss --" }),
                        winston.format.printf(({level, message, timestamp}) => {
                            return `${timestamp} [${level.toUpperCase()}] ${message}`;
                        })
                    )
                })
            ],
            exitOnError: false
        });

        this.logger.stream = {
            instance: this.logger,
            write: function(message, encoding) {
                this.instance.debug(message.trim());
            },
        };
    }

    getLogger() {
        return this.logger;
    }
}

module.exports = Logger;
