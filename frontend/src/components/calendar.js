// import React from 'react'
// import { useEffect,useState } from 'react'
// import './calendar.css';
// import {getAllocationByMonth} from '../actions/resourceAllocationActions'
// const Calendar = ({selectedResourceId}) => {

//     const [allocationData, setAllocationData] = useState([]);



//     useEffect(() => {
//         if (selectedResourceId) {
//             console.log("from calendar.js value is ", selectedResourceId);
//             handleGetAllocationByMonth(selectedResourceId);
//         }
//     }, [selectedResourceId]);

//     const handleGetAllocationByMonth = (resourceId) => {
//         getAllocationByMonth(resourceId, '2024', '05')
//           .then((data) => {
//             setAllocationData(data);
//             console.log(data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };


//     let dummy = [
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },
//         { day: 2, name: 'Day 2' },
//         { day: 1, name: 'Day 1' },];


//     return (

//         <div>
//             <p>Selected Resource Id is : {selectedResourceId}</p>

//                     <div className='col-10'>
//                         <div className='grid-container'>
//                             {dummy.map((d, i) => (
//                                 <div key={i} className='grid-cell'>
//                                     <h1>{i + 1}</h1>
//                                     <div>{d.name}</div>
//                                 </div>
//                             ))}
//                         </div>

//                     </div>

//                 </div>


//     );
// }


// export default Calendar;


import React, { useEffect, useState } from 'react';
import './calendar.css';
import { getAllocationByMonth } from '../actions/resourceAllocationActions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useRefresh } from './RefreshContext';



const Calendar = ({ selectedResourceId }) => {
    const [allocationData, setAllocationData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDateAllocations, setSelectedDateAllocations] = useState([]);
    const [selectedAllocation, setSelectedAllocation] = useState(null);

    const { refresh, resetRefresh } = useRefresh();


    useEffect(() => {
        if (selectedResourceId) {
            console.log("from calendar.js value is ", selectedResourceId);
            handleGetAllocationByMonth(selectedResourceId);
        }
    }, [selectedResourceId]);

   
    const handleGetAllocationByMonth = (resourceId) => {
        getAllocationByMonth(resourceId, '2024', '05')
            .then((data) => {
                if (data && data.data) {
                    // Sort the data by startdate
                    const sortedData = data.data.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
                    setAllocationData(sortedData); // Setting the sorted data array directly
                }
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (refresh) {
            // Refresh your calendar here
            console.log('Refreshing calendar...');
            // Your calendar refresh logic

            // After refreshing, reset the state
            resetRefresh();
            handleGetAllocationByMonth(selectedResourceId);
        }
    }, [refresh, resetRefresh,handleGetAllocationByMonth]);



    const handleSingleAllocation = (dateAllocations) => {
        setSelectedDateAllocations(dateAllocations);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDateAllocations([]);
    };

    const handleDeleteAllocation = (allocation) => {
        console.log('Deleting allocation:', allocation);
        // Perform the deletion logic here (e.g., update the state or make an API call)
        // For now, just filter out the deleted allocation from the selectedDateAllocations state
        const updatedAllocations = selectedDateAllocations.filter(item => item._id !== allocation._id);
        setSelectedDateAllocations(updatedAllocations);
        setAllocationData(allocationData.map(data => {
            if (data.startdate === allocation.startdate) {
                return {
                    ...data,
                    allocationRecords: data.allocationRecords.filter(record => record._id !== allocation._id)
                };
            }
            return data;
        }));
        setSelectedAllocation(null);
        setOpen(updatedAllocations.length > 0); // Close dialog if no allocations left
    };


    return (
        <div>
            <p>Selected Resource Id is : {selectedResourceId}</p>
            <div className='col-10'>
                <div className='grid-container' >
                    {allocationData.length > 0 ? (
                        allocationData.map((item, i) => (
                            <div key={i} className='grid-cell border border-secondary' onClick={() => handleSingleAllocation(item.allocationRecords)} style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
                                <h5 style={{ textAlign: "center" }}>{i + 1}</h5>
                                <div>
                                    {item.allocationRecords.map((record, index) => (
                                        <div key={index} className='border border-primary rounded'style={{ marginBottom: "0.5vh", position: "relative", padding: "0.5vw",marginRight:"0.5vh",marginLeft:"0.5vh" }}>
                                            {record.class}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No allocation data available</p>
                    )}
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Allocation Details
                </DialogTitle>
                <DialogContent>
                    {selectedDateAllocations.map((allocation, index) => (
                        <div key={index} className='border border-primary rounded' style={{ marginBottom: "1vh", position: "relative", padding: "2vw" }}>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteAllocation(allocation)}
                                style={{ position: 'absolute', right: -6, top: -3 }}
                            >
                                <DeleteIcon style={{ color: 'blue' }} />
                            </IconButton>
                            <DialogContentText>
                                <strong>Description:</strong> {allocation.description}
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Class:</strong> {allocation.class}
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Time:</strong> {allocation.time}
                            </DialogContentText>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Calendar;
