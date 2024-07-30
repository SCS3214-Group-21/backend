import jwt from 'jsonwebtoken'

const genAccessToken = ({ email, role='client' }) => jwt.sign(
    {
        "userInfo": {
            "email": email,
            "role": role,
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
)

const genRefreshToken = ({ email }) => jwt.sign(
    { "email": email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
)

export { genAccessToken, genRefreshToken }