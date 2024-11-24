import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Ensure the path to your DB connection file is correct and has a .js extension
import Vendor from './vendor.js';
import Package from './package.js';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    is_admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    is_verified: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    last_log: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Explicit table name
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Associations
User.hasOne(Vendor, { foreignKey: 'id' });
Vendor.belongsTo(User, { foreignKey: 'id' });

// Associations
User.hasMany(Package, { foreignKey: "vendor_id" });
Package.belongsTo(User, { foreignKey: "vendor_id" });

export default User; // Export User class
