const { Model, DataTypes } = require('sequelize');

class SpendingGoal extends Model{
    static init(sequelize){
        super.init({
            goalDate: DataTypes.DATE,
            description: DataTypes.STRING,
            goalDueDate: DataTypes.DATE,
            value: DataTypes.FLOAT,
            valueAvaible: DataTypes.FLOAT,
        }, {
            sequelize,
            paranoid: true
        }
        )
    }
}

module.exports = SpendingGoal;