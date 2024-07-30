import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { mysqlPool } from '../../config/database.js'
import { genAccessToken } from '../../utils/token.utils.js'

// @desc Refresh
// @Route GET /auth/refresh
// @access Public - as refreshToken expires

const refreshController = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message:'Forbidden' })

        let connection
        try {
            connection = await mysqlPool.getConnection()
            const [result] = await mysqlPool.query(
                'SELECT * FROM auth WHERE token = ? AND active = ?',
                [refreshToken, true]
            )

            if (result.length === 0) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            const foundUser = result[0]
            const accessToken = genAccessToken(foundUser)

            // send new accessToken
            res.json({ accessToken })
        }
        catch(error) {
            console.error('Error refreshing token: ', error)
            res.status(500).json({ message: 'Internal Server Error' })
        }
        finally {
            if (connection) connection.release()
        }
    })
})

export default refreshController