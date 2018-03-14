const log = require(`${__base}/log`)(module);
const {applySort} = require(`${__base}/util`);
const Post = require(`${__base}/models/Post`);

module.exports = {
  User: {
    posts(owner, {orderBy}) {
      log.debug('User.posts', owner, orderBy);

      const query = Post.find({
        owner
      });

      applySort(query, orderBy);

      return query;
    }
  }
};
