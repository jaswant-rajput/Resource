const mongoose = require('mongoose');
const Resource = require('./../models/resourceSchema');
const dummyData = require('./../dummyData/dummyResources.json');

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
		await Resource.create(dummyData)
		console.log("Resource data imported")
	} catch (err) {
		console.log(err)
	}
	process.exit()
}

insertMany()