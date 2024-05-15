const mongoose = require('mongoose');
const User = require('./../models/userSchema');
const dummyData = require('./../dummyData/dummyUsers.json');
const fs = require('fs');

require("dotenv").config({
  	path: '../.env'
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
	console.log("Connected to database")
	}).catch(err => {
	console.log("Database Connection Error: ", err)
})

// Insert the dummy data into the database
const insertMany = async () => {
	try {
		await User.create(dummyData)
		console.log("Data imported")
		console.log("Password for all users is set to 'password'")
	} catch (err) {
		console.log(err)
	}
	process.exit()
}
insertMany()