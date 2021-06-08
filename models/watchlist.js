'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user,crypto}) {
      // define association here
      watchlist.belongsTo(user);
      watchlist.belongsTo(crypto);
    }
  };
  watchlist.init({
    userId: DataTypes.INTEGER,
    cryptoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'watchlist',
  });
  return watchlist;
};