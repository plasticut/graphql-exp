const User = require(`${__base}/models/User`);

module.exports = async (root, data) => {
  const user = new User(data);
  return user.save();
};
