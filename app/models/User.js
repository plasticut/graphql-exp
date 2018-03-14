const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    validate: [name => validator.isLength(name, {min: 3}), 'user.validate.NAME'],
    unique: 'user.validate.ALREADY_EXISTS'
  },
  provider: {
    local: {
      email: {
        type: String,
        lowercase: true,
        trim: true,
        index: {
          unique: true,
          sparse: true
        },
        validate: [email => validator.isEmail(email), 'user.validate.EMAIL']
      },
      password: {
        type: String,
        validate: [password => validator.isLength(password, {min: 6}), 'user.validate.PASSWORD']
      },
      salt: {
        type: String
      }
    }
  }
}, {
  timestamps: true
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.isModified('provider.local.password')) {
    this.set('provider.local.salt', crypto.randomBytes(16).toString('base64'));
    this.set('provider.local.password', hashPassword(this.get('provider.local.password'), this.get('provider.local.salt')));
  }

  next();
});

UserSchema.methods.authenticate = function(password) {
  return this.get('provider.local.password') === hashPassword(password, this.get('provider.local.salt'));
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
}
