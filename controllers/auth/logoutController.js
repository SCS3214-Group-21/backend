import RefreshToken from '../../model/RefreshToken.js'

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt)
        return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt

    const foundUser = await RefreshToken.findOne({ where: { refreshToken } })
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }

    // Delete refreshToken in db
    await RefreshToken.destroy({ where: { token: refreshToken } })

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
}

export default handleLogout