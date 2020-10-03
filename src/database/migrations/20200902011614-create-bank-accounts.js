'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return queryInterface.createTable('BankAccounts', { 
        id: {
          type:Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users', key:'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        accountName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        balance: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
 
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('BankAccounts');

  }
};
