const { Model, DataTypes } = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            Name: DataTypes.STRING,
            Email: DataTypes.STRING,
            Password: DataTypes.STRING,
        }, {
            sequelize
        }
        )
    }
}

module.exports = User;