import bcrypt from 'bcrypt'
import { mysqlPool } from '../config/database.js'

const saltRounds = 10

// function to hash the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}

// create new user
const createUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const hashedPassword = await hashPassword(password)

        const [result] = await mysqlPool.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        )

        res.status(201).json({ message: 'User created successfully', userId: result.insertId })
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create user' })
    }
}

const updateUserPassword = async (req, res) => {
    const { userId, newPassword } = req.body

    try {
        const hashedPassword = await hashPassword(newPassword)

        const [result] = await mysqlPool.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, userId]
        )

        if (result.affectedRows === 0) {
            return res.status(200).json({ message: 'User not found' })
        }

        res.status(200).json({ message: 'User updated successfully' })
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update password' })
    }
}

export { createUser, updateUserPassword }