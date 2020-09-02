const { Model, DataTypes } = require('sequelize');

class BankAccount extends Model{
    static init(sequelize){
        super.init({
            accountName: DataTypes.STRING,
            balance: DataTypes.FLOAT,
        }, {
            sequelize
        }
        )
    }
}

module.exports = BankAccount;