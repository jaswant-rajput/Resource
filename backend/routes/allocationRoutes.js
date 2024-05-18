const express = require('express');
const { 
    setDefaultAllocation,
    getDefaultAllocation,
    addAllocation,
    removeAllocation,
    getAllocationByMonth,
    getAllocationId,
} = require('../controllers/resourceAllocationControllers');

const router = express.Router();

router.patch('/set-default-allocation/:resourceObjectId', setDefaultAllocation);
router.get('/get-default-allocation/:_id',getDefaultAllocation);
router.patch('/add-allocation/:_id', addAllocation);
router.delete('/remove-allocation/:_id', removeAllocation);
router.get('/get-allocation-by-month',getAllocationByMonth);
router.get('/get-allocation-id', getAllocationId);

module.exports = router;