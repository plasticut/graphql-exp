const User = require(`${__base}/models/User`);

module.exports = async (root, {id}) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User "${id}" not found.`);
  }
  return user.remove();
};
