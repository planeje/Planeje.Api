'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Transactions', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Transactions', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
