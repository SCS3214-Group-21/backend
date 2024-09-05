const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles)
            return res.status(403).json({ message:'Forbidden' })

        const rolesArray = [...allowedRoles]

        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        if (!result)
            return res.status(401).json({ message:'Unauthorized' })

        next()
    }
}

// const verifyRole = (role) => {
//     return (req, res, next) => {
//         if (!req?.roles || !req.roles.includes(role)) {
//             return res.status(403).json({ message: 'Forbidden: Access Denied' })
//         }
//         next()
//     }
// }

export default verifyRole