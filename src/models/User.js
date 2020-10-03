const { Model, DataTypes } = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize
        }
        )
    }


    static associate(models) {
        this.hasMany(models.Category, { foreignKey: 'userId', as: 'categories' })
        this.hasMany(models.BankAccount, { foreignKey: 'userId', as: 'bankAccounts' })
    }
    
}

module.exports = User;