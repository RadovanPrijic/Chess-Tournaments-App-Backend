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
    static associate({ Users, Tournaments }) {
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(Tournaments, { foreignKey: 'tournamentId', as: 'tournament' });
    }
  };
  Results.init({
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    prize: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDecimal: true
      }
    },
    country_represented: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    elo_change: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    coach: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
  }, {
    sequelize,
    modelName: 'Results',
  });
  return Results;
};