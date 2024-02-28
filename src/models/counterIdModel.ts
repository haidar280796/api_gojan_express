import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/db";

// class CounterId extends Model {
//     declare counter_id: string;
// }

const CounterId = sequelize.define('CounterId', {
    counter_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    pyear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    pmonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    prefix: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    last_counter: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    reset: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    modelName: 'CounterId', // We need to choose the model name
    tableName: 'mst_counter',
    freezeTableName: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default CounterId;