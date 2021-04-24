'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({transaction, crypto, user}) {
      transaction.belongsTo(crypto);
      transaction.belongsTo(user)
      // define association here
    }
  };
  transaction.init({
    cryptoId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    change: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};