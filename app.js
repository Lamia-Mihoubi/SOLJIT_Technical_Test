'use strict';
// Import dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const morgan = require('morgan');

// import logging utils
const { logger, httpLoggerMiddelware } = require('./utils/logger');

// Load environment config
require('dotenv').config();

// Import API routes
const routes = require('./routes/index').router;

const app = express();

// enabling CORS for all requests
app.use(cors());

// adding express built-in body parser middleware
app.use(express.urlencoded({ extended: false }));

// limiting body size to 300kb for performance and security reasons
app.use(express.json({ limit: '300kb' }));

// adding response compression middleware for performance optimisation
app.use(compression());

// adding helmet for HTTP headers security
app.use(helmet());

// Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// http logs
app.use(httpLoggerMiddelware);

// setting up routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello');
});

// handling uncaught exceptions
process
  .on('unhandledRejection', (reason, p) => {
    logger.error(`${reason}: Unhandled Rejection at Promise ${p}`);
  })
  .on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
  });

// run the application and listen to port
app
  .listen(process.env.PORT, () => {
    logger.info(
      `server running on: ${process.env.PORT} in ${process.env.NODE_ENV}.`,
    );
  })
  .on('error', (e) => logger.error(e));
