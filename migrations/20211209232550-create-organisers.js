'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Organisers', {
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
      formation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true 
        }
      },
      president: {
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
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isUrl: true
        }
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
    await queryInterface.dropTable('Organisers');
  }
};