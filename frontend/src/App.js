import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/calendar';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
