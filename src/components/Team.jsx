import React from "react";
import { FaCrown, FaUsers, FaCoins, FaChartLine, FaChevronRight } from "react-icons/fa";

const teamLevels = [
  { 
    id: 1, 
    level: "LV1", 
    members: 5, 
    percent: 25, 
    income: 1250,
    color: "bg-gradient-to-r from-amber-400 to-amber-500",
    icon: <FaCrown className="text-2xl text-amber-600"/>
  },
  { 
    id: 2, 
    level: "LV2", 
    members: 12, 
    percent: 3, 
    income: 840,
    color: "bg-gradient-to-r from-purple-400 to-purple-500",
    icon: <FaUsers className="text-2xl text-purple-600"/>
  },
  { 
    id: 3, 
    level: "LV3", 
    members: 28, 
    percent: 2, 
    income: 1560,
    color: "bg-gradient-to-r from-blue-400 to-blue-500",
    icon: <FaChartLine className="text-2xl text-blue-600"/>
  },
];

function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Team Performance</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<FaCoins className="text-xl sm:text-2xl" />}
              value="$12,450"
              label="Total Revenue"
              color="bg-amber-100 text-amber-600"
            />
            <StatCard
              icon={<FaUsers className="text-xl sm:text-2xl" />}
              value="45"
              label="Team Members"
              color="bg-purple-100 text-purple-600"
            />
            <StatCard
              icon={<FaChartLine className="text-xl sm:text-2xl" />}
              value="24.7%"
              label="Growth Rate"
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              icon={<FaCrown className="text-xl sm:text-2xl" />}
              value="LV3"
              label="Current Level"
              color="bg-emerald-100 text-emerald-600"
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
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-6">Team Members</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <MemberCard key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, value, label, color }) => (
  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center space-x-4">
    <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    <div>
      <div className="text-lg sm:text-xl font-bold">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  </div>
);

const LevelCard = ({ level, members, percent, income, color, icon }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
    <div className={`${color} p-4 sm:p-6 rounded-t-xl flex items-center justify-between`}>
      <div className="text-white font-bold text-lg sm:text-2xl">{level}</div>
      <div className="bg-white/20 p-2 sm:p-3 rounded-lg">{icon}</div>
    </div>
    <div className="p-4 sm:p-6 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Members</span>
        <span className="font-bold text-gray-700">{members}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Commission</span>
        <span className="font-bold text-blue-600">{percent}%</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Income</span>
        <span className="font-bold text-emerald-600">${income.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

const MemberCard = ({ index }) => (
  <div className="flex items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
    <img
      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}
      alt="Member"
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
    />
    <div className="ml-3 sm:ml-4 flex-1">
      <div className="font-medium sm:font-semibold text-sm sm:text-base">Member {index + 1}</div>
      <div className="text-xs sm:text-sm text-gray-500">Joined 2 days ago</div>
    </div>
    <FaChevronRight className="text-gray-400 text-sm sm:text-base" />
  </div>
);

export default Team;
