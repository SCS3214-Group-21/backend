import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Make sure your DB connection file is correct

class BanUsers extends Model {}

BanUsers.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    ban_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'BanUsers',
    tableName: 'banusers',
    timestamps: false,
});


export default BanUsers; // Export the Client model
