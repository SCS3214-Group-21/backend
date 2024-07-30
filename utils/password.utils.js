import bcrypt from 'bcrypt'

const saltRounds = 10

// function to hash the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}

// function to compare passwords
const comparePassword = async (candidatePassword, hashedPassword) => {
    try {
        return await bcrypt.compare(candidatePassword, hashedPassword)
    }
    catch (err) {
        throw new Error(err.message)
    }
}

export { hashPassword, comparePassword }