'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'passwordResetToken',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'Users',
        'passwordResetExpires',
        Sequelize.STRING
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
