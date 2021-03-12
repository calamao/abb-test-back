/* eslint-disable import/first */
/* eslint-disable */

import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import util from 'util';
import app from './app';
import MongoConnection from './mongo-connection';
import logger from './logger';
import { createTestData } from './models/test-data/part-data';
import { initSocket } from './socket';

let debugCallback = null;
if (process.env.NODE_ENV === 'development') {
  debugCallback = (collectionName: string, method: string, query: any, doc: string) => {
    const message = `${collectionName}.${method}(${util.inspect(query, { colors: true, depth: null })})`;
    logger.log({
      level: 'silly',
      message,
      consoleLoggerOptions: { label: 'MONGO' }
    });
  };
}

let http = require("http").Server(app);
initSocket(http);

const mongoConnection = new MongoConnection(process.env.MONGO_URL, debugCallback);

if (process.env.MONGO_URL == null) {
  logger.error('MONGO_URL not specified in environment');
  process.exit(1);
} else {
  mongoConnection.connect(() => {
    const port = app.get('port');
    http.listen(app.get('port'), (): void => {
      logger.debug(`🌏 Express server started at http://localhost:${port}`);

      // create test data for demo purposes
      createTestData();
      if (process.env.NODE_ENV === 'development') {
        // This route is only present in development mode
        logger.debug(`⚙️  Swagger UI hosted at http://localhost:${port}/dev/api-docs`);
      }
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  console.log('\n'); /* eslint-disable-line */
  logger.info('Gracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err
      });
    } else {
      logger.info('Mongo connection closed successfully');
    }
    process.exit(0);
  });
});
