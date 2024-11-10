import { Model, DataTypes } from 'sequelize'; // Import Model and DataTypes from sequelize
import sequelize from '../config/dbConn.js'; // Make sure your DB connection file is correct

class Blog extends Model {}

Blog.init({
    blog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {  // This likely refers to the author/user ID (foreign key)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // This refers to the 'users' table in your database
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Blog', // Define the model name
    tableName: 'blogs', // Define the explicit table name if it's different
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
});

export default Blog; // Export the Blog model
