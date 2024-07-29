import express from 'express'

// import other routes
import userRoute from './routes/user.route.js'

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(express.static('public'))

router.use('/user', userRoute)

export default router