// import React, { useEffect, useState } from 'react';
// import './calendar.css';
// import { getAllocationByMonth, removeAllocation } from '../actions/resourceAllocationActions';
// import { getAllResources } from '../actions/resourceActions';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import Alert from '@mui/material/Alert';
// import { useRefresh } from './RefreshContext';



// const Calendar = ({ selectedResourceId }) => {
//     const [allocationData, setAllocationData] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [selectedDateAllocations, setSelectedDateAllocations] = useState([]);
//     const [selectedAllocation, setSelectedAllocation] = useState(null);
//     const [startdate, setStartDate] = useState('')

//     const { refresh, resetRefresh } = useRefresh();

//     const [alertMessage, setAlertMessage] = useState('');
//     const [severity, setSeverity] = useState('');
//     const [alertOpen, setAlertOpen] = useState(false);


//     useEffect(() => {
//         if (selectedResourceId) {
//             console.log("from calendar.js value is ", selectedResourceId);
//             handleGetAllocationByMonth(selectedResourceId);
//         }
//     }, [selectedResourceId]);

//     // useEffect (()=>{
//     //     getAllResources().then(data=>console.log('data',data))
//     //     .catch(err=>console.log('error',err));
//     // })


//     const handleAlertClose = () => {
//         setAlertOpen(false);
//     };

//     const triggerAlert = (message, severity) => {
//         setAlertMessage(message);
//         setSeverity(severity);
//         setAlertOpen(true);
//     };



//     const handleGetAllocationByMonth = (resourceId) => {
//         getAllocationByMonth(resourceId, '2024', '05')
//             .then((data) => {
//                 if (data && data.data) {
//                     // Sort the data by startdate
//                     const sortedData = data.data.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
//                     setAllocationData(sortedData); // Setting the sorted data array directly
//                 }
//                 console.log(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };
//     useEffect(() => {
//         if (refresh) {
//             // Refresh your calendar here
//             console.log('Refreshing calendar...');
//             // Your calendar refresh logic

//             // After refreshing, reset the state
//             resetRefresh();
//             handleGetAllocationByMonth(selectedResourceId);
//         }
//     }, [refresh, resetRefresh, handleGetAllocationByMonth]);



//     const handleSingleAllocation = (dateAllocations, startdate) => {
//         setSelectedDateAllocations(dateAllocations);
//         setStartDate(startdate)
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedDateAllocations([]);
//     };

//     const handleDeleteAllocation = (allocation) => {
//         // console.log('Deleting allocation:', allocation);
//         // console.log('set allocation data', allocationData);
//         // console.log('start date is', startdate);

//         // Find the matching entry in allocationData
//         let outerId = null;
//         allocationData.forEach((data) => {
//             if (data.startdate === startdate) {
//                 outerId = data._id;
//             }
//         });

//         if (!outerId) {
//             console.error('No matching allocation data found for the selected date');
//             triggerAlert('No matching allocation data found for the selected date', 'error');
//             return;
//         }

//         console.log('Found outerId:', outerId);

//         // Perform the deletion logic here (e.g., update the state or make an API call)
//         const updatedAllocations = selectedDateAllocations.filter(item => item._id !== allocation._id);
//         setSelectedDateAllocations(updatedAllocations);

//         setAllocationData(allocationData.map(data => {
//             if (data._id === outerId) {
//                 return {
//                     ...data,
//                     allocationRecords: data.allocationRecords.filter(record => record._id !== allocation._id)
//                 };
//             }
//             return data;
//         }));


//         // Prepare the data for the delete request in the required format
//         const deleteData = {
//             _id: outerId,
//             allocation: {
//                 class: allocation.class,
//                 description: allocation.description,
//                 time: allocation.time,
//                 _id: allocation._id
//             }
//         };

//         console.log('deletion data', deleteData)

//         removeAllocation(JSON.stringify(deleteData))
//             .then(response => {
//                 console.log('Response for delete:', response);
//                 triggerAlert('Successfully deleted allocation', 'success');
//             })
//             .catch(err => {
//                 console.log('Error from delete:', err);
//                 triggerAlert('Failed to delete allocation', 'error');
//             });

//         setSelectedAllocation(null);
//         setOpen(updatedAllocations.length > 0); // Close dialog if no allocations left
//     };

//         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     const getFirstDayOfMonth = (year, month) => {
//         return new Date(year, month, 1).getDay();
//     };

//     const year = 2024;
//     const month = 4; // May (month is zero-indexed in JavaScript Date object)

//     const firstDayOfMonth = getFirstDayOfMonth(year, month);
//     const totalDaysInMonth = new Date(year, month + 1, 0).getDate();



//     return (
//         <div>
//              <div className='days-of-week'>
//                {daysOfWeek.map((day, index) => (
//                     <div key={index} className='day-cell'>
//                         {day}
//                     </div>
//                 ))}
//             </div> 
//             {/* <p>Selected Resource Id is : {selectedResourceId}</p> */}
//             <div className='col-10'>
//                 <div className='grid-container' >
//                     {allocationData.length > 0 ? (
//                         allocationData.map((item, i) => (
//                             <div key={i} className='grid-cell border border-secondary' onClick={() => handleSingleAllocation(item.allocationRecords, item.startdate)} style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
//                                 <h5 style={{ textAlign: "center" }}>{i + 1}</h5>
//                                 <div>
//                                     {item.allocationRecords.map((record, index) => (
//                                         <div key={index} className='border border-primary rounded' style={{ marginBottom: "0.5vh", position: "relative", padding: "0.5vw", marginRight: "0.5vh", marginLeft: "0.5vh" }}>
//                                             {record.class}
//                                             {/* {item.startdate} */}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No allocation data available</p>
//                     )}
//                 </div>
//             </div>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>
//                     Allocation Details
//                 </DialogTitle>
//                 <DialogContent>
//                     {selectedDateAllocations.map((allocation, index) => (
//                         <div key={index} className='border border-primary rounded' style={{ marginBottom: "1vh", position: "relative", padding: "2vw" }}>
//                             <IconButton
//                                 aria-label="delete"
//                                 onClick={() => handleDeleteAllocation(allocation)}
//                                 style={{ position: 'absolute', right: -6, top: -3 }}
//                             >
//                                 <DeleteIcon style={{ color: 'blue' }} />
//                             </IconButton>
//                             <DialogContentText>
//                                 <strong>Description:</strong> {allocation.description}
//                             </DialogContentText>
//                             <DialogContentText>
//                                 <strong>Class:</strong> {allocation.class}
//                             </DialogContentText>
//                             <DialogContentText>
//                                 <strong>Time:</strong> {allocation.time}
//                             </DialogContentText>
//                         </div>
//                     ))}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/*alert */}
//             <Dialog open={alertOpen} onClose={handleAlertClose}>
//                 <Alert severity={severity} onClose={handleAlertClose}>
//                     {alertMessage}
//                 </Alert>
//             </Dialog>
//         </div>
//     );
// };

// export default Calendar;


import React, { useEffect, useState } from 'react';
import './calendar.css';
import { getAllocationByMonth, removeAllocation } from '../actions/resourceAllocationActions';
import { getAllResources } from '../actions/resourceActions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Alert from '@mui/material/Alert';
import { useRefresh } from './RefreshContext';

const Calendar = ({ selectedResourceId }) => {
    const [allocationData, setAllocationData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDateAllocations, setSelectedDateAllocations] = useState([]);
    const [selectedAllocation, setSelectedAllocation] = useState(null);
    const [startdate, setStartDate] = useState('');
    const [resourceType, setResourceType] = useState('');
    const [resourceNo, setResourceNo] = useState('');

    const { refresh, resetRefresh } = useRefresh();

    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const [month, setMonth] = useState(1); // Initial month
    const months = [
        { number: 1, name: 'January' },
        { number: 2, name: 'February' },
        { number: 3, name: 'March' },
        { number: 4, name: 'April' },
        { number: 5, name: 'May' },
        { number: 6, name: 'June' },
        { number: 7, name: 'July' },
        { number: 8, name: 'August' },
        { number: 9, name: 'September' },
        { number: 10, name: 'October' },
        { number: 11, name: 'November' },
        { number: 12, name: 'December' }
    ];

    useEffect(() => {
        if (selectedResourceId) {
            console.log("from calendar.js value is ", selectedResourceId);
            handleGetAllocationByMonth(selectedResourceId);
            handleResourceNames(selectedResourceId);
        }
    }, [selectedResourceId]);

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const triggerAlert = (message, severity) => {
        setAlertMessage(message);
        setSeverity(severity);
        setAlertOpen(true);
    };

    const handleResourceNames = (resourceId) => {
        getAllResources()
            .then(response => {
                const matchedResource = response.data.find(resource => resource._id === resourceId);
                if (matchedResource) {
                    setResourceType(matchedResource.resourceType);
                    setResourceNo(matchedResource.resourceNo);
                } else {
                    console.log('Resource not found for resourceId:', resourceId);
                }
            })
            .catch(err => console.log('Error fetching resources:', err));
    }

    const handleGetAllocationByMonth = (resourceId) => {
        getAllocationByMonth(resourceId, '2024', month)
            .then((data) => {
                console.log('month from get Allocation ',month)
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
            console.log('Refreshing calendar...');
            resetRefresh();
            handleGetAllocationByMonth(selectedResourceId);
        }
    }, [refresh, resetRefresh, handleGetAllocationByMonth]);

    const handleSingleAllocation = (dateAllocations, startdate) => {
        setSelectedDateAllocations(dateAllocations);
        setStartDate(startdate);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDateAllocations([]);
    };

    const handleDeleteAllocation = (allocation) => {
        // Find the matching entry in allocationData
        let outerId = null;
        const formattedStartDate = new Date(startdate);
        formattedStartDate.setDate(formattedStartDate.getDate() + 1);
        const nextDay = formattedStartDate.toISOString().split('T')[0];


        allocationData.forEach((data) => {
            const allocationStartDate = new Date(data.startdate).toISOString().split('T')[0];
            if (allocationStartDate === nextDay) {
                outerId = data._id;
            }
        });

        if (!outerId) {
            console.error('No matching allocation data found for the selected date');
            triggerAlert('No matching allocation data found for the selected date', 'error');
            return;
        }

        console.log('Found outerId:', outerId);

        // Perform the deletion logic here (e.g., update the state or make an API call)
        const updatedAllocations = selectedDateAllocations.filter(item => item._id !== allocation._id);
        setSelectedDateAllocations(updatedAllocations);

        setAllocationData(allocationData.map(data => {
            if (data._id === outerId) {
                return {
                    ...data,
                    allocationRecords: data.allocationRecords.filter(record => record._id !== allocation._id)
                };
            }
            return data;
        }));

        // Prepare the data for the delete request in the required format
        const deleteData = {
            _id: outerId,
            allocation: {
                class: allocation.class,
                description: allocation.description,
                time: allocation.time,
                _id: allocation._id
            }
        };

        console.log('deletion data', deleteData);

        removeAllocation(JSON.stringify(deleteData))
            .then(response => {
                console.log('Response for delete:', response);
                triggerAlert('Successfully deleted allocation', 'success');
            })
            .catch(err => {
                console.log('Error from delete:', err);
                triggerAlert('Failed to delete allocation', 'error');
            });

        setSelectedAllocation(null);
        setOpen(updatedAllocations.length > 0);
    };

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
        console.log('month number', selectedMonth);
        handleGetAllocationByMonth1(selectedResourceId,selectedMonth)
        // Perform any other actions you need when the month changes here
    };

    const handleGetAllocationByMonth1 = (resourceId,month) => {
        getAllocationByMonth(resourceId, '2024', month)
            .then((data) => {
                console.log('month from get Allocation ',month)
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




    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const year = 2024;
    //const month = 4; // May (month is zero-indexed in JavaScript Date object)

    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    return (
        <div>
            {/* <p>Selected Resource Id is : {selectedResourceId}</p> */}
            <div className=' text-center border border-primary mt-2'>
                <h5> Selected Resource is {resourceType} : {resourceNo}
                    <div>
                        <Select value={month} onChange={handleMonthChange}>
                            {months.map((month, index) => (
                                <MenuItem key={index} value={month.number}>{month.name}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </h5>
            </div>
            <div className='days-of-week'>
                {daysOfWeek.map((day, index) => (
                    <div key={index} className='day-cell'>
                        {day}
                    </div>
                ))}
            </div>
            <div className='col-10'>
                <div className='grid-container'>
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={index} className='grid-cell empty-cell'></div>
                    ))}
                    {Array.from({ length: totalDaysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const currentDate = new Date(year, month, day);
                        const allocationsForTheDay = allocationData.find(data => new Date(data.startdate).getDate() === day);
                        const dateAllocations = allocationsForTheDay ? allocationsForTheDay.allocationRecords : [];

                        return (
                            <div key={index} className='grid-cell border border-secondary' onClick={() => handleSingleAllocation(dateAllocations, currentDate.toISOString().split('T')[0])} style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
                                <h5 style={{ textAlign: "center" }}>{day}</h5>
                                <div>
                                    {dateAllocations.map((record, recordIndex) => (
                                        <div key={recordIndex} className='border border-primary rounded' style={{ marginBottom: "0.5vh", position: "relative", padding: "0.5vw", marginRight: "0.5vh", marginLeft: "0.5vh" }}>
                                            {record.class}
                                            {/* {index} */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
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

            <Dialog open={alertOpen} onClose={handleAlertClose}>
                <Alert severity={severity} onClose={handleAlertClose}>
                    {alertMessage}
                </Alert>
            </Dialog>
        </div>
    );
};

export default Calendar;
