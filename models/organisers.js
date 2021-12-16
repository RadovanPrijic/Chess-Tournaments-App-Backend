'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tournaments }) {
      this.hasMany(Tournaments, { foreignKey: 'organiserId', as: 'tournaments', onDelete: 'cascade', hooks: true } );
    }
  };
  Organisers.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    formation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true 
      }
    },
    president: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Organisers',
  });
  return Organisers;
};