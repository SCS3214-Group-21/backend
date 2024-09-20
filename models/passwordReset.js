import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Ensure the path to your DB connection file is correct and has a .js extension

class PasswordReset extends Model {}

PasswordReset.init({
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'PasswordReset',
    tableName: 'passwordresets', // Explicit table name
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false // No updatedAt column
});

export default PasswordReset; // Export PasswordReset class
