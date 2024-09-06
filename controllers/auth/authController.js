import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../model/User.js'
import RefreshToken from '../../model/RefreshToken.js'

const handleLogin = async (req, res) => {
    const cookies = req.cookies
    const { email, pwd } = req.body

    if (!email || !pwd) {
        return res.status(400).json({ message: 'Email and password are required.' })
    }

    const foundUser = await User.findOne({ where: { email: email } })
    if (!foundUser) {
        return res.sendStatus(401) // Unauthorized
    }

    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        const parsedRoles = JSON.parse(foundUser.roles)
        const roles = Object.values(parsedRoles).filter(Boolean)
        // Create JWTs
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    email: foundUser.email,
                    roles: roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )

        const newRefreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '15s' }
        )

        const refreshTokenExpiry = new Date(Date.now() + 15 * 1000) // Set expiration for refresh token

        // Check existing refresh tokens
        let refreshTokens = await RefreshToken.findAll({ where: { userId: foundUser.id } })
        refreshTokens = refreshTokens.map(rt => rt.token)

        let newRefreshTokenArray = !cookies?.jwt
            ? refreshTokens
            : refreshTokens.filter(rt => rt !== cookies.jwt)

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt
            const foundToken = await RefreshToken.findOne({
                where: { token: refreshToken, userId: foundUser.id }
            })

            // Detected refresh token reuse
            if (!foundToken) {
                // Clear out ALL previous refresh tokens
                await RefreshToken.destroy({ where: { userId: foundUser.id } })
                // newRefreshTokenArray = []
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        }

        // Saving new refreshToken to the database
        await RefreshToken.create({
            token: newRefreshToken,
            userId: foundUser.id,
            expiresAt: refreshTokenExpiry
        })

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        // Send authorization roles and access token to the user
        res.json({ accessToken })
    } else {
        res.sendStatus(401) // Unauthorized
    }
}

export default handleLogin