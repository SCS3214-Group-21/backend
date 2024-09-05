import express from 'express'

import logoutController from '../controllers/auth/logoutController.js'

const router = express.Router()

router.get('/', logoutController)

export default router