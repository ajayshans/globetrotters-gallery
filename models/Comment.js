//comments id user_alias landmark_id
const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Landmark = require('./Landmark');

class Comment extends Model {}

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
      },
      landmark_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Landmark,
          key: 'id'
        }
      },
      
      review: {
        type: DataTypes.STRING,
        allowNull: false,
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