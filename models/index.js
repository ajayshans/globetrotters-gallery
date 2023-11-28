const Comment = require('./Comment');
const Landmark = require('./Landmark');
const User = require('./User')

//relationship between tables


User.hasMany(Landmark, {
    foreign: 'user_id',
    onDelete:'CASCADE'
});

Landmark.belongsTo(User, {
    foreignKey: 'user_id',
     as: 'user'
  });

User.hasMany(Comment, {
    foreign: 'user_id',
    onDelete:'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

  

  module.exports = {
    User,
    Landmark,
    Comment
  }