import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import './App.css';

import PresentToBe from './components/PresentToBe';
import PastToBe from './components/PastToBe';
import FutureToBe from './components/FutureToBe';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className='menu'>
            <li>
              <Link to="/present">Present</Link>
            </li>
            <li>
              <Link to="/past">Past</Link>
            </li>
            <li>
              <Link to="/future">Future</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/present" element={<PresentToBe />} />
          <Route path="/past" element={<PastToBe />} />
          <Route path="/future" element={<FutureToBe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;