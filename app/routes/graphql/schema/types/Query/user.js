const log = require(`${__base}/log`)(module);
const {applySort} = require(`${__base}/util`);
const User = require(`${__base}/models/User`);

async function getOne(root, {id}) {
  log.debug('User.getOne', id);

  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User '${id}' not found`);
  }

  return user;
}

async function getList(root, {orderBy}) {
  log.debug('User.getList', orderBy);

  const query = User.find();
  applySort(query, orderBy);

  return await query;
}

module.exports = {
  user: getOne,
  users: getList
};
