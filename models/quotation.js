// import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
// import sequelize from '../config/dbConn.js'; // Make sure your DB connection file is correct

// class Quotation extends Model {}

// Quotation.init({
//     quotation_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     client_id: {  // This likely refers to the author/user ID (foreign key)
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'users', // This refers to the 'users' table in your database
//             key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE', 
//     },
//     vendor_id: {  // This likely refers to the author/user ID (foreign key)
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'users', // This refers to the 'users' table in your database
//             key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE', 
//     },
//     items: {
//         type: DataTypes.JSON, // Use JSON type to match `json_valid` check in SQL
//         allowNull: false,
//     },
    
//     details: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//     },
//     package_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'package', // This refers to the 'package' table in your database
//             key: 'package_id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     },
//     status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false, 
//     },
//     price: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
// }, {
//     sequelize, // Pass the sequelize instance
//     modelName: 'Quotation', // Define the model name
//     tableName: 'quotation', // Define the explicit table name if it's different
//     timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
// });

// export default Quotation; // Export the Blog modelimport { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConn.js';
import Package from './package.js';
import Client from './client.js';
import { Model, DataTypes } from 'sequelize';

class Quotation extends Model {}

Quotation.init({
    quotation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
                        model: 'users', // This refers to the 'users' table in your database
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'package', key: 'package_id' },
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Quotation',
    tableName: 'quotation',
    timestamps: false,
});

// Relationships
Quotation.belongsTo(Package, { foreignKey: 'package_id' });


export default Quotation;
