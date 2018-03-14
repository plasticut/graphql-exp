const mongoose = require('mongoose');
const config = require('config');
const {promisifyCallback} = require('./util');
const connection = mongoose.connection;
const log = require('./log')(module);

mongoose.Promise = global.Promise;

// const originalToJSON = mongoose.ValidationError.prototype.toJSON;
mongoose.Error.ValidationError.prototype.toJSON = function(options) {
  return Object.keys(this.errors).map(name => {
    return `${this._message.split(' ')[0].toLowerCase()}.${name}.${this.errors[name].kind.toUpperCase()}`;
  });
};

promisifyCallback(mongoose.Schema.prototype, 'pre');

const uri = config.get('mongodb.uri');
mongoose.connect(uri, {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
});

async function waitToBeReady() {
  if (mongoose.Connection.STATES.connected === connection.readyState) {
    return connection;
  }

  return new Promise((resolve, reject) => {
    connection.once('open', () => {
      log.info(`Mongoose connected to "${uri}"`);
      resolve(connection);
    });
    connection.once('error', error => {
      log.error('Mongoose connection error', error);
      reject(error);
    });
  });
}

module.exports = {
  waitToBeReady
};
