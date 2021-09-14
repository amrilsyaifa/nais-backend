import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    storage: ':memory:',
    models: [__dirname + '/models'] // or [Player, Team],
});

export { Sequelize, sequelize };
