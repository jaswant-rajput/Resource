const express = require('express')
const { register,
    login,
    forgotPassword,
    resetPassword,
    otpForForgotPassword
} = require('../controllers/userControllers')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/reset-password', resetPassword)
router.post('/otp-for-password',otpForForgotPassword)
router.post('/forgot-password', forgotPassword)

module.exports = router