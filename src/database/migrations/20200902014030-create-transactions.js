'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return queryInterface.createTable('Transactions', { 
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
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Categories', key:'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'BankAccounts', key:'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        description: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        recurrent: {
          type:Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        transactionValue: {
          type:Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0.00,
        },
        transactionDate: {
          type:Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        transactionDueDate: {
          type:Sequelize.DATE,
        },
        transactionType: {
          type:Sequelize.INTEGER,
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

     await queryInterface.dropTable('Transactions');

  }
};
