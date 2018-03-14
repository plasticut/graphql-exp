global.__base = __dirname;

require('@plasticut/express-async-await');
const express = require('express');
const config = require('config');
const http = require('http');
const morgan = require('morgan');
const log = require('./log')(module);

express.application.listen = function() {
  return new Promise((resolve, reject) => {
    const port = config.get('port');
    const host = config.get('host');

    const server = http.createServer(this);
    server.listen(port, host, error => {
      if (error) {
        reject(error);
      }
      log.info(`Server listen on http://${host}:${port}`);

      log.info(`GraphQL http://${host}:${port}/graphql`);

      resolve();
    });
  });
};

const app = express();

module.exports = app;

if (config.get('logger.requests')) {
  app.use(morgan(config.get('logger.requests'), {
    stream: {
      write(message) {
        log.info(message.substring(0, message.lastIndexOf('\n')));
      }
    }
  }));
}

app.use('/', require('./routes'));

