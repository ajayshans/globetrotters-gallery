//id trip user_id location review name type optional image
const { Model, DataTypes } = require ('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('..config/connection');
const User = require('./User');

class Landmark extends Model {}

Landmark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      trip: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull:false
    },
    type: {
        type: DataTypes.STRING,
        allowNull:false
    },
},
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'landmark',
    }
  );
  
  module.exports = Landmark;