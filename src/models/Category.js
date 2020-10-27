const { Model, DataTypes } = require('sequelize');

class Category extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            color: DataTypes.STRING
        }, {
            sequelize,
            paranoid: true
        }
        )
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
        this.hasMany(models.Transaction, { foreignKey: 'categoryId', as: 'transactions' })
    }
}

module.exports = Category;