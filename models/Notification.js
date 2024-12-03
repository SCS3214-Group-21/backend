import { Model, DataTypes } from "sequelize"
import sequelize from "../config/dbConn.js"
import User from "./user.js"

class Notification extends Model {}

Notification.init({
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    priority: {
        type: DataTypes.STRING(32),
        defaultValue: 'normal',
    },
    viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

Notification.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Notification, { foreignKey: 'user_id' })

export default Notification