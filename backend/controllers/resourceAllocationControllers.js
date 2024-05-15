const ResourceAllocation = require('../models/resourceAllocationSchema')
// Set default allocation
exports.setDefaultAllocation = async(req,res) =>{
    try {
        // Pass the defaultAllocation object to be set
        const response = await ResourceAllocation.updateMany(
            {resourceObjectId: req.params.resourceObjectId},
            {defaultAllocation: req.body},
            {new:true}
        )
        res.json({
            message:"Success, default allocations updated",
            data: response
        })
    } catch(err) {
        res.json({
            message:"Fail, default allocations not updated",
            error:err
        })
    }
}

// Get default allocation
exports.getDefaultAllocation = async(req, res) => {
    try {
        const allocation = await ResourceAllocation.findById(req.params._id)
        if (!allocation) {
            return res.status(404).json({ success: false, message: "Allocation not found" });
        }
        res.json({ success: true, data: allocation.defaultAllocation });
    } catch(err) {
        res.status(500).json({ success: false, error: err});
    }
}

// Add allocation
exports.addAllocation = async(req,res) =>{
    try {
        const response = await ResourceAllocation.findById(req.params._id)

        let records = response.allocationRecords
        records.push(req.body)

        try {
        // Pass the allocationRecords object to be added
            const response2 = await ResourceAllocation.findByIdAndUpdate(req.params._id,
                { allocationRecords:records },
                { new:true })
            res.json({
                message:"Success, allocation added",
                data:response2
            })
        } catch(err) {
            res.json({
                message:"Fail, allocation not added",
                error:err
            })
        }
    } catch(err) {
        res.json({
            message:"Fail",
            error:err
        })
    }
}

// Remove allocation
exports.removeAllocation = async(req,res) =>{
    try {
        // Pass the allocationRecords object to be removed
        const response = await ResourceAllocation.findById(req.params._id)

        let records = response.allocationRecords
        records.splice(records.findIndex(obj => (obj.class==req.body.class)&&(obj.time==req.body.time)),1)

        try {
            // Pass the allocationRecords object to be added
            const response2 = await ResourceAllocation.findByIdAndUpdate(req.params._id,
                { allocationRecords:records },
                { new:true })
            res.json({
                message:"Success, allocation removed",
                data:response2
            })
        } catch(err) {
            res.json({
                message:"Fail, allocation not removed",
                error:err
            })
        }
    } catch(err) {
        res.json({
            message:"Fail",
            error:err
        })
    }
}

exports.getAllocationByMonth = async(req,res) => {
    try {
        const year = parseInt(req.query.year);
        const month = parseInt(req.query.month);
        
        const startDate = new Date();
        const endDate = new Date();
        
        startDate.setFullYear(year, month - 1, 1);
        endDate.setFullYear(year, month, 0);
        endDate.setHours(23, 59, 59, 999);

        
        const query = {
            resourceObjectId: req.query.id,
            startdate: {
                $gte: startDate,
                $lte: endDate,
            },
        };
    
        const records = await ResourceAllocation.find(query);
        res.json({
            len : records.length,
            data: records,
        });
    
    } catch(err) {
        //console.log(err)
        res.json({
            message:"fail",
            data:err
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
        });
        // console.log(req.query);
        // console.log(allocation)
        res.json({
           data:allocation,
        });

    } catch (err) {
        //console.log(err)
        res.json({  
            message:"fail",
            data:err
        })
    }
}