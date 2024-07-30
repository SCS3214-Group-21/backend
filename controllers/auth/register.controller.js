import asyncHandler from 'express-async-handler'
import { mysqlPool } from '../../config/database.js'
import { hashPassword } from '../../utils/password.utils.js'

// @desc Register
// @route POST /auth/register
// @access Public

const registerController = asyncHandler(async (req, res) => {
    const { email, password, roles='client' } = req.body
    if(!email || !password){
        return res.status(400).json({ message: 'All fields are required'})
    }

    let connection
    try {
        connection = await mysqlPool.getConnection()

        // check whether email exists
        const [existingUser] = await connection.query(
            'SELECT * FROM auth WHERE email = ?',
            [email]
        )
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User already exists'})
        }

        const hashedPassword = await hashPassword(password)

        const [result] = await connection.query(
            'INSERT INTO auth (email, password, roles) VALUES (?, ?, ?)',
            [email, hashedPassword, JSON.stringify(roles)],
        )

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to register user' })
        }

        res.status(201).json({ message: 'User registered successfully'})
    }
    catch(err) {
        console.error('Error registering user: ', err.message)
        res.status(500).json({ message: 'Internal Server Error' })
    }
    finally {
        if (connection) connection.release()
    }
})

export default registerController