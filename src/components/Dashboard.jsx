import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, MessageSquare, PlusCircle, Trash2, Edit } from 'lucide-react';
import Card from './ui/Card';
import MeetingModal from './MeetingModal';
import { useMeetings } from '../MeetingContext';

const Dashboard = () => {
  const { state, deleteMeeting } = useMeetings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);

  const handleNewMeeting = () => {
    setEditMeeting(null);
    setIsModalOpen(true);
  };

  const handleEditMeeting = (meeting) => {
    setEditMeeting(meeting);
    setIsModalOpen(true);
  };

  const todayMeetings = state.meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    const today = new Date();
    return (
      meetingDate.getDate() === today.getDate() &&
      meetingDate.getMonth() === today.getMonth() &&
      meetingDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meeting Assistant</h1>
          <p className="text-gray-500 mt-2">Manage your meetings efficiently</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card title="Quick Actions" className="col-span-full md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={handleNewMeeting}
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Video className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">New Meeting</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Calendar className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-900">Schedule</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-900">Join Meeting</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <MessageSquare className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-900">Chat</span>
              </button>
            </div>
          </Card>

          {/* Upcoming Meetings */}
          <Card 
            title="Upcoming Meetings" 
            subtitle="Today's schedule"
            action={
              <button 
                onClick={handleNewMeeting}
                className="text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            }
            className="col-span-full md:col-span-2 lg:col-span-1"
          >
            <div className="space-y-4">
              {todayMeetings.map(meeting => (
                <div key={meeting.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="mr-4">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{meeting.title}</h4>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-xs text-gray-500">{meeting.time}</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        {meeting.participants}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditMeeting(meeting)}
                      className="p-2 text-gray-400 hover:text-blue-500"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteMeeting(meeting.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      {meeting.type === 'video' ? <Video className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Meeting Stats */}
          <Card title="Meeting Stats" className="col-span-full md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Today's Meetings</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{state.stats.todayMeetings}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Total Duration</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{state.stats.totalDuration}h</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Participants</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{state.stats.totalParticipants}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Pending Actions</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{state.stats.pendingActions}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <MeetingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditMeeting(null);
        }}
        editMeeting={editMeeting}
      />
    </div>
  );
};

export default Dashboard;