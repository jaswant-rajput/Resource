import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resource from './components/SelectedResource';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="/" element = {<Resource/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
