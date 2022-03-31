import express from 'express'
import {
    loginUser,
    registerUser,
    verifyToken,
    getUserProfile
} from '../controllers/userControllers.js'

import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)

router.route('/verifyToken').get(verifyToken)

router.route('/getUserProfile').get(protect, getUserProfile)

export default router