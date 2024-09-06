import express from 'express'

import refreshTokenController from '../../controllers/auth/refreshTokenController.js'

const router = express.Router()

router.get('/', refreshTokenController)

export default router