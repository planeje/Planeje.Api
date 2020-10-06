const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            scopes: {
                noPassword:{
                    attributes: { exclude: ['password'] }
                }
            },
            sequelize
        },
        // {
        // }
        )
    }
    static associate(models) {
        this.hasMany(models.Category, { foreignKey: 'userId', as: 'categories' })
        this.hasMany(models.BankAccount, { foreignKey: 'userId', as: 'bankAccounts' })
    }   
}

module.exports = User;