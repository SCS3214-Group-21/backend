import { Sequelize } from 'sequelize'; // Import Sequelize
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env; // Destructure environment variables

const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: 'mysql',
        // Additional configuration options (if needed):
        // logging: false, // Disable logging
        // pool: {
        //     max: 5, // Maximum number of connections in the pool
        //     min: 0, // Minimum number of connections in the pool
        //     acquire: 30000, // Maximum time (ms) to wait for a connection
        //     idle: 10000 // Maximum time (ms) a connection can be idle
        // },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log(`Database ${DB_NAME} connected successfully!`);
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
        // Handle the error appropriately, e.g., exit the application
        process.exit(1);
    });

export default sequelize; // Export sequelize instance
