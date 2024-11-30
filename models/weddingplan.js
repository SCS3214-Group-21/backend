import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

class WeddingPlan extends Model {}

WeddingPlan.init({
    plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users', // This refers to the 'users' table in your database
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    hotels: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dressers: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    photography: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    floral: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    jewellary: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dancing_groups: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ashtaka: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    salons: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dJs: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    honeymoon: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cars: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    invitation_cards: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    poruwa: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    catering: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'WeddingPlan',
    tableName: 'weddingplan', // Explicit table name
    timestamps: false,
});

export default WeddingPlan;