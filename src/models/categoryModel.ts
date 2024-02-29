import { DataTypes } from "sequelize";
import sequelize from "../connection/db";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    modelName: 'Category', // We need to choose the model name
    tableName: 'mst_category',
    freezeTableName: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Category;