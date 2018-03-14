const log = require(`${__base}/log`)(module);
const User = require(`${__base}/models/User`);

module.exports = {
  Post: {
    owner(post, params, req, ast) {
      log.debug('Post.owner', post, params, ast);
      return User.findById(post.owner);
    }
  }
};
