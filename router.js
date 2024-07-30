import express from 'express'

// import other routes
import authRoute from './routes/auth.route.js'
import clientRoute from './routes/client.route.js'

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(express.static('public'))

router.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

router.use('/auth', authRoute)
router.use('/client', clientRoute)

export default router