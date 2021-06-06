const { generatePassword } = require('../helpers/helperFunctions');


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, transaction, crypto, asset}) {
      user.hasMany(transaction);
      user.hasMany(asset);
      user.belongsToMany(crypto,{through: 'asset'});
    }
  };
  user.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4,15],
      }
    },
    balance: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
      }
    },
    password:
      {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5,20]
        }
      },
    public:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue:false,
    }
  }, {
    sequelize,
    modelName: 'user',
  }); 

  user.addHook('afterValidate', async (user, options) => {
    const hashedPassword = generatePassword(user.password);
    user.password = hashedPassword
  })

  return user;
};