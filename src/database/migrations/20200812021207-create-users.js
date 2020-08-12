'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return queryInterface.createTable('users', { 
        Id: {
          type:Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        Name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        CreatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        UpdatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
 
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('users');

  }
};
