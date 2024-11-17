import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import DpAnalysis from './DpAnalysis.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dpanalysis" element={<DpAnalysis />} />
      </Routes>
    </Router>
    // Ramya-->Don't connect the analysis page to the button yet, once Varun and Pranav are done with their 
    // work, connect
  );
}

export default App;


