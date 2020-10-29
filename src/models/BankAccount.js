const { Model, DataTypes } = require('sequelize');

class BankAccount extends Model{
    static init(sequelize){
        super.init({
            accountName: DataTypes.STRING,
            balance: DataTypes.FLOAT,
        }, {
            sequelize,
            paranoid: true
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
        this.hasMany(models.Transaction, { foreignKey: 'accountId', as: 'transactions' })
    }
}

module.exports = BankAccount;