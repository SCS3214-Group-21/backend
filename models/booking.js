import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConn.js';
import Vendor from './vendor.js';

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
            model: 'Vendor', // Ensure this matches the Vendor table name
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    },
    package_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    booking_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    guest_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Pending',
    },
}, {
    sequelize,
    modelName: 'Booking',
    tableName: 'booking',
    timestamps: false,
});

// Define association
Booking.belongsTo(Vendor, { foreignKey: 'vendor_id', as: 'vendor' });


export default Booking;

