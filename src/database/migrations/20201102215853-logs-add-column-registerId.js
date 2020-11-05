'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Logs', 'registerId', { type: Sequelize.INTEGER,allowNull: false});
    queryInterface.changeColumn('Logs','action', {type: Sequelize.STRING(1), allowNull: false});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Logs', 'registerId', { type: Sequelize.INTEGER });
    queryInterface.changeColumn('Logs','action', {type: Sequelize.STRING});
  }
};
