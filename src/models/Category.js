const { Model, DataTypes } = require('sequelize');

class Category extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            color: DataTypes.STRING,
        }, {
            sequelize
        }
        )
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
    }
}

module.exports = Category;