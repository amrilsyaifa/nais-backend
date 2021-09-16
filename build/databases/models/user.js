'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ;
    user.init({
        role_id: DataTypes.STRING,
        profile_id: DataTypes.STRING,
        first_name: DataTypes.STRING,
        middle_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        password: DataTypes.STRING,
        registered_at: DataTypes.DATE,
        last_login: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};
