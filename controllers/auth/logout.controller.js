import { mysqlPool } from '../../config/database.js'

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists

const logoutController = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) {
        return res.sendStatus(204)      // no content
    }

    const token = cookies.jwt

    const query = 'UPDATE sessions SET active = false WHERE token = ?'

    try {
        const connection = await mysqlPool.getConnection()
        await connection.execute(query, [token])
        connection.release()

        res.clearCookie(
            'jwt',
            {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }
        )

        res.json({message: 'Cookie cleared and session updated'})
    }
    catch (error) {
        console.error(error.message)
        res.sendStatus(500)
    }
}

export default logoutController