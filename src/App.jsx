// src/App.jsx
import React, { useState } from 'react';
import { Menu, X, Calendar, User, Settings, Bell } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MeetingProvider } from './MeetingContext';
import LandingPage from './components/LandingPage';
import MeetingInterface from "./components/MeetingInterface";

const App = () => {


  return (
    <Router>
      <MeetingProvider>
      
          {/* Main Content */}
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/meeting" element={<MeetingInterface />} />

              
            </Routes>
          </main>
        
      </MeetingProvider>
    </Router>
  );
};

export default App;