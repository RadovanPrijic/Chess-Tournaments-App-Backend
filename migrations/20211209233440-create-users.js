'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      }, 
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true 
        }
      },
      country_of_residence: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i
        }
      },
      elo_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          max: 3000   
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
          len: [6,20]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      moderator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      player: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('Users');
  }
};