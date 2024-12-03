import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConn.js';
import User from './user.js';

class Subscription extends Model {}

Subscription.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id', // References the `id` column in the `users` table
        },
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true, // Null if subscription is ongoing
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'cancelled'),
        defaultValue: 'pending',
    },
    stripe_subscription_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Associations
User.hasOne(Subscription, { foreignKey: 'vendor_id' });
Subscription.belongsTo(User, { foreignKey: 'vendor_id' });

export default Subscription;
