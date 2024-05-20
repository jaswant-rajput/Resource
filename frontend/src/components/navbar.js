import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getAllResources } from '../actions/resourceAllocationActions';
import { createResource } from '../actions/resourceActions';
import { useEffect, useState } from 'react';

export default function ComboBox() {
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [allocationOpen, setAllocationOpen] = useState(false);
  const [singleDayOpen, setSingleDayOpen] = useState(false);
  const [multipleDayOpen, setMultipleDayOpen] = useState(false);
  const [defaultAllocationOpen, setDefaultAllocationOpen] = useState(false);
  const [resourceType, setResourceType] = useState('');
  const [resourceNo, setResourceNo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllResources();
        console.log('data from getAllResources', response);

        if (response && response.data) {
          const transformedData = response.data.map(resource => ({
            label: `${resource.resourceType} - ${resource.resourceNo}`,
            resourceNo: resource.resourceNo,
            resourceType: resource.resourceType
          }));
          setResources(transformedData);
        } else {
          console.error('Invalid data format:', response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
  };


  const handleResourceCreateSave = () => {
    console.log(resourceType);
    console.log(resourceNo);

    createResource({resourceNo,resourceType}).then(data => {
      console.log('Successful resource creation',data)
    }).catch(err =>{
      console.log('error in creating resource',err)
    });
  };

  return (
    <div>
      <div>
        <button type="button" className="btn btn-primary rounded-pill" style={{ width: '16vw', marginBottom: '1.2vw', marginTop: '0.8vw' }} onClick={handleOpen}>
          Create
        </button>
      </div>

      <Autocomplete disablePortal id="combo-box-demo" options={resources} sx={{ marginRight: '0.5vw', marginLeft: '0.5vw' }}
        renderInput={(params) => <TextField {...params} label="Resources" />}
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
              <Button onClick={handleAllocationOpen}>Allocation</Button>
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
              <Button onClick={handleSingleDayOpen}>Single Day Allocation</Button>
            </li>
            <br></br>
            <li>
              <Button onClick={handleMultipleDayOpen}>Multiple Day Allocation</Button>
            </li>
            <br></br>
            <li>
              <Button onClick={handleDefaultAllocationOpen}>Set Default Allocation</Button>
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllocationClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={singleDayOpen} onClose={handleSingleDayClose}>
        <DialogTitle>Single Day Allocation</DialogTitle>
        <DialogContent>
          {/* Add your single day allocation components here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSingleDayClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={multipleDayOpen} onClose={handleMultipleDayClose}>
        <DialogTitle>Multiple Day Allocation</DialogTitle>
        <DialogContent>
          {/* Add your multiple day allocation components here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMultipleDayClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={defaultAllocationOpen} onClose={handleDefaultAllocationClose}>
        <DialogTitle>Set Default Allocation</DialogTitle>
        <DialogContent>
          {/* Add your default allocation components here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDefaultAllocationClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

