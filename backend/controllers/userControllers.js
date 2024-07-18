const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const { generateRandomString } = require("./../utils/generateRandomString")
const { generateOtp } = require("./../utils/otp")
const nodeMailer = require('nodemailer')

require("dotenv").config({
    path: "./../.env"
})

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'developercell.sksc@somaiya.edu',
        pass: process.env.MAIL_SECRET,
    }
});

exports.login = async (req, res) => {
    try {
        // console.log("dsfsdfssdfsf")
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (!user.authenticate(req.body.password)) {
                return res.status(400).json({
                    status: false,
                    message: "Password doesn't match"
                })
            }
            else {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie('token', token, { expiresIn: '1d' });
                const { _id, firstName, lastName, middleName, email, role, department } = user
                if (user.isActive === false) {
                    return res.status(200).send({
                        message: 'Your Portal is In-Active. Contact Admin',
                        status: false
                    })
                } else {
                    return res.json({
                        status: true,
                        token,
                        user: { _id, firstName, lastName, middleName, email, role, department }
                    });
                }
            }
        } else {
            //console.log("User doesn't exist.");
            return res.json({
                status: false,
                message: "User doesn't exist."
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
                department: req.body.department,
                password: randomPassword,
                role: req.body.role
            })

            console.log("Coordinator has been created.");

            const mailOptions = {
                from: 'developercell.sksc@somaiya.edu',
                to: req.body.email,
                subject: 'Credentials For Resource Allocations Beta Testing', // Subject line
                text: `Greetings from Developer Cell of S.K. Somaiya College.\n\nThe website URL is {URL_Link}.\n\nThe details for your login to are given below:\n\nUser Name:\nPassword:\n\n`, // Plain text body
                html: `<p>Greetings from Developer Cell of S.K. Somaiya College.</p>
                       <p>We have launched the Resource Allocations.</p>
                       <p>The website URL is <a href=""></a>.</p>
                       <p>The details for your login are given below:</p>
                       <p><b>User Email: ${req.body.email}</b></p>
                       <p><b>Password: ${randomPassword}</b></p>` // HTML body
            };

            transporter.sendMail(mailOptions)
                .then(async (info) => {
                    console.log(`Email sent to ${req.body.firstName}: ` + info.response);
                    const updatedUser = await User.findByIdAndUpdate(newUser._id, { sentMail: true })
                    if (updatedUser) {
                        console.log("User updated")
                    }
                })
                .catch(error => {
                    console.error(`Error sending email for ${req.body.firstName}: ${error.message}`);
                });

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

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user && !user.authenticate(req.body.prevPass)) {
            return res.status(400).json({
                success: false,
                error: "Password doesn't Match"
            })
        } else {
            try {
                const response = await User.findByIdAndUpdate(user._id,
                    { $set: { hashed_password: user.encryptPassword(req.body.confirmPass) }},
                    { new: true })

                console.log(user.email)
                console.log(req.body.confirmPass)

                const mailOption = {
                    from: 'developercell.sksc@somaiya.edu',
                    to: user.email,
                    subject: 'Password Reset Confirmation',
                    text: `Dear ${user.firstName} ${user.lastName},\n\nThis email is to confirm that your password for your Resource Allocations account has been successfully reset.\n\nIf you initiated this password reset request, you can now log in to your account using your new password.\n\nIf you did not request this password reset or believe your account has been compromised, please contact our support team immediately for assistance.`,
                    html: `<p>Dear ${user.firstName} ${user.lastName},</p>
                           <p>This email is to confirm that your password for your Resource Allocations account has been successfully reset.</p>
                           <p>If you initiated this password reset request, you can now log in to your account using your new password.</p>
                           <p>If you did not request this password reset or believe your account has been compromised, please contact our support team immediately for assistance.</p>`
                }

                transporter.sendMail(mailOption).then(info => {
                    console.log(`Email send to ${user.email}: ` + info.response)
                }).catch(error => {
                    console.error(`Error sending email for ${user.name}: ${error.message}`);
                });

                res.json({
                    success: true,
                    data: response
                })
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err)
    }
}

exports.generateOtpForForgotPassword = async (req, res) => {
    try {
        const otp = generateOtp(4)
        const user = await User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: otp }}, { new: true })
        if (!user) {
            return res.json({
                success: false,
                message: "Email does not exist"
            })
        } else {
            console.log(user.otp)

            const mailOption = {
                from: 'developercell.sksc@somaiya.edu',
                to: user.email,
                subject: 'Password Reset OTP',
                text: `Dear ${user.firstName} ${user.lastName},\n\nYour OTP (One-Time Password) for resetting your password is: ${user.otp}.\n\nIf you did not request this password reset, please ignore this email.`,
                html: `<p>Dear ${user.firstName} ${user.lastName},</p>
                       <p>Your OTP (One-Time Password) for resetting your password is: <strong>${user.otp}</strong>.</p>
                       <p>If you did not request this password reset, please ignore this email.</p>`
            }

            transporter.sendMail(mailOption).then(info => {
                console.log(`Email send to ${user.email}: ` + info.response)
            }).catch(error => {
                console.error(`Error sending email for ${user.name}: ${error.message}`);
            });

            return res.json({
                success: true,
                message: "otp sent!"
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

exports.resetPasswordByOtp = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user.otp === req.body.otp * 1) {
            const updatedUser = await User.findOneAndUpdate(
                { email: req.body.email },
                { $set: { otp: null, hashed_password: user.encryptPassword(req.body.password) }},
                { new: true })
            if (!updatedUser) {
                return res.json({
                    success: false,
                    message: "Error while updating Password"
                })
            } else {
                console.log(req.body.email)
                console.log(req.body.password)
                const mailOption = {
                    from: 'developercell.sksc@somaiya.edu',
                    to: user.email,
                    subject: 'Password Reset Confirmation',
                    text: `Dear ${updatedUser.firstName} ${updatedUser.lastName},\n\nThis email is to confirm that your password for your Resource Allocations account has been successfully reset.\n\nIf you initiated this password reset request, you can now log in to your account using your new password.\n\nIf you did not request this password reset or believe your account has been compromised, please contact our support team immediately for assistance.`,
                    html: `<p>Dear ${updatedUser.firstName} ${updatedUser.lastName},</p>
                           <p>This email is to confirm that your password for your Resource Allocations account has been successfully reset.</p>
                           <p>If you initiated this password reset request, you can now log in to your account using your new password.</p>
                           <p>If you did not request this password reset or believe your account has been compromised, please contact our support team immediately for assistance.</p>`
                }

                transporter.sendMail(mailOption).then(info => {
                    console.log(`Email send to ${user.email}: ` + info.response)
                }).catch(error => {
                    console.error(`Error sending email for ${user.name}: ${error.message}`);
                });
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

exports.getAllCoordinators = async (req, res) => {
    try{
        const arr = await User.find({ role: 0 })
        // console.log(response)
        res.send({
            success: true,
            response: arr
        })
    } catch(err){
        res.send({
            success: false,
            error: err,
        })
    }
}

exports.updateCoordinator = async (req, res) => {
    //console.log(req.body);
    try {
        const response = await User.findByIdAndUpdate(req.params._id, req.body, { new: true })
        res.send({
            success: true,
            response: response,
        })
    } catch(err) {
        res.send({
            success: false,
            error: err,
        })
      }
}

exports.changeCoordinatorPermission = async (req, res) => {
    try {
        const coordinator = await User.findById(req.params._id)
        if (!coordinator) {
            return res.status(404).json({ error: "Coordinator not found" });
        }
        // Toggle the isActive field
        coordinator.isActive = !coordinator.isActive;

        // Save the updated coordinator
        coordinator.save();

        res.json({
            message: "Coordinator status updated successfully",
            isActive: !coordinator.isActive,
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
