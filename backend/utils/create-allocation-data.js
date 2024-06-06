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

//Adds date of current month for all allocation objects
const makeAllocationData = (resource) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
  
	// Create startDate and endDate without time part using date truncation
	let startDate = new Date(year, month, 2);
	let endDate = new Date(year, month + 1, 1);
  
	const dates = [];
  
	while (startDate <= endDate) {
	  // Truncate time by creating a new date with only the date part
	  const truncatedDate = new Date(startDate.toISOString().split('T')[0]);
	  dates.push(truncatedDate);
	  startDate.setDate(startDate.getDate() + 1);
	}
  
	return dates.map(day => {
	  // Ensure time part is truncated by creating a new date with only the date part
	  const truncatedDay = new Date(day.toISOString().split('T')[0]);
	  return {
		resourceObjectId: resource._id,
		startdate: truncatedDay,
		defaultAllocation: [],
		allocationRecords: []
	  };
	});
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