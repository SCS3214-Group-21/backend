import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Make sure your DB connection file is correct

class Client extends Model {}

Client.init({
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    bride_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    groom_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    wedding_date: { // This aliases the `date` column in the database
        type: DataTypes.DATE,
        allowNull: true,
        field: 'date', // Specify the actual column name in the database
    },
    budget: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    guest_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pic: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Client',
    tableName: 'client',
    timestamps: false,
});


export default Client; // Export the Client model
