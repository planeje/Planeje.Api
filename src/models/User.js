const { Model, DataTypes } = require('sequelize');
const bcrypt = require ('bcryptjs')

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
            passwordResetToken: {
              type: DataTypes.STRING,
              allowNull: true
            },
            passwordResetExpires: {
              type: Date,
              allowNull: true
            }
        },
        {
            hooks:{
              beforeCreate: (user, options) => {
                return bcrypt.hash(user.password, 10)
                  .then(hash => {
                      user.password = hash;
                  }).catch(err => {
                      console.log('err', err);
                  });
              }
            },
            scopes: {
                noPassword:{
                    attributes: { exclude: ['password'] }
                }
            },
            sequelize,
            paranoid: true
        }
      )
    }
    static associate(models) {
      this.hasMany(models.Category, { foreignKey: 'userId', as: 'categories' });
      this.hasMany(models.BankAccount, { foreignKey: 'userId', as: 'bankAccounts' });
      this.hasMany(models.SpendingGoal, { foreignKey: 'userId', as: 'spendingGoals' });
      this.hasMany(models.Transaction, { foreignKey: 'userId', as: 'transactions' });
    }
}

module.exports = User;
