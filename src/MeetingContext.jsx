import React, { createContext, useContext, useState, useReducer } from 'react';

const MeetingContext = createContext();

const initialState = {
  meetings: [
    {
      id: 1,
      title: 'Team Standup',
      time: '10:00 AM',
      participants: 8,
      type: 'video',
      date: new Date().toISOString(),
      duration: 30,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '2:30 PM',
      participants: 5,
      type: 'in-person',
      date: new Date().toISOString(),
      duration: 60,
      status: 'upcoming'
    }
  ],
  stats: {
    todayMeetings: 4,
    totalDuration: 3.5,
    totalParticipants: 12,
    pendingActions: 7
  },
  notifications: []
};

function meetingReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEETING':
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
        stats: {
          ...state.stats,
          todayMeetings: state.stats.todayMeetings + 1,
          totalParticipants: state.stats.totalParticipants + action.payload.participants,
          totalDuration: state.stats.totalDuration + (action.payload.duration / 60)
        }
      };
    case 'DELETE_MEETING':
      const meetingToDelete = state.meetings.find(m => m.id === action.payload);
      return {
        ...state,
        meetings: state.meetings.filter(meeting => meeting.id !== action.payload),
        stats: {
          ...state.stats,
          todayMeetings: state.stats.todayMeetings - 1,
          totalParticipants: state.stats.totalParticipants - meetingToDelete.participants,
          totalDuration: state.stats.totalDuration - (meetingToDelete.duration / 60)
        }
      };
    case 'UPDATE_MEETING':
      return {
        ...state,
        meetings: state.meetings.map(meeting =>
          meeting.id === action.payload.id ? action.payload : meeting
        )
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    default:
      return state;
  }
}

export function MeetingProvider({ children }) {
  const [state, dispatch] = useReducer(meetingReducer, initialState);
  const [searchQuery, setSearchQuery] = useState('');

  const addMeeting = (meeting) => {
    const newMeeting = {
      ...meeting,
      id: Date.now(),
      status: 'upcoming'
    };
    dispatch({ type: 'ADD_MEETING', payload: newMeeting });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        message: `New meeting "${meeting.title}" scheduled`,
        type: 'success'
      }
    });
  };

  const deleteMeeting = (id) => {
    dispatch({ type: 'DELETE_MEETING', payload: id });
  };

  const updateMeeting = (meeting) => {
    dispatch({ type: 'UPDATE_MEETING', payload: meeting });
  };

  const value = {
    state,
    addMeeting,
    deleteMeeting,
    updateMeeting,
    searchQuery,
    setSearchQuery
  };

  return (
    <MeetingContext.Provider value={value}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeetings() {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetings must be used within a MeetingProvider');
  }
  return context;
}