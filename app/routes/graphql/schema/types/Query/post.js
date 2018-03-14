const log = require(`${__base}/log`)(module);
const {applySort} = require(`${__base}/util`);
const Post = require(`${__base}/models/Post`);

async function getOne(root, {id}, req, ast) {
  log.debug('Post.getOne', id);

  const post = await Post.findById(id);
  if (!post) {
    throw new Error(`Post '${id}' not found`);
  }

  return post;
}

async function getList(root, {orderBy}) {
  log.debug('Post.getList', orderBy);

  const query = Post.find();
  applySort(query, orderBy);

  return await query;
}

module.exports = {
  post: getOne,
  posts: getList
};
