import { DataTypes } from "sequelize";
import sequelize from "../connection/db";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
}, {
    modelName: 'User', // We need to choose the model name
    tableName: 'mst_user',
    freezeTableName: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withoutPassword: {
            attributes: { exclude: ['password'] },
        }
    }
});

User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
}

export default User;