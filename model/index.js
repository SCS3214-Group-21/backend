import User from './User.js'
import RefreshToken from './RefreshToken.js'

// Define associations
User.hasMany(RefreshToken,{
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE',  // When a user is deleted, all associated refresh tokens will be deleted
})

RefreshToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
})

// Export models
export {
    User,
    RefreshToken
}