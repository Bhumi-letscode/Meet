// src/App.jsx
import React, { useState } from 'react';
import { Menu, X, Calendar, User, Settings, Bell } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MeetingProvider } from './MeetingContext';
import LandingPage from './components/LandingPage';
import MeetingInterface from "./components/MeetingInterface";
import IntegrationDashboard from "./components/IntegrationDashboard";





const App = () => {


  return (
    <Router>
      <MeetingProvider>
      
          {/* Main Content */}
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/meeting" element={<MeetingInterface />} />
              <Route path="/dashboard" element={<IntegrationDashboard />} />
              <Route path="/tasks" element={<IntegrationDashboard activeTab="tasks" />} />
              
            </Routes>
          </main>
        
      </MeetingProvider>
    </Router>
  );
};

export default App;
