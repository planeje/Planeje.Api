const { Model, DataTypes } = require('sequelize');

class SpendingGoal extends Model{
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      goalDueDate: DataTypes.DATE,
      value: DataTypes.FLOAT,
      valueAvaible: DataTypes.FLOAT,
    }, {
      sequelize,
      paranoid: true
    });
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  }
}

module.exports = SpendingGoal;
