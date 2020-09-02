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
}

module.exports = Category;