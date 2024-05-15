const Resource = require('../models/resourceSchema')

exports.getAllResources = async(req, res) => {
    try {
        const resources = await Resource.find().sort({resourceNo:1})
        res.send({
            success: true,
            data: resources
        })
    } catch(err) {
        res.send({
            success: false,
            error: err
        })
    }
}

exports.createResource = async(req, res) => {
    try {
        let resource = new Resource(req.body)
        // add process to create respective allocation data
        const response = await resource.save()
        res.json({
            message: response,
            success: true
        })
    } catch(err) {
        res.json({
            success: false,
            error: err
        })
    }
}

exports.deleteResource = async(req, res) => {
    try {
        // add process to delete respective allocation data
        const deletedResource = await Resource.findByIdAndDelete(req.params._id)
        if (!deletedResource) {
            return res.status(404).json({ success: false, message: "Resource not found" });
        }
        res.json({ success: true, message: "Resource deleted successfully", data: deletedResource});
    } catch(err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getResourceById = async(req, res) => {
    try {
        const resource = Resource.findById(req.params._id)
        if (!resource) {
            return res.status(404).json({ success: false, message: "Resource not found" });
        }
        res.json({ success: true, data: resource});
    } catch(err) {
        res.status(500).json({ success: false, error: err});
    }
};

exports.updateResource = async(req, res) => {
    try {
        const updateData = req.body;

        const updatedResource = await Resource.findByIdAndUpdate(req.params._id, updateData, { new: true })
        if (!updatedResource) {
            return res.status(404).json({ success: false, message: "Resource not found"});
        }
        res.json({ success: true, message: "Resource updated successfully", data: updatedResource});
    } catch(err) {
        res.status(500).json({ success: false, error: err})
    }
}