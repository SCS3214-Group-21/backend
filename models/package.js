import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

class Package extends Model {}

Package.init({
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // allowNull should be true as per SQL schema
        references: {
            model: 'users', // This refers to the 'users' table in your database
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
    },
    package_id : {
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
        type: DataTypes.JSON, // Use JSON type to match `json_valid` check in SQL
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Add defaultValue to match SQL schema
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Package',
    tableName: 'package', // Ensure table name matches exactly
    timestamps: false,
});

export default Package;
