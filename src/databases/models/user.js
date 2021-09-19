'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsTo(models.profile)
      models.user.belongsTo(models.role)
    }
  };
  user.init({
    role_id: DataTypes.STRING,
    profile_id: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    registered_at: DataTypes.DATE,
    last_login: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    tableName: "users",
    underscored: true
  });
  return user;
};