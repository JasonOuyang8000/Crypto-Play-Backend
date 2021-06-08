'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crypto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({crypto, transaction, asset, watchlist}) {
      
      crypto.hasMany(transaction);
      crypto.hasMany(asset);
      crypto.hasMany(watchlist);
    }
  };
  crypto.init({
    uuid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'crypto',
  });
  return crypto;
};