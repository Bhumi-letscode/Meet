// src/components/PlatformIntegration.jsx
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import IntegrationDashboard from "./IntegrationDashboard";

const PlatformIntegration = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const platforms = [
    {
      id: "slack",
      name: "Slack",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
      color: "#4A154B",
    },
    {
      id: "trello",
      name: "Trello",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
      color: "#0052CC",
    },
    {
      id: "jira",
      name: "Jira",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      color: "#0052CC",
    },
    {
      id: "teams",
      name: "Teams",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
      color: "#6264A7",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (selectedPlatform) {
    return (
      <IntegrationDashboard
        platform={selectedPlatform}
        onBack={() => setSelectedPlatform(null)}
      />
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Your Meeting Hub
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect and streamline your workflow with our integrated tools
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200"
        >
          Integrated Tools
        </motion.h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              variants={itemVariants}
              onClick={() => setSelectedPlatform(platform)}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="w-12 h-12 object-contain"
                />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {platform.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1 duration-200" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformIntegration;
