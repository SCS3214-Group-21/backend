import express from 'express'

// import controllers
import {
    createProfile,
    updateProfile,
    getProfile,
    deleteProfile,
} from '../controllers/client/profile.controller.js'

// import middlewares
import verifyJWT from '../middlewares/verifyJWT.js'

const router = express.Router()

router.get('/profile', getProfile)
router.post('/profile', createProfile)
router.patch('/profile', updateProfile)
router.delete('/profile', deleteProfile)

export default router