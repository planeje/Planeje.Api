'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return queryInterface.createTable('SpendingGoals', { 
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
        goalDate: {
          type:Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        description: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        goalDueDate: {
          type:Sequelize.DATE,
          allowNull: false,
        },
        value: {
          type:Sequelize.FLOAT,
          allowNull: false,
        },
        valueAvaible: {
          type:Sequelize.FLOAT,
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

     await queryInterface.dropTable('SpendingGoals');

  }
};
