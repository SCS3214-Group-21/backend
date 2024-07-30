import express from 'express'

// import middleware
import verifyJWT from './middlewares/verifyJWT.js'
import verifyRole from './middlewares/verifyRole.js'

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

// auth routes
router.use('/auth', authRoute)

// protected routes
router.use('/client', verifyJWT, verifyRole("client"), clientRoute)

export default router