/**
 * Sets up associations between the User, Post, and Comment models.
 *
 * Users can have many Posts and Comments. Posts and Comments both belong to a User.
 *
 * Posts can have many Comments. Comments belong to a Post.
 *
 * Uses foreign keys and CASCADE delete to manage associations.
 */
const User = require('./user.js');
const Comment = require('./comment.js');
const Post = require('./post.js');

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

module.exports = { User, Comment, Post };
