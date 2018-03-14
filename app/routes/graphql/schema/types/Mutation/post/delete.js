const Post = require(`${__base}/models/Post`);

module.exports = async (root, {id}) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error(`Post "${id}" not found.`);
  }
  return post.remove();
};
