import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Make sure your DB connection file is correct

class Booking extends Model {}

Booking.init({
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendors', // Assumes 'vendors' is the name of the vendor table
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients', // Assumes 'clients' is the name of the client table
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    vendor_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'packages', // Assumes 'packages' is the name of the package table
            key: 'package_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    package_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    booking_date: {
        type: DataTypes.DATEONLY, // Use DATEONLY for date without time
        allowNull: false,
    },
    booking_time: {
        type: DataTypes.TIME, // Use TIME for time only
        allowNull: false,
    },
    guest_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50), // Adjust length based on your status options
        allowNull: false,
        defaultValue: 'Pending', // Default status can be 'Pending', 'Confirmed', etc.
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Booking', // Define the model name
    tableName: 'bookings', // Explicitly define the table name if it differs
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
});

export default Booking; // Export the Booking model
