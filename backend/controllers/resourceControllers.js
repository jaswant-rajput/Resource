const Resource = require('../models/resourceSchema')

exports.getAllResources = (req, res) => {
    Resource.find().sort({resourceNo:1}).then(response => {
        res.send({
            response
        })
    }).catch(err => {
        res.send({
            success: false,
            error: err
        })
    })
}

exports.createResource = (req, res) => {
    let resource = new Resource(req.body)
    // add process to create respective allocation data
    resource.save().then(response => {
        res.json({
            message: response,
            success: true
        })
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
}

exports.deleteResource = (req, res) => {
    const resourceId = req.params._id;
    // add process to delete respective allocation data
    Resource.findByIdAndDelete(resourceId)
        .then(deletedResource => {
            if (!deletedResource) {
                return res.status(404).json({ success: false, message: "Resource not found" });
            }
            res.json({ success: true, message: "Resource deleted successfully", deletedResource });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'error' });
        });
};

exports.getResourceById = (req, res) => {
    const resourceId = req.params._id;

    Resource.findById(resourceId)
        .then(resource => {
            if (!resource) {
                return res.status(404).json({ success: false, message: "Resource not found" });
            }
            res.json({ success: true, resource });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'error' });
        });
};

exports.updateResource = (req, res) => {
    const resourceId = req.params._id;
    const updateData = req.body;
    
    Resource.findByIdAndUpdate(resourceId, updateData, { new: true })
        .then(updatedResource => {
            if (!updatedResource) {
                return res.status(404).json({ success: false, message: "Resource not found"});
            }
            res.json({ success: true, message: "Resource updated successfully", updatedResource});
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err})
        })
}