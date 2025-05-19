import React from "react";
import { FaCrown, FaUsers, FaCoins, FaChartLine, FaChevronRight, FaStar, FaFire } from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";

const teamLevels = [
  { 
    id: 1, 
    level: "LV1", 
    members: 5, 
    percent: 25, 
    income: 1250,
    color: "bg-gradient-to-r from-amber-500 to-amber-600",
    icon: <FaCrown className="text-2xl text-amber-200"/>,
    highlight: false
  },
  { 
    id: 2, 
    level: "LV2", 
    members: 12, 
    percent: 3, 
    income: 840,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    icon: <FaUsers className="text-2xl text-purple-200"/>,
    highlight: false
  },
  { 
    id: 3, 
    level: "LV3", 
    members: 28, 
    percent: 2, 
    income: 1560,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    icon: <FaChartLine className="text-2xl text-blue-200"/>,
    highlight: true
  },
];

const members = [
  { id: 1, name: "Alex Johnson", joinDate: "2 days ago", active: true, sales: 12 },
  { id: 2, name: "Sarah Williams", joinDate: "1 week ago", active: true, sales: 8 },
  { id: 3, name: "Michael Chen", joinDate: "3 days ago", active: true, sales: 15 },
  { id: 4, name: "Emily Davis", joinDate: "5 days ago", active: false, sales: 5 },
  { id: 5, name: "David Kim", joinDate: "1 day ago", active: true, sales: 3 },
  { id: 6, name: "Jessica Martinez", joinDate: "2 weeks ago", active: true, sales: 22 },
];

function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 font-sans py-5 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Team Performance</h1>
              <p className="text-gray-400">Track your team's growth and achievements</p>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <FaFire className="text-sm" />
              <span>Premium Team</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard
              icon={<FaCoins className="text-xl sm:text-2xl" />}
              value="$12,450"
              label="Total Revenue"
              color="bg-amber-500/10 text-amber-400"
              trend="up"
