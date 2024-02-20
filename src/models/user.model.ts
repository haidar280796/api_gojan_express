import { DataTypes } from "sequelize";
import sequelize from "../connection/db";

const User = sequelize.define("user", {
    // Model attributes are defined here
    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
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
});

export default User;