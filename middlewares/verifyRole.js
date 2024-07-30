const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.roles || !req.roles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden: Access Denied' })
        }
        next()
    }
}

export default verifyRole