import { Model, DataTypes} from "sequelize";
import sequelize from "../config/dbConn.js";
import User from "./user.js";

class Event extends Model {}

Event.init({
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    title: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
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
    modelName: 'Event',
    tableName: 'events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Event.belongsTo(User, { foreignKey: 'user_id'});
User.hasMany(Event, {foreignKey: 'user_id'});

export default Event