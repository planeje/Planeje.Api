const { Model, DataTypes } = require('sequelize');

class BankAccount extends Model{
  static init(sequelize){
    super.init({
      accountName: DataTypes.STRING,
      balance: DataTypes.FLOAT,
    }, {
      sequelize,
      paranoid: true
    });
  }

  static associate(models) {
    this.hasMany(models.Transaction, { foreignKey: 'accountId', as: 'transactions' });
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = BankAccount;
