'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true 
        }
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true 
        }
      },
      format: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['round-robin', 'Swiss system', 'elimination', 'Scheveningen system']]
        }
      },
      organiserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Tournaments');
  }
};