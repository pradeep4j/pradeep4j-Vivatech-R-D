import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import GetallTask from './Components/GetallTask';
import AddTask from './Components/AddTask';
import EditTasks from './Components/EditTasks';
import NotFound from './Components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all" element={<GetallTask />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTasks />} />
        <Route component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
