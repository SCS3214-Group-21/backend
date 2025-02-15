import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Ensure the path to your DB connection file is correct and has a .js extension
// import Booking from './booking.js';

class Vendor extends Model {}

Vendor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users', // This refers to the 'users' table in your database
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pic: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    business_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    branch: {
        type: DataTypes.JSON, // Use JSON type to match `json_valid` check in SQL
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    images: {
        type: DataTypes.JSON, // Use JSON type to match `json_valid` check in SQL
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(32),
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Vendor',
    tableName: 'Vendor', // Explicit table name
    timestamps: false,
});

// Vendor.hasMany(Booking, { foreignKey: 'vendor_id', as: 'booking' });


export default Vendor; // Export User class
