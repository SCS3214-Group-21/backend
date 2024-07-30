import { mysqlPool } from '../../config/database.js'
import { hashPassword } from '../../utils/password.utils.js'

// register user
const registerUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const hashedPassword = await hashPassword(password)

        await mysqlPool.query(
            'SELECT email FROM auth WHERE email = ?',
            [email],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ message: error.message })
                }
                if (results.length > 0) {
                    return res.status(204).json({ message: 'Email already exists' })
                }
            })

        const [result] = await mysqlPool.query(
            'INSERT INTO auth (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        )

        res.status(201).json({ message: 'User created successfully', userId: result.insertId })
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create user' })
    }
}



// update user password
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