'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Results }) {
      this.hasMany(Results, { foreignKey: 'userId', as: 'results', onDelete: 'cascade', hooks: true } );
    }
  };
  Users.init({
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
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    moderator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    player: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};