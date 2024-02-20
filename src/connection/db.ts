import { Sequelize } from "sequelize";

const sequelize = new Sequelize('express_gojan', 'root', '', {
    host: 'localhost',
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