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
        notNull: true,
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    }, 
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: true,
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
        min: 100,
        max: 3000   
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isAlphanumeric: true,
        len: [6,20]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true
      }
    },
    moderator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true
      }
    },
    player: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: true
      }
    },
  }, {
    sequelize,
    modelName: 'Users',
    validate: {
      adminOrModerator() {
        if (this.admin === true && this.moderator === true) {
          throw new Error('Admin ne može biti istovremeno i moderator, i obrnuto.');
        }
      },
      eloAndPlayer() {
        if ((this.elo_rating !== null && this.player === false) || (this.elo_rating === null && this.player === true)) {
          throw new Error('Igrač mora imati ELO rejting, a ELO rejting ne može imati neko ko nije igrač.');
        }
      }
    }
  });
  return Users;
};