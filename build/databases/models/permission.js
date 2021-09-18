'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class permission extends Model {
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
    permission.init({
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        description: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'permission',
    });
    return permission;
};
