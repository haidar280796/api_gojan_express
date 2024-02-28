import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.DATABASE_USER}`, `${process.env.DATABASE_PWD}`, {
    host: `${process.env.DATABASE_SERVER}`,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

sequelize.sync({ force: false })
    .then(() => {
        // console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Failed to synchronize database:', error);
    });

export default sequelize;