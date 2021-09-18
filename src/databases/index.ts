import { Sequelize } from 'sequelize';

const db = require('./config/database');

const SyncDatabase = async () => {
    // Testing database connection
    const mode = process.env.development || "development"
    const sequelize = new Sequelize(db[mode]);

    try {
        await sequelize.authenticate();
        // eslint-disable-next-line no-console
        console.log('Connection has been established successfully.');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to connect to the database:', error);
      }
}

export default SyncDatabase