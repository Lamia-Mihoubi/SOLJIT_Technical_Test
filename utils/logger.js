'use strict';
/* eslint-disable max-len */
const { createLogger, format, transports } = require('winston');
const { mkdirSync } = require('fs');
const path = require('path');
const morgan = require('morgan');

require('winston-daily-rotate-file');

let logDirectory = path.join(__dirname, '../logs');

if (!logDirectory) logDirectory = path.resolve('logs');

// eslint-disable-next-line security/detect-non-literal-fs-filename
mkdirSync(logDirectory, { recursive: true });

/* setting the logging level based on the environment
   npm logging levels are prioritized from 0 to 6 (highest to lowest):
   {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  }
*/
const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'http';

// defining the formating of the logs
const formatting = format.combine(
  format.colorize(),
  format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss',
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = createLogger({
  level: logLevel,
  format: formatting,
  transports: [
    //
    // Write all logs with importance level of `error` or less to error.log
    // Write all logs with importance level of logLevel or less to combined.log
    // Write in a file which is rotated/moved to a new file on a daily basis.
    //
    new transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logDirectory, 'combined.log') }),
    new transports.File({
      filename: path.join(logDirectory, 'http.log'),
      level: 'http',
    }),
    new transports.DailyRotateFile({
      filename: path.join(logDirectory, 'combined-%DATE%.log'),
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      timestamp: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      json: true,
      colorize: true,
      maxSize: '10m',
    }),
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: formatting,
    }),
  );
}

// Http logger in combination with morgan
logger.stream = {
  write: (message, encoding) => {
    logger.http(message);
  },
};
const httpLoggerMiddelware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: logger.stream },
);

module.exports = { logger, httpLoggerMiddelware };
