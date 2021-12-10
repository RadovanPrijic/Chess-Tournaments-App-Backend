'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Results.init({
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
  }, {
    sequelize,
    modelName: 'Results',
  });
  return Results;
};