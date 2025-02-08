import React, { useState } from 'react';
import { 
  Calendar, CheckSquare, Clock,
  ArrowRight, Users, ArrowLeft
} from 'lucide-react';

const IntegrationDashboard = ({ platform, onBack }) => {
  const [activeTab, setActiveTab] = useState('meetings');

  const previousMeetings = [
    {
      id: 1,
      title: `${platform.name} - Q3 Review`,
      date: "2025-02-01",
      summary: "Discussed quarterly performance, set new targets",
      tasks: ["Update sales forecast", "Prepare Q4 strategy"]
    },
    {
      id: 2,
      title: `${platform.name} - Product Sprint Planning`,
      date: "2025-02-05",
      summary: "Planned next sprint deliverables",
      tasks: ["Review PRs", "Update documentation"]
    }
  ];

  const upcomingMeetings = [
    {
      id: 3,
      title: `${platform.name} - Team Sync`,
      date: "2025-02-10",
      time: "10:00 AM",
      participants: ["John", "Sarah", "Mike"]
    },
    {
      id: 4,
      title: `${platform.name} - Client Presentation`,
      date: "2025-02-12",
      time: "2:00 PM",
      participants: ["Client Team", "Sales Team"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Dashboard Header */}
        <div className="border-b p-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Platforms
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{platform.name} Dashboard</h2>
              <p className="text-gray-600">View your meetings and activities from {platform.name}</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">
              Connected
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="border-b">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            {[
              { id: 'meetings', icon: Calendar, label: 'Meetings' },
              { id: 'upcoming', icon: Clock, label: 'Upcoming' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === 'meetings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Previous Meetings</h3>
              <div className="grid gap-4">
                {previousMeetings.map(meeting => (
                  <div key={meeting.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <span className="text-sm text-gray-500">{meeting.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{meeting.summary}</p>
                    <div className="space-y-2">
                      {meeting.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckSquare className="h-4 w-4 mr-2 text-blue-500" />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Upcoming Meetings</h3>
              <div className="grid gap-4">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{meeting.title}</h4>
                        <p className="text-sm text-gray-500">
                          {meeting.date} at {meeting.time}
                        </p>
                      </div>
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                        Join
                      </button>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {meeting.participants.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationDashboard;