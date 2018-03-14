const config = require('config');
const graphql = require('express-graphql');
const schema = require('./schema');

module.exports = [
  graphql(async (...args) =>
    ({
      schema,
      graphiql: (config.util.getEnv('NODE_ENV') === 'development'),
      rootValue: getRootValue(...args)
    })
  )
];

function getRootValue(req) {
  return {
    user: req.user
  };
}
