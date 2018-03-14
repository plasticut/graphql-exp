const Post = require(`${__base}/models/Post`);

module.exports = async (root, data) => {
  const post = new Post(data);
  return post.save();
};
