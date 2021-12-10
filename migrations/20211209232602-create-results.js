'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Results', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      }, 
      ranking: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true
        }
      },
      prize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true
        }
      },
      country_represented: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          isAlpha: true
        }
      },
      elo_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true
        }
      },
      coach: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          isAlpha: true
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
    await queryInterface.dropTable('Results');
  }
};