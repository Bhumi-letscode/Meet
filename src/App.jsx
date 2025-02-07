import React, { useState } from 'react';
import { Menu, X, Settings, Bell, Search, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { MeetingProvider, useMeetings } from './MeetingContext';
import LandingPage from './components/LandingPage';

// Create a separate SearchBar component for better organization
const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMeetings();

  return (
    <div className="w-full max-w-lg lg:max-w-xs ml-8">
      <label htmlFor="search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="search"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search meetings, participants..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

// Create a separate NavigationBar component
const NavigationBar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          

          {/* Search Bar */}
          <div className="hidden md:flex flex-3 px-5">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center">
            <button 
              className="p-2 text-gray-400 hover:text-gray-500 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <button 
                className="flex items-center max-w-xs bg-gray-100 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Create a separate Sidebar component
const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-40 md:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}>
        <div className="absolute inset-0">
          <div className="bg-white w-64 min-h-screen">
            <div className="pt-5 pb-4">
              <div className="flex items-center justify-between px-4">
                <div className="text-xl font-bold text-blue-600">MeetAssist</div>
                <button
                  onClick={onClose}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {/* Add your sidebar navigation items here */}
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Dashboard</a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">My Meetings</a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Calendar</a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Team</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <MeetingProvider>
      <div className="min-h-screen bg-gray-100">
        <NavigationBar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="pt-16">
          <LandingPage />
        </main>
      </div>
    </MeetingProvider>
  );
};

export default App;