import asyncHandler from 'express-async-handler'
import { mysqlPool } from '../../config/database.js'
import { comparePassword } from '../../utils/password.utils.js'
import { genAccessToken, genRefreshToken } from '../../utils/token.utils.js'

// @desc Login
// @route POST /auth
// @access Public

const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether emails exists
        const [result] = await mysqlPool.query(
            'SELECT * FROM auth WHERE email = ?',
            [email]
        )

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = result[0]
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const accessToken = genAccessToken(user)
        const refreshToken = genRefreshToken(user)

        const [sessionResult] = await connection.query(
            'INSERT INTO sessions (user_id, token, active) VALUES (?, ?, ?)',
            [user.id, refreshToken, true]
        )

        if (sessionResult.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to create session' })
        }

        // create secure cookie with refreshToken
        res.cookie('jwt', accessToken, {
            httpOnly: true,     // accessible only by webserver
            secure: true,       // https
            sameSite: 'None',   // cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000     // cookie expire: match rT
        })

        // send accessToken
        res.json({ accessToken })
    }
    catch (error) {
        console.error('Error logging in: ', error.message)
        res.status(500).json({ message: error.message })
    }
    finally {
        if (connection) connection.release()
    }
})

export default loginController