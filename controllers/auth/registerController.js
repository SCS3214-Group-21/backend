import bcrypt from 'bcrypt'
import User from '../../model/User.js'

const handleNewUser = async (req, res) => {
    const { email, pwd } = req.body
    if (!email || !pwd)
        return res.status(400).json({ 'message': 'Email and password are required.' })

    try {
        // Check for duplicate emails in the database
        const duplicate = await User.findOne({ where: { email: email } })
        if (duplicate) return res.sendStatus(409)   // Conflict

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        // Create and store the new user
        const result = await User.create({
            email: email,
            password: hashedPwd
        })

        res.status(201).json({ success: `User ${email} Registered!` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export default handleNewUser