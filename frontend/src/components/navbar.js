import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getAllResources, createResource } from '../actions/resourceActions';
import { addAllocation, getAllocationByMonth } from '../actions/resourceAllocationActions';
import { useEffect, useState } from 'react';
// const { ObjectId } = require('mongoose').Types;
import { ObjectId } from 'bson';


const Navbar = ({ onResourceSelect }) => {
  const [open, setOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [allocationOpen, setAllocationOpen] = useState(false);
  const [multipleDayOpen, setMultipleDayOpen] = useState(false);
  const [defaultAllocationOpen, setDefaultAllocationOpen] = useState(false);

  const [resources, setResources] = useState([]);
  const [resourceType, setResourceType] = useState('');
  const [resourceNo, setResourceNo] = useState('');
  const [resourceId, setResourceId] = useState('');



  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);


  const [singleDayOpen, setSingleDayOpen] = useState(false);
  const [date, setDate] = useState('');
  const [classInput, setClassInput] = useState('');
  const [description, setDescription] = useState('');
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [time, setTime] = useState('');


  const fetchData = async () => {
    try {
      const response = await getAllResources();
      console.log('data from getAllResources', response);

      if (response && response.data) {
        const transformedData = response.data.map(resource => ({
          label: `${resource.resourceType} - ${resource.resourceNo}`,
          resourceNo: resource.resourceNo,
          resourceType: resource.resourceType,
          _id: resource._id,
        }
      ));
        setResources(transformedData); // Make sure this updates the state correctly
      } else {
        console.error('Invalid data format:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated Resource Type:', resourceType);
    console.log('Updated Resource No:', resourceNo);
  }, [resourceType, resourceNo]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResourceOpen = () => {
    setResourceOpen(true);
    setOpen(false); // Close the first modal
  };

  const handleResourceClose = () => {
    setResourceOpen(false);
  };

  const handleAllocationOpen = () => {
    setAllocationOpen(true);
    setOpen(false); // Close the first modal
  };

  const handleAllocationClose = () => {
    setAllocationOpen(false);
  };

  const handleSingleDayOpen = () => {
    setSingleDayOpen(true);
    setAllocationOpen(false);
  };

  const handleSingleDayClose = () => {
    setSingleDayOpen(false);
  };

  const handleMultipleDayOpen = () => {
    setMultipleDayOpen(true);
    setAllocationOpen(false);
  };

  const handleMultipleDayClose = () => {
    setMultipleDayOpen(false);
  };

  const handleDefaultAllocationOpen = () => {
    setDefaultAllocationOpen(true);
    setAllocationOpen(false);
  };

  const handleDefaultAllocationClose = () => {
    setDefaultAllocationOpen(false);
  };

  const handleResourceTypeChange = (event) => {
    setResourceType(event.target.value);
    console.log('resourceType', resourceType);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const triggerAlert = (message, severity) => {
    setAlertMessage(message);
    setSeverity(severity);
    setAlertOpen(true);
  };


  const handleCombinedChange = (resource) => {
    if (resource) {
      logSelectedResourceId(resource);
      handleResourceSelection(resource);
    }
  }

  const logSelectedResourceId = (resource) => {
    if (resource) {
      console.log('resource', resource)
      onResourceSelect(resource._id);
      setResourceId(resource._id);
      console.log('Selected Resource ID:', resource._id);
      console.log('Selected Resource label:', resource.label);
      console.log('Selected Resource Type:', resource.resourceType);
      console.log('Selected Resource No:', resource.resourceNo);
    } else {
      console.log('No resource selected');
    }
  };

  const handleResourceSelection = (resource) => {
    if (resource) {
      setResourceType(resource.resourceType);
      setResourceNo(resource.resourceNo);
      // console.log("resource no",resourceNo)
      // console.log('resource type',resourceType)
    }
  }


  const handleResourceCreateSave = async () => {
    console.log('Checking if resource exists:', { resourceNo, resourceType });

    await fetchData(); // Ensure we have the latest data

    const resourceExists = resources.some(
      resource => resource.resourceNo.toString() === resourceNo.toString() && resource.resourceType === resourceType
    );
    console.log('resourceExists is', resourceExists, 'and its type is', typeof resourceExists);

    if (resourceExists) {
      console.log('Resource combination exists:', { resourceNo, resourceType });
      triggerAlert('This resource combination already exists.', 'error');
      return;
    }

    try {
      const data = await createResource({ resourceNo, resourceType });
      console.log('Successful resource creation', data);
      triggerAlert('Successfully Created Resource', 'success')
      fetchData();
      handleResourceClose();
    } catch (err) {
      console.log('Error in creating resource', err);
      triggerAlert('Failed to create resource.');
    }

    setResourceType('');
    setResourceNo('');
  };

  dayjs.extend(localizedFormat);


  // const handleSingleDayAllocation = () => {
  //   // Implement the logic to save the single day allocation
  //   let temptime = `${starttime} - ${endtime}`;
  //   const formattedDate = new Date(date).toISOString(); // Convert date string to ISO string format

  //   console.log("start time", starttime);
  //   console.log('end time', endtime);

  //   setTime(temptime);
  //   console.log({
  //     resourceType,
  //     resourceNo,
  //     dates: [formattedDate],
  //     class: classInput,
  //     description,
  //     formattedtime
  //   });
  //   handleSingleDayClose();
  // };

  const handleSingleDayAllocation =  () => {
    // Implement the logic to save the single day allocation
    const formattedStartTime = starttime.format('h:mm A');
    const formattedEndTime = endtime.format('h:mm A');
    const tempformattedTime = `${formattedStartTime} - ${formattedEndTime}`;

    // Format the date to ISO string with timezone offset set to zero (UTC)
    const formattedDate = new Date(date).toISOString();

    setTime(tempformattedTime);
    const objectId = new ObjectId(resourceId);
    console.log("object id ",objectId)

    console.log({
      resourceObjectId: resourceId,
      dates: [formattedDate],
      allocation: {                            
        class: classInput,
        description: description,
        time: tempformattedTime
      }
    });
    const allocationData = {
      resourceObjectId: resourceId,
      dates: [formattedDate],
      allocation: {
        class: classInput,
        description: description,
        time: tempformattedTime
      }
    };

    addAllocation(JSON.stringify(allocationData))
      .then(response => {
        console.log('Response from add allocation', response);
      })
      .catch(err => {
        console.error('Failed to add allocation:', err);
      });

   

    // addAllocation( JSON.stringify({
    //   resourceObjectId: objectId,
    //   dates: [formattedDate],
    //   allocation: {
    //     class: classInput,
    //     description: description,
    //     time: tempformattedTime
    //   }
    // }) )
    //   .then(response => {
    //     console.log('Response from add allocation', response);
    //   })
    //   .catch(err => {
    //     console.error('Failed to add allocation:', err);
    //   });

    handleSingleDayClose();
  };

  return (
    <div>
      <div>
        <button type="button" className="btn btn-primary rounded-pill" style={{ width: '16vw', marginBottom: '1.2vw', marginTop: '0.8vw' }} onClick={handleOpen}>
          Create
        </button>
      </div>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={resources}
        getOptionLabel={(option) => `${option.resourceType} - ${option.resourceNo}`}
        sx={{ marginRight: '0.5vw', marginLeft: '0.5vw' }}
        renderInput={(params) => <TextField {...params} label="Resources" />}
        onChange={(event, value) => handleCombinedChange(value)}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select an Option</DialogTitle>
        <DialogContent>
          <ul>
            <li>
              <Button onClick={handleResourceOpen}>Resource</Button>
            </li>
            <br></br>
            <li>
              <Button onClick={handleAllocationOpen}>Event</Button>
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resourceOpen} onClose={handleResourceClose}>
        <DialogTitle>Resource Modal</DialogTitle>
        <DialogContent>
          <Select value={resourceType} onChange={handleResourceTypeChange} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              Resource Type
            </MenuItem>
            <MenuItem value="classroom">Classroom</MenuItem>
            <MenuItem value="lab">Lab</MenuItem>
            <MenuItem value="seminar hall">Seminar Hall</MenuItem>
          </Select>
          <br />
          <TextField
            margin="dense"
            label="Resource Number"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setResourceNo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResourceCreateSave}>Save</Button>
          <Button onClick={handleResourceClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={allocationOpen} onClose={handleAllocationClose}>
        <DialogTitle>Allocation Modal</DialogTitle>
        <DialogContent>
          <ul>
            <li>
              <Button onClick={handleSingleDayOpen}>Single Day Event</Button>
            </li>
            <br></br>
            <li>
              <Button onClick={handleMultipleDayOpen}>Multiple Day Event</Button>
            </li>
            <br></br>
            <li>
              <Button onClick={handleDefaultAllocationOpen}>Set Default Event</Button>
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllocationClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={singleDayOpen} onClose={handleSingleDayClose}>
        <DialogTitle>Single Day Event</DialogTitle>
        <DialogContent>
          <p>Allocation is being changed for {resourceType} : {resourceNo}</p>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Class"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="From Time"
                fullWidth
                onChange={(newTime) => setStartTime(newTime)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="To Time"
                fullWidth
                onChange={(newTime) => setEndTime(newTime)}
              />
            </DemoContainer>
          </LocalizationProvider>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleSingleDayAllocation} color="primary">
            Save
          </Button>
          <Button onClick={handleSingleDayClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={multipleDayOpen} onClose={handleMultipleDayClose}>
        <DialogTitle>Multiple Day Event</DialogTitle>
        <DialogContent>
          {/* Add your multiple day allocation components here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMultipleDayClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={defaultAllocationOpen} onClose={handleDefaultAllocationClose}>
        <DialogTitle>Set Default Event</DialogTitle>
        <DialogContent>
          {/* Add your default allocation components here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDefaultAllocationClose}>Close</Button>
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

}


export default Navbar