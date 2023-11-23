//comments id user_alias landmark_id

const { Model, DataTypes } = require ('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('..config/connection');
const User = require('./User');

class Comment extends Model {}

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.String,
        allowNull:false
    },
    type: {
        type: DataTypes.String,
        allowNull:false
    },
},
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
  );
  
  module.exports = Comment;