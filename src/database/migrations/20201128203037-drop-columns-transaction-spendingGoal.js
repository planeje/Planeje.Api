'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Transactions', 'transactionDate');
    queryInterface.removeColumn('SpendingGoals', 'goalDate');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Transactions', 'transactionDate', { type: Sequelize.DATE, allowNull: false });
    queryInterface.addColumn('SpendingGoals', 'goalDate', { type: Sequelize.DATE, allowNull: false });
  }
};
