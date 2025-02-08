import React, { useState, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, Bot, Activity,
  Mic, MicOff, Video, VideoOff, Volume2, VolumeX
} from 'lucide-react';

const MeetingInterface = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [analysis, setAnalysis] = useState([]);
  const [botState, setBotState] = useState('idle');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [transcriptEnabled, setTranscriptEnabled] = useState(true);
  const [messages, setMessages] = useState([]);

  // Extended demo meeting content
  const demoMeeting = [
    { time: 2000, speaker: "John", content: "Let's begin our quarterly review meeting." },
    { time: 5000, speaker: "Sarah", content: "I've prepared the sales figures for Q3." },
    { time: 8000, speaker: "Mike", content: "Our conversion rate has improved by 15%." },
    { time: 12000, speaker: "John", content: "That's great news! What drove this improvement?" },
    { time: 15000, speaker: "Sarah", content: "The new marketing campaign was particularly effective." },
    { time: 18000, speaker: "Mike", content: "Especially the social media ads we ran last month." },
    { time: 21000, speaker: "John", content: "Could we scale that campaign for Q4?" },
    { time: 24000, speaker: "Sarah", content: "Yes, I've already drafted a proposal for that." }
  ];

  // Enhanced AI analysis
  const generateAnalysis = (content) => {
    const analysisTypes = [
      { type: 'key_point', icon: '🎯', content: `Key point identified: ${content}`, priority: 'high' },
      { type: 'action_item', icon: '✅', content: `Action item: Follow up on ${content}`, priority: 'medium' },
      { type: 'sentiment', icon: '😊', content: `Positive discussion about ${content}`, priority: 'low' },
      { type: 'decision', icon: '⚡', content: `Decision made regarding ${content}`, priority: 'high' },
      { type: 'question', icon: '❓', content: `Question raised about ${content}`, priority: 'medium' }
    ];
    return analysisTypes[Math.floor(Math.random() * analysisTypes.length)];
  };

  const joinMeeting = () => {
    setIsJoined(true);
    setBotState('joining');
    setTimeout(() => setBotState('active'), 2000);

    // Simulate meeting progression
    demoMeeting.forEach(({ time, speaker, content }) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { speaker, content, timestamp: new Date().toLocaleTimeString() }]);
        
        // Generate 1-2 analysis points for each message
        const numAnalysis = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numAnalysis; i++) {
          setAnalysis(prev => [...prev, {
            timestamp: new Date().toLocaleTimeString(),
            speaker,
            content,
            analysis: generateAnalysis(content)
          }]);
        }
      }, time);
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">MeetAI Assistant</span>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {audioEnabled ? <Mic /> : <MicOff />}
          </button>
          <button 
            onClick={() => setVideoEnabled(!videoEnabled)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {videoEnabled ? <Video /> : <VideoOff />}
          </button>
          <button 
            onClick={() => setTranscriptEnabled(!transcriptEnabled)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {transcriptEnabled ? <Volume2 /> : <VolumeX />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {!isJoined ? (
          <div className="col-span-3 flex items-center justify-center">
            <button
              onClick={joinMeeting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Bot className="h-5 w-5" />
              <span>Join Meeting as Bot</span>
            </button>
          </div>
        ) : (
          <>
            {/* Meeting Transcript */}
            <div className="col-span-2 bg-white rounded-xl p-6 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold text-lg">Meeting Transcript</h2>
              </div>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {message.speaker[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{message.speaker}</span>
                        <span className="text-sm text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="bg-white rounded-xl p-6 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-6">
                <Activity className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold text-lg">Real-time Analysis</h2>
              </div>
              
              <div className="space-y-4">
                {analysis.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg animate-fadeIn ${
                      item.analysis.priority === 'high' ? 'bg-red-50' :
                      item.analysis.priority === 'medium' ? 'bg-yellow-50' :
                      'bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>{item.speaker}</span>
                      <span>{item.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-lg">{item.analysis.icon}</span>
                      <span className={`${
                        item.analysis.priority === 'high' ? 'text-red-600' :
                        item.analysis.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {item.analysis.content}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingInterface;