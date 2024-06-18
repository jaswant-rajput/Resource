const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const { generateRandomString } = require("./../utils/generateRandomString")
const { generateOtp } = require("./../utils/otp")

exports.login = async (req, res) => {
    try {
        // console.log("dsfsdfssdfsf")
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (!user.authenticate(req.body.password)) {
                return res.status(400).json({
                    status: false,
                    message: "Password doesn't Match"
                })
            }
            else {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie('token', token, { expiresIn: '1d' });
                const { _id, firstName, lastName, middleName, email, role, department } = user

                return res.json({ 
                    status: true,
                    token,
                    user: { _id, firstName, lastName, middleName, email, role, department }
                })
            }
        } else {
            console.log("User doesn't exist.");
            return res.json({
                status: false,
                messsage: "User doesn't exist."
            })
        }
    } catch (err) {
        console.log(err)
        return res.json({
            status: false,
            error: err
        })
    }
}

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                status: false,
                message: "User already exists"
            })
        } else {
            let newUser;
            //assuming that the admin can only add coordinators and no other role, we won't be checking if 'req.body.role === 1'
            const randomPassword = generateRandomString(8)

            newUser = await User.create({
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: 0
            })

            console.log("Coordinator has been created.");

            res.status(200).json({
                success: true,
                newUser
            })
            console.log(newUser)
            console.log(randomPassword)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            success: false
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user && !user.authenticate(req.body.prevPass)) {
            return res.status(400).json({
                status: false,
                error: "Password doesn't Match"
            })
        } else {
            try {
                const success = await User.findByIdAndUpdate(user._id, {
                    $set: { hashed_password: user.encryptPassword(req.body.confirmPass) }
                }, { new: true })

                console.log(user.email)
                console.log(req.body.confirmPass)

                res.json({
                    status: true,
                    data: success
                })
                console.log(success)
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err)
    }
}

exports.otpForForgotPassword = async (req, res) => {
    try {
        const otp = generateOtp(4)
        const user = await User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: otp } }, { new: true })
        if (!user) {
            return res.json({
                success: false,
                message: "Email does not exist"
            })
        } else {
            console.log(user.otp)
            return res.json({
                success: true,
                message: "Done!"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            success: false
        })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user.otp === req.body.otp * 1) {
            const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: null, hashed_password: user.encryptPassword(req.body.password) } }, { new: true })
            if (!updatedUser) {
                return res.json({
                    success: false,
                    message: "Error while updating Password"
                })
            } else {
                console.log(req.body.email)
                console.log(req.body.password)
                console.log(req.body.otp)
                return res.json({
                    success: true,
                    message: "Password updated"
                })
            }
        }
        res.json({
            success: false,
            message: "Invalid OTP"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            success: false
        })
    }
}