import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Ensure Navbar is imported
import Profile from './components/Profile'; // Ensure Profile is imported
import Map from './components/Map';  // Ensure Map is imported
import Queue from './components/Queue';  // Ensure Queue component is present

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Ensure Navbar uses <Link> only inside Router */}
      <Routes>
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/map" element={<Map />} />
        {/* <Route path="/queue" element={<Queue />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
