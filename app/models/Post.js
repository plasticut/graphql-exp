const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    validate: [name => validator.isLength(name, {min: 3}), 'post.validate.NAME'],
    unique: 'post.validate.ALREADY_EXISTS'
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
