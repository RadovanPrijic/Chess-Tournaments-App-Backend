'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournaments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Results, Organisers }) {
      this.hasMany(Results, { foreignKey: 'tournamentId', as: 'results', onDelete: 'cascade', hooks: true } );
      this.belongsTo(Organisers, { foreignKey: 'organiserId', as: 'organiser'} );
    }
  };
  Tournaments.init({
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
        isIn: [['round-robin', 'Swiss system', 'elimination', 'Scheveningen system,']]
      }
    },
  }, {
    sequelize,
    modelName: 'Tournaments',
  });
  return Tournaments;
};