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
            models.permission.belongsToMany(models.role, {
                through: 'role_permission',
                foreignKey: 'permission_id',
                as: 'permissions'
            });
        }
    }
    permission.init(
        {
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'permission',
            tableName: 'permissions',
            underscored: true
        }
    );
    return permission;
};
