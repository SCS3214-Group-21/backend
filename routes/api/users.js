import express from 'express'

import * as routes from '../../controllers/auth/userController.js'
import ROLES_LIST from '../../config/roles_list.js'
import verifyRoles from '../../middlewares/verifyRole.js'

const router = express.Router()

router.route('/')
    .get(userController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), userController.getUser)

export default router