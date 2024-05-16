const express = require('express');
const { 
    getAllResources,
    createResource,
    deleteResource,
    getResourceById
//    updateResource
} = require('../controllers/resourceControllers');

const router = express.Router();

router.get('/get-all-resources', getAllResources);
router.post('/create-resource', createResource);
router.delete('/delete-resource/:_id', deleteResource);
router.get('/get-resource/:_id', getResourceById);
//router.get('/update-resource/:_id', updateResource)

module.exports = router;