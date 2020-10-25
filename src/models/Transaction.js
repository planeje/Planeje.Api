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
}

module.exports = Transaction;