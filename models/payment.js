import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

class Payment extends Model {}

Payment.init({
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    payment_key: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payment',
    timestamps: false,
})

export default Payment;