import jwt from 'jsonwebtoken'

const genAccessToken = ({ email, roles='client' }) => {
    return jwt.sign(
        {
            "userInfo": {
                "email": email,
                "roles": roles,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    )
}

const genRefreshToken = ({ email }) => jwt.sign(
    { "email": email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
)

export { genAccessToken, genRefreshToken }