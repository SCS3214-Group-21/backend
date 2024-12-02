// import { Model, DataTypes } from "sequelize";
// import sequelize from "../config/dbConn.js";
// import Vendor from "./vendor.js";

// class Package extends Model {}

// Package.init({
//     vendor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true, // allowNull should be true as per SQL schema
//         references: {
//             model: 'users', // This refers to the 'users' table in your database
//             key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE', 
//     },
//     package_id : {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     img: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     items: {
//         type: DataTypes.JSON, // Use JSON type to match `json_valid` check in SQL
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     is_enable: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true, // Add defaultValue to match SQL schema
//     },
//     role: {
//         type: DataTypes.STRING(32),
//         allowNull: true
//     },
// }, {
//     sequelize, // Pass the sequelize instance
//     modelName: 'Package',
//     tableName: 'package', // Ensure table name matches exactly
//     timestamps: false,
// });

// Package.belongsTo(Vendor, { foreignKey: 'vendor_id' }); // Package belongs to Vendor
// // (If not already defined) Vendor has many packages
// Vendor.hasMany(Package, { foreignKey: 'vendor_id' });

// export default Package;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConn.js';
import Vendor from './vendor.js';

class Package extends Model {}

Package.init({
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Set to false if this should always reference a vendor
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    package_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    role: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Package',
    tableName: 'package',
    timestamps: false,
});

// Relationships
Package.belongsTo(Vendor, { foreignKey: 'vendor_id' });
Vendor.hasMany(Package, { foreignKey: 'vendor_id' });

export default Package;

