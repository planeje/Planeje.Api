'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Logs', 'registerId', { type: Sequelize.INTEGER});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Logs', 'registerId', { type: Sequelize.INTEGER });
  }
};
