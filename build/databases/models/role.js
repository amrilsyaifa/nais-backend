'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.role.belongsToMany(models.permissions, { through: 'role_permission', foreignKey: 'role_id', as: "roles" });
        }
    }
    ;
    role.init({
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        description: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'role',
        tableName: "roles",
        underscored: true
    });
    return role;
};
