// src/pages/LandingPage.jsx
import React, { useState } from "react";
import {
  Sparkle,
  Calendar,
  ChatCircleText,
  Clock,
  CaretRight,
  VideoCamera,
  Users,
  Globe,
  ChartBar,
  SignOut,
  ArrowLeft,
} from "@phosphor-icons/react";
import MeetingInterface from "./MeetingInterface";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("join");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingJoined, setMeetingJoined] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" or "summary"
  const [selectedMeeting, setSelectedMeeting] = useState(null);


  const platforms = [
    {
      name: "Zoom",
      pattern: /zoom.us/,
      icon: <VideoCamera size={24} weight="duotone" />,
    },
    {
      name: "Google Meet",
      pattern: /meet.google/,
      icon: <Users size={24} weight="duotone" />,
    },
    {
      name: "Microsoft Teams",
      pattern: /teams.microsoft/,
      icon: <Users size={24} weight="duotone" />,
    },
    { name: "Other", pattern: /.*/, icon: <Globe size={24} weight="duotone" /> },
  ];

  const features = [
    {
      icon: <Calendar size={32} weight="duotone" className="text-blue-600" />,
      title: "Auto Meeting Join",
      description:
        "Never miss a meeting with smart calendar integration and one-click join.",
    },
    {
      icon: (
        <ChatCircleText size={32} weight="duotone" className="text-blue-600" />
      ),
      title: "Smart Summaries",
      description: "Get AI-generated meeting notes and action items instantly.",
    },
    {
      icon: <Clock size={32} weight="duotone" className="text-blue-600" />,
      title: "Follow-up Automation",
      description: "Automate task creation and follow-ups across your tools.",
    },
  ];

  const recentMeetings = [
    {
      id: 1,
      title: "Weekly Standup",
      date: "2025-02-08",
      duration: "45min",
      attendees: 8,
    },
    {
      id: 2,
      title: "Product Review",
      date: "2025-02-07",
      duration: "60min",
      attendees: 12,
    },
    {
      id: 3,
      title: "Client Meeting",
      date: "2025-02-06",
      duration: "30min",
      attendees: 5,
    },
  ];

  const integrations = [
    {
      name: "Slack",
      icon: <ChatCircleText size={24} weight="duotone" />,
      status: "connected",
      description: "Post meeting summaries to channels automatically",
    },
    {
      name: "Trello",
      icon: <ChartBar size={24} weight="duotone" />,
      status: "disconnected",
      description: "Create cards for action items and tasks",
    },
    {
      name: "Notion",
      icon: <Globe size={24} weight="duotone" />,
      status: "connected",
      description: "Save meeting notes and summaries",
    },
  ];

  const meetingSummaries = {
    1: {
      summary:
        "Discussed sprint progress. Team reported 80% completion. Blockers identified in API integration. Action items: Schedule tech review, Update documentation.",
      action_items: [
        "Schedule technical review meeting",
        "Update API documentation",
        "Follow up on pending PRs",
      ],
    },
    2: {
      summary:
        "Product review meeting covered new feature rollout. User feedback positive. Need to address performance concerns. Action items: Optimize loading time, Prepare release notes.",
      action_items: [
        "Optimize page load performance",
        "Draft release notes",
        "Schedule user testing",
      ],
    },
    3: {
      summary:
        "Client presented new requirements. Timeline discussed and approved. Next steps include resource allocation and sprint planning.",
      action_items: [
        "Create project timeline",
        "Allocate resources",
        "Schedule sprint planning",
      ],
    },
  };

  const SummaryView = ({ meeting, onBack }) => (
    <div className="space-y-6 animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Meetings
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold">{meeting.title}</h2>
          <div className="flex items-center space-x-4 mt-2 text-gray-600">
            <span>{meeting.date}</span>
            <span>•</span>
            <span>{meeting.duration}</span>
            <span>•</span>
            <span>{meeting.attendees} attendees</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Meeting Overview</h3>
            <p className="text-gray-600 leading-relaxed">
              {meetingSummaries[meeting.id].summary}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Action Items</h3>
            <div className="space-y-3">
              {meetingSummaries[meeting.id].action_items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-blue-50 p-4 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <ChatCircleText size={20} />
                <span>Share with Team</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChartBar size={20} />
                <span>Export Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {viewMode === "list" ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Meetings</h3>
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id}>
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-gray-500">
                      {meeting.date} • {meeting.duration} • {meeting.attendees}{" "}
                      attendees
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMeeting(meeting);
                      setViewMode("summary");
                    }}
                    className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    View Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SummaryView
          meeting={selectedMeeting}
          onBack={() => {
            setViewMode("list");
            setSelectedMeeting(null);
          }}
        />
      )}
    </div>
  );

  const IntegrationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Platform Integrations</h2>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-sm text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg ${
                  integration.status === "connected"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {integration.status === "connected" ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Calendar size={24} weight="duotone" className="text-blue-600" />
              <span className="ml-2 text-xl font-semibold">MeetAI Dashboard</span>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <SignOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["join", "integrations", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setViewMode("list");
                    setSelectedMeeting(null);
                  }}
                  className={`${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>


        {activeTab === "join" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Join a Meeting</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="Paste your meeting link"
                className="w-800 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={()=>{
                setMeetingJoined(true); }}>
                Join
              </button>
              <div className="flex flex-wrap gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    {platform.icon}
                    <span className="ml-2">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && <IntegrationsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </main>
    </div>
  );
  if (meetingJoined) {
    return <MeetingInterface/>;
  }
  if (isLoggedIn) {
    return <Dashboard />;
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Sparkle size={28} weight="duotone" className="text-blue-600" />
              <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                MeetAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLoggedIn(true)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Your AI-Powered Meeting Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Transform your meetings with automated summaries, smart follow-ups, and
            seamless integrations. Experience the future of meeting productivity.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              Start Free Trial
              <CaretRight size={20} className="ml-2" />
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              Watch Demo
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
            Get Started Free
            <CaretRight size={20} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};



export default LandingPage;
