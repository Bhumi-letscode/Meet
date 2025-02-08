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

  // Demo meeting content
  const demoMeeting = [
    { time: 2000, speaker: "John", content: "Let's begin our quarterly review meeting." },
    { time: 5000, speaker: "Sarah", content: "I've prepared the sales figures for Q3." },
    { time: 8000, speaker: "Mike", content: "Our conversion rate has improved by 15%." },
    { time: 12000, speaker: "John", content: "That's great news! What drove this improvement?" },
    { time: 15000, speaker: "Sarah", content: "The new marketing campaign was particularly effective." }
  ];

  // Simulated AI analysis
  const generateAnalysis = (content) => {
    const analysisTypes = [
      { type: 'key_point', icon: '🎯', content: `Key point identified: ${content}` },
      { type: 'action_item', icon: '✅', content: `Action item: Follow up on ${content}` },
      { type: 'sentiment', icon: '😊', content: `Positive discussion about ${content}` }
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
        setAnalysis(prev => [...prev, {
          timestamp: new Date().toLocaleTimeString(),
          speaker,
          content,
          analysis: generateAnalysis(content)
        }]);
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
      <div className="flex-1 flex">
        {/* Meeting View */}
        <div className="flex-1 p-6 border-r">
          <div className="bg-white rounded-xl h-full flex flex-col">
            {!isJoined ? (
              <div className="flex-1 flex items-center justify-center">
                <button
                  onClick={joinMeeting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Bot className="h-5 w-5" />
                  <span>Join Meeting as Bot</span>
                </button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center relative">
                <div className={`transition-all duration-500 ${
                  botState === 'joining' ? 'scale-50 opacity-50' : 'scale-100 opacity-100'
                }`}>
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className={`h-16 w-16 text-blue-600 ${
                      botState === 'active' ? 'animate-pulse' : ''
                    }`} />
                  </div>
                  <div className="text-center mt-4 text-gray-600">
                    {botState === 'joining' ? 'Joining meeting...' : 'Listening...'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="w-96 bg-white p-6 overflow-y-auto">
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-lg">Real-time Analysis</h2>
          </div>
          
          <div className="space-y-4">
            {analysis.map((item, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 rounded-lg animate-fadeIn"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{item.speaker}</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-3">{item.content}</p>
                <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                  <span>{item.analysis.icon}</span>
                  <span>{item.analysis.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingInterface;