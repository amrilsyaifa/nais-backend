'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class role_permission extends Model {
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
    role_permission.init({
        role_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true, },
        permission_id: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        modelName: 'role_permission',
        tableName: "role_permission",
        timestamps: false,
        underscored: true
    });
    return role_permission;
};
