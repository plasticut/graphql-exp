module.exports = {
  Mutation: {
    userCreate: require('./user/create'),
    userDelete: require('./user/delete'),

    postCreate: require('./post/create'),
    postDelete: require('./post/delete')
  }
};
