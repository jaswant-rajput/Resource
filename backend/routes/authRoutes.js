const express = require('express')
const {
    register,
    login,
    generateOtpForForgotPassword,
    updatePassword,
    resetPasswordByOtp,
    updateCoordinator,
    changeCoordinatorPermission,
    getAllCoordinators
} = require('../controllers/userControllers')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/update-password', updatePassword)
router.post('/generate-otp-for-password',generateOtpForForgotPassword)
router.post('/reset-password-by-otp', resetPasswordByOtp)
router.get("/get-all-coordinators", getAllCoordinators)
router.put("/update-coordinator/:_id", updateCoordinator)
router.patch("/change-coordinator-permission/:_id", changeCoordinatorPermission)

module.exports = router