import express from 'express'

// import controllers
import loginController from '../controllers/auth/login.controller.js'
import registerController from '../controllers/auth/register.controller.js'
import logoutController from '../controllers/auth/logout.controller.js'
import refreshController from '../controllers/auth/refresh.controller.js'

// import middlewares
import verifyJWT from '../middlewares/verifyJWT.js'

const router = express.Router()

router.post('/', loginController)
router.post('/register', registerController)
router.get('/refresh', refreshController)
router.get('/logout', logoutController)


export default router