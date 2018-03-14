module.exports = {
  Query: {
    ...require('./user'),
    ...require('./post')
  }
};
