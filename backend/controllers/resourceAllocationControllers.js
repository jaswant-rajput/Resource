const ResourceAllocation = require('../models/resourceAllocationSchema')
// Set default allocation
exports.setDefaultAllocation = async(req,res) =>{
    try {
        // req.body = <array of default allocaitons>
        const response = await ResourceAllocation.updateMany(
            {resourceObjectId: req.params.resourceObjectId},
            {defaultAllocation: req.body},
            {new: true}
        )
        res.json({
            success: true,
            status: response
        })
    } catch(err) {
        res.json({
            success: false,
            error: err
        })
    }
}

// Get default allocation
exports.getDefaultAllocation = async (req, res) => {
    try {
        const { resourceObjectId } = req.params; // Assuming resourceObjectId is passed as a URL parameter

        const allocation = await ResourceAllocation.findOne({ resourceObjectId });
        
        if (!allocation) {
            return res.status(404).json({ success: false, message: "Allocation not found" });
        }

        res.json({ success: true, data: allocation.defaultAllocation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Add allocation
exports.addAllocation = async(req,res) =>{
    try {
        // req.body = { resourceObjectId : <resourceObjectId>, dates: <array of all dates>, allocation: <object of new allocation to be added> }
        // create date array using startdate values of allocations
        const response = await ResourceAllocation.updateMany(
            { resourceObjectId: req.body.resourceObjectId, startdate: { $in : req.body.dates }},
            { $push : { allocationRecords: req.body.allocation } },
            { new: true })
        res.json({
            success: true,
            status: response
        })
    } catch(err) {
        res.json({
            success: false,
            error: err
        })
    }
}

// Remove allocation
exports.removeAllocation = async(req,res) =>{
    try {
        // req.body = { _id : <allocaiton id>, allocation: <object of allocation to be removed> }
        const response = await ResourceAllocation.findByIdAndUpdate(req.body._id,
            { $pull : { allocationRecords: req.body.allocation } },
            { new: true })
        res.json({
            success: true,
            data: response
        })
    } catch(err) {
        res.json({
            success: false,
            error: err
        })
    }
    /*try {
        // Pass the allocationRecords object to be removed
        const response = await ResourceAllocation.findById(req.params._id)

        let records = response.allocationRecords
        records.splice(records.findIndex(obj => (obj.class==req.body.class)&&(obj.time==req.body.time)),1)

        try {
            // Pass the allocationRecords object to be added
            const response2 = await ResourceAllocation.findByIdAndUpdate(req.params._id,
                { allocationRecords: records },
                { new: true })
            res.json({
                message: "Success, allocation removed",
                data: response2
            })
        } catch(err) {
            res.json({
                message: "Fail, allocation not removed",
                error: err
            })
        }
    } catch(err) {
        res.json({
            message: "Fail",
            error: err
        })
    }*/
}

exports.getAllocationByMonth = async(req,res) => {
    try {
        const year = parseInt(req.query.year);
        const month = parseInt(req.query.month);
        
        const startDate = new Date();
        const endDate = new Date();
        
        startDate.setFullYear(year, month - 1, 0);
        endDate.setFullYear(year, month, 0);
        endDate.setHours(23, 59, 59, 999);
        
        const query = {
            resourceObjectId: req.query.id,
            startdate: {
                $gte: startDate,
                $lte: endDate,
            }
        }
    
        const records = await ResourceAllocation.find(query);
        res.json({
            len : records.length,
            data: records,
        })
    
    } catch(err) {
        //console.log(err)
        res.json({
            success: false,
            error: err
        })
    }
}

// Gets allocation id based on resourceObjectId and startdate
exports.getAllocationId = async (req,res) =>  {
    try {
        const allocation = await ResourceAllocation.find({
            resourceObjectId: req.query.id,
            startdate: {
                $gte: req.query.startdate,
                $lte: req.query.enddate
            }
        })
        // console.log(req.query);
        // console.log(allocation)
        res.json({
           data: allocation,
        })
    } catch (err) {
        //console.log(err)
        res.json({  
            success: false,
            data: err
        })
    }
}
// to use in resourceControllers
exports.createAllocationData = async(resource) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(Date.UTC(year, month, 1)); // Set start date to midnight UTC
    const endDate = new Date(Date.UTC(year, month + 1, 1)); // Set end date to midnight UTC
    const dates = [];

    while (startDate <= endDate) {
        dates.push(new Date(startDate));
        startDate.setUTCDate(startDate.getUTCDate() + 1); // Ensure it adds the date in UTC
    }

    const allocations = dates.map(day => {
        // Ensure the date is formatted correctly
        const formattedDate = day.toISOString().split('T')[0] + "T00:00:00.000Z";
        return {
            resourceObjectId: resource._id,
            startdate: formattedDate,
            defaultAllocation: [],
            allocationRecords: []
        }
    });

    await ResourceAllocation.create(allocations);
    console.log("Allocation data created");
};


exports.removeAllocationData = async(resourceId) => {
	await ResourceAllocation.deleteMany({resourceObjectId: resourceId})
	console.log("Allocation data removed")
}