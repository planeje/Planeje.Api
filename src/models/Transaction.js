const { Model, DataTypes } = require('sequelize');

class Transaction extends Model{
    static init(sequelize){
        super.init({
            description: DataTypes.STRING,
            recurrent: DataTypes.BOOLEAN,
            transactionValue: DataTypes.FLOAT,
            transactionDate: DataTypes.DATE,
            transactionDueDate: DataTypes.DATE,
            transactionType: DataTypes.INTEGER,
        }, {
            sequelize,
            paranoid: true
        }
        )
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
        this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category'})
        this.belongsTo(models.BankAccount, { foreignKey: 'accountId', as: 'bankAccount'})
    }
}

module.exports = Transaction;