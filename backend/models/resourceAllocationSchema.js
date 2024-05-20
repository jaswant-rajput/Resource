const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const resourceAllocationSchema = new mongoose.Schema({
    resourceObjectId: {
		type: ObjectId,
		ref: "Resource"
	},
	startdate: {
		type: Date,
		required: true
	},
	defaultAllocation: [{
		class: {
			type: String,
			trim: true
		},
		time: {
			type: String
		},
	}],
  	allocationRecords: [{
		class: {
			type: String,
			trim: true	
		},
		description: {
			type: String,
			trim: true
		},
		time: {
			type: String
		}
    }]
});

module.exports = mongoose.model('ResourceAllocation', resourceAllocationSchema);