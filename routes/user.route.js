import express from 'express'
import { createUser, updateUserPassword} from '../controllers/user.controller'

const router = express.Router()

router.post('/create', createUser)
router.put('/update', updateUserPassword)

export default router