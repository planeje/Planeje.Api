const { Model, DataTypes } = require('sequelize');

class Log extends Model{
    static init(sequelize){
        super.init({
            table: DataTypes.STRING,
            action: DataTypes.STRING,
        }, {
            sequelize,
            paranoid: true
        }
        )
    }
}

module.exports = Log;