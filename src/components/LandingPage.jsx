import React from 'react';
import { Sparkles, Calendar, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">MeetAI</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Login</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6">
        {/* Hero Content */}
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your AI-Powered Meeting Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your meetings with automated summaries, smart follow-ups, and seamless integrations.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
          {[
            {
              icon: <Calendar className="h-6 w-6 text-blue-600" />,
              title: "Auto Meeting Join",
              description: "Never miss a meeting with smart calendar integration and one-click join."
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
              title: "Smart Summaries",
              description: "Get AI-generated meeting notes and action items instantly."
            },
            {
              icon: <Clock className="h-6 w-6 text-blue-600" />,
              title: "Follow-up Automation",
              description: "Automate task creation and follow-ups across your tools."
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Works With Your Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {['Slack', 'Trello', 'Jira', 'Teams'].map((tool) => (
              <button
                key={tool}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* Meeting Link Input */}
        <div className="max-w-xl mx-auto py-16">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Paste your meeting link"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Join
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Meetings?</h2>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started Free
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;