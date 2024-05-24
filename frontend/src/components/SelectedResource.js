import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Calendar from './calendar';
import { getAllResources } from '../actions/resourceActions';

const App = () => {
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  const handleResourceSelect = (resourceId) => {
    setSelectedResourceId(resourceId);
  };

  useEffect (()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      const response = await getAllResources();
      console.log('data from getAllResources hdfdah', response);
      setSelectedResourceId(response.data[0]._id);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    // <div>
    //   <Navbar onResourceSelect={handleResourceSelect} />
    //   <Calendar selectedResourceId={selectedResourceId} />
    // </div>
    <div>
            {/* <p>Selected Resource Id is : {selectedResourceId}</p> */}
            <div className='card ' style={{ border: 'none', height: '100vh' }}>
                <div className='d-flex flex-wrap justify-content-around align-items-stretch h-100'>
                    <div className='col-2'>
                        <Navbar onResourceSelect={handleResourceSelect} />
                    </div>
                     <Calendar selectedResourceId={selectedResourceId} />
                </div>
                
            </div>
           
        </div>
  );
};

export default App;
