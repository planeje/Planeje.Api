'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('BankAccounts', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.addColumn('Categories', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.addColumn('Logs', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.addColumn('SpendingGoals', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.addColumn('Transactions', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.addColumn('Users', 'deletedAt', { type: Sequelize.DATE  });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('BankAccounts', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.removeColumn('Categories', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.removeColumn('Logs', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.removeColumn('SpendingGoals', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.removeColumn('Transactions', 'deletedAt', { type: Sequelize.DATE });
    queryInterface.removeColumn('Users', 'deletedAt', { type: Sequelize.DATE  });
  }
};
