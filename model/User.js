import { DataTypes } from 'sequelize'
import sequelize from '../config/dbConn.js'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: { Client: 2001 }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default User