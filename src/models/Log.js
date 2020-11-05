const { Model, DataTypes } = require('sequelize');

class Log extends Model{
    static init(sequelize){
        super.init({
            table: DataTypes.STRING,
            action: DataTypes.STRING,
            registerId: DataTypes.INTEGER,
        }, {
            sequelize,
            paranoid: true
        }
        )
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
    }
}

module.exports = Log;