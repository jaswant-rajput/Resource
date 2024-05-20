const mongoose = require('mongoose');
const Resource = require('./../models/resourceSchema');
const ResourceAllocation = require('./../models/resourceAllocationSchema');

require("dotenv").config({
    path: '../.env'
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to database")
  }).catch(err => {
  console.log("Database Connection Error: ", err)
})

// Adds date of current month for all allocation objects
const makeAllocationData = (resource) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const startDate = new Date(year, month, 2);
	const endDate = new Date(year, month + 1, 1);
	const dates = [];

	while (startDate <= endDate) {
		dates.push(new Date(startDate));
		startDate.setDate(startDate.getDate() + 1);
	}

    return dates.map(day => {
        return {
            resourceObjectId: resource._id,
            startdate: day,
            defaultAllocation: [],
            allocationRecords: []
        }
    })
}

// Creates and inserts allocation data for all available resources
const createAllocationData = async() => {
	try{
		const resourceData = await Resource.find({})
        const finalData = []

        resourceData.map(resource => {
            const allocations = makeAllocationData(resource)
            allocations.map(obj => {finalData.push(obj)})
        })

		await ResourceAllocation.create(finalData)
		console.log("Allocation data created")

	} catch (err) {
		console.log(err)
	}
	process.exit()
}

createAllocationData()