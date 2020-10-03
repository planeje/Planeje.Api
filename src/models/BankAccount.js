const { Model, DataTypes } = require('sequelize');

class BankAccount extends Model{
    static init(sequelize){
        super.init({
            accountName: DataTypes.STRING,
            balance: DataTypes.FLOAT,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
    }
}

module.exports = BankAccount;