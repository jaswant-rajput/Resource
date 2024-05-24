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


const Calendar = ({ selectedResourceId }) => {
    const [allocationData, setAllocationData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAllocation, setSelectedAllocation] = useState({});


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


    const handleSingleAllocation = (allocation) => {
        setSelectedAllocation(allocation);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAllocation({});
    };

    const handleDeleteAllocation = () => {
        console.log('Deleting allocation:', selectedAllocation);
        handleClose();
    };


    return (
        <div>
            {/* <p>Selected Resource Id is : {selectedResourceId}</p> */}
            <div className='col-10'>
                <div className='grid-container'>
                    {allocationData.length > 0 ? (
                        allocationData.map((item, i) => (
                            <div key={i} className='grid-cell border-secondary' style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
                                <h5 style={{textAlign:"center"}}>{i + 1}</h5>
                                {/* <div>{new Date(item.startdate).toLocaleDateString()}</div> */}
                                <div>
                                    {item.allocationRecords.map((record, index) => (
                                        <div key={index} className='border border-primary ' style={{ marginBottom: "0.5vh" }} onClick={() => handleSingleAllocation(record)}>{record.class}</div>
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
                    <IconButton aria-label="delete" onClick={handleDeleteAllocation} style={{ position: 'absolute', right: 8, top: 8 }}>
                        <DeleteIcon style={{ color: 'blue' }} />
                    </IconButton></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <strong>Description:</strong> {selectedAllocation.description}
                    </DialogContentText>
                    <DialogContentText>
                        <strong>Class:</strong> {selectedAllocation.class}
                    </DialogContentText>
                    <DialogContentText>
                        <strong>Time:</strong> {selectedAllocation.time}
                    </DialogContentText>
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
