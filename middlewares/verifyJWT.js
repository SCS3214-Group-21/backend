import jwt from 'jsonwebtoken'

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message:'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify (
        token,
        process.env.ACCESS_TOKEN_SECRET,
        function (err, decoded) {
            if(err) return res.status(403).json({ message:'Forbidden' })

            req.userInfo = req.userInfo || {}

            req.email = decoded.userInfo.email
            req.roles = decoded.userInfo.roles
            console.log(req.userInfo)
            next()
        }
    )
}

export default verifyJWT