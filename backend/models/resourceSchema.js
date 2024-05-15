const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
	resourceNo: {
		type: Number,
		required: true
	},
	resourceType: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('Resource', resourceSchema);