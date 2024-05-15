const ResourceAllocation = require('../models/resourceAllocationSchema')
// Set default allocation
exports.setDefaultAllocation = (req,res) =>{
    // Pass the defaultAllocation object to be set
    ResourceAllocation.updateMany(
        {resourceObjectId: req.params.resourceObjectId},
        {defaultAllocation: req.body},
        {new:true}
    ).then(response =>{
        res.json({
            message:"Success, default allocations updated",
            data: response
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            message:"Fail, default allocations not updated",
            data:err
        })
    })
}

// Get default allocation
exports.getDefaultAllocation = (req, res) => {
    ResourceAllocation.findById(req.params._id)
        .then(allocation => {
            if (!allocation) {
                return res.status(404).json({ success: false, message: "Allocation not found" });
            }
            res.json({ success: true, data: allocation.defaultAllocation });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err});
        });
};

// Add allocation
exports.addAllocation = (req,res) =>{
    ResourceAllocation.findById(req.params._id).then(response =>{
        console.log({
            message:"Success, data found",
            data:response
        })
        let records = response.allocationRecords
        records.push(req.body)
        // Pass the allocationRecords object to be added
        ResourceAllocation.findByIdAndUpdate(req.params._id,
            { allocationRecords:records },
            { new:true }).then(response2 =>{
            res.json({
                message:"Success, allocation added",
                data:response2
            })
        }).catch(err =>{
            res.json({
                message:"Fail, allocation not added",
                data:err
            })
        })
    }).catch(err =>{
        console.log({
            message:"Fail, data not found",
            data:err
        })
    })
}

// Remove allocation
exports.removeAllocation = (req,res) =>{
        // Pass the allocationRecords object to be removed
        ResourceAllocation.findById(req.params._id).then(response =>{
        console.log({
            message:"Success, data found",
            data:response
        })
        let records = response.allocationRecords
        records.splice(records.findIndex(obj => (obj.class==req.body.class)&&(obj.time==req.body.time)),1)
        // Pass the allocationRecords object to be added
        ResourceAllocation.findByIdAndUpdate(req.params._id,
            { allocationRecords:records },
            { new:true }).then(response2 =>{
            res.json({
                message:"Success, allocation removed",
                data:response2
            })
        }).catch(err =>{
            res.json({
                message:"Fail, allocation not removed",
                data:err
            })
        })
    }).catch(err =>{
        console.log({
            message:"Fail, data not found",
            data:err
        })
    })
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
    
    }catch(err){
        console.log(err)
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
           data:allocation._id,
        });

    } catch (err) {
        console.log(err)
        res.json({  
            message:"fail",
            data:err
        })
    }
}