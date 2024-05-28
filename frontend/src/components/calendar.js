import React, { useEffect, useState } from 'react';
import './calendar.css';
import { getAllocationByMonth, removeAllocation } from '../actions/resourceAllocationActions';
import { getAllResources} from '../actions/resourceActions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Alert from '@mui/material/Alert';
import { useRefresh } from './RefreshContext';



const Calendar = ({ selectedResourceId }) => {
    const [allocationData, setAllocationData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDateAllocations, setSelectedDateAllocations] = useState([]);
    const [selectedAllocation, setSelectedAllocation] = useState(null);

    const { refresh, resetRefresh } = useRefresh();

    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);


    useEffect(() => {
        if (selectedResourceId) {
            console.log("from calendar.js value is ", selectedResourceId);
            handleGetAllocationByMonth(selectedResourceId);
        }
    }, [selectedResourceId]);

    // useEffect (()=>{
    //     getAllResources().then(data=>console.log('data',data))
    //     .catch(err=>console.log('error',err));
    // })


    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const triggerAlert = (message, severity) => {
        setAlertMessage(message);
        setSeverity(severity);
        setAlertOpen(true);
    };



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
    }, [refresh, resetRefresh, handleGetAllocationByMonth]);



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
        console.log('selected data'.selectedAllocation)
        console.log('set allocation data ',allocationData)
      
        // Perform the deletion logic here (e.g., update the state or make an API call)
        const updatedAllocations = selectedDateAllocations.filter(item => item._id !== allocation._id);
        setSelectedDateAllocations(updatedAllocations);
      
        // setAllocationData(allocationData.map(data => {
        //   if (data._id === allocation._id) {
        //     return {
        //       ...data,
        //       allocationRecords: data.allocationRecords.filter(record => record._id !== allocation._id)
        //     };
        //   }
        //   return data;
        // }));
      
        // // Prepare the data for the delete request in the required format
        // const allocationData = {
        //   _id: allocation._id,
        //   allocation: {
        //     class: allocation.class,
        //     description: allocation.description,
        //     time: allocation.time,
        //     _id: allocation._id
        //   }
        // };
      
        // removeAllocation(JSON.stringify(allocationData))
        //   .then(response => {
        //     console.log('Response for delete:', response);
        //     triggerAlert('Successfully deleted allocation', 'success');
        //   })
        //   .catch(err => {
        //     console.log('Error from delete:', err);
        //     triggerAlert('Failed to delete allocation', 'error');
        //   });
      
        setSelectedAllocation(null);
        setOpen(updatedAllocations.length > 0); // Close dialog if no allocations left
      };
      




    return (
        <div>
            {/* <p>Selected Resource Id is : {selectedResourceId}</p> */}
            <p>{}</p>
            <div className='col-10'>
                <div className='grid-container' >
                    {allocationData.length > 0 ? (
                        allocationData.map((item, i) => (
                            <div key={i} className='grid-cell border border-secondary' onClick={() => handleSingleAllocation(item.allocationRecords)} style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
                                <h5 style={{ textAlign: "center" }}>{i + 1}</h5>
                                <div>
                                    {item.allocationRecords.map((record, index) => (
                                        <div key={index} className='border border-primary rounded' style={{ marginBottom: "0.5vh", position: "relative", padding: "0.5vw", marginRight: "0.5vh", marginLeft: "0.5vh" }}>
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

            {/*alert */}
            <Dialog open={alertOpen} onClose={handleAlertClose}>
                <Alert severity={severity} onClose={handleAlertClose}>
                    {alertMessage}
                </Alert>
            </Dialog>
        </div>
    );
};

export default Calendar;
