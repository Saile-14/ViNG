import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Userpage from './pages/Userpage.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userpage/:id" element={<Userpage />} />
      </Routes>
    </>
      
  );
}

export default App;
