import jwt from 'jsonwebtoken'
import User from '../../model/User.js'
import RefreshToken from '../../model/RefreshToken.js'

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

    const foundToken = await RefreshToken.findOne({ where: { token: refreshToken } })

    // Detected refresh token reuse!
    if (!foundToken) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err)
                    return res.sendStatus(403) // Forbidden
                const hackedUser = await User.findOne({ where: { email: decoded.email } })
                if (hackedUser) {
                    await RefreshToken.destroy({ where: { userId: hackedUser.id } })
                }
            }
        )
        return res.sendStatus(403)   // Forbidden
    }

    const foundUser = await User.findOne({ where: { id: foundToken.userId } })
    if (!foundUser) {
        await RefreshToken.destroy({ where: { id: foundToken.id } })
        return res.sendStatus(401) // Unauthorized
    }

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err)
                // Expired refresh token
                await RefreshToken.destroy({ where: { id: foundToken.id } })

            if (err || foundUser.username !== decoded.email)
                return res.sendStatus(403)

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            )

            const newRefreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '15s' }
            )

            // Save refreshToken with current user
            await RefreshToken.create({
                token: newRefreshToken,
                userId: foundUser.id,
                expiresAt: new Date(Date.now() + 15 * 1000)
            })

            // Create Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

            res.json({ accessToken })
        }
    )
}

export default handleRefreshToken