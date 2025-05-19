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
            />
            <StatCard
              icon={<FaUsers className="text-xl sm:text-2xl" />}
              value="45"
              label="Team Members"
              color="bg-purple-500/10 text-purple-400"
              trend="up"
            />
            <StatCard
              icon={<FaChartLine className="text-xl sm:text-2xl" />}
              value="24.7%"
              label="Growth Rate"
              color="bg-blue-500/10 text-blue-400"
              trend="up"
            />
            <StatCard
              icon={<FaCrown className="text-xl sm:text-2xl" />}
              value="LV3"
              label="Current Level"
              color="bg-emerald-500/10 text-emerald-400"
              trend="steady"
            />
          </div>
        </div>
      </div>

      {/* Team Levels */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {teamLevels.map((level) => (
            <LevelCard key={level.id} {...level} />
          ))}
        </div>

        {/* Team Members Section */}
        <div className="mt-12 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold">Team Members</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg">All</button>
              <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg">Active</button>
              <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg">New</button>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center space-x-2">
              <span>View All Members</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, value, label, color, trend }) => {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    steady: "text-amber-400"
  };
  
  const trendIcons = {
    up: "▲",
    down: "▼",
    steady: "◆"
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 rounded-xl hover:bg-gray-800 transition-colors duration-200">
      <div className="flex justify-between">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        {trend && (
          <span className={`text-xs font-medium ${trendColors[trend]}`}>
            {trendIcons[trend]} 2.5%
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-400 mt-1">{label}</div>
      </div>
    </div>
  );
};

const LevelCard = ({ level, members, percent, income, color, icon, highlight }) => (
  <div className={`relative rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-200 ${highlight ? "ring-2 ring-amber-400/30" : ""}`}>
    {highlight && (
      <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
        <GiDiamondTrophy className="inline mr-1" />
        Current
      </div>
    )}
    <div className={`${color} p-4 sm:p-6 flex items-center justify-between`}>
      <div className="text-white font-bold text-lg sm:text-2xl">{level}</div>
      <div className="bg-black/20 p-2 sm:p-3 rounded-lg backdrop-blur-sm">{icon}</div>
    </div>
    <div className="bg-gray-800 p-4 sm:p-6 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Members</span>
        <span className="font-medium text-gray-100">{members}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Commission</span>
        <span className="font-medium text-blue-400">{percent}%</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Income</span>
        <span className="font-medium text-emerald-400">${income.toLocaleString()}</span>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-700">
        <button className="w-full py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const MemberCard = ({ member, index }) => (
  <div className="flex items-center p-3 sm:p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors cursor-pointer group">
    <div className="relative">
      <img
        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}
        alt="Member"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-amber-400 transition-colors"
      />
      {member.active && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-800"></div>
      )}
    </div>
    <div className="ml-3 sm:ml-4 flex-1">
      <div className="font-medium sm:font-semibold text-sm sm:text-base flex items-center">
        {member.name}
        {member.sales > 15 && <FaStar className="ml-1 text-amber-400 text-xs" />}
      </div>
      <div className="text-xs sm:text-sm text-gray-400">{member.joinDate}</div>
      <div className="text-xs text-gray-500 mt-1">
        <span className={`px-2 py-1 rounded-full ${member.sales > 10 ? 'bg-emerald-900/50 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
          {member.sales} sales
        </span>
      </div>
    </div>
    <FaChevronRight className="text-gray-500 group-hover:text-amber-400 text-sm sm:text-base transition-colors" />
  </div>
);

export default Team;