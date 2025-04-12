import React from "react";
import { FaDownload, FaLock, FaUser, FaWallet, FaMoneyCheckAlt, FaClipboardList, FaChevronRight, FaCrown } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

const menuItems = [
  { icon: <FaClipboardList className="text-blue-400" />, label: "Transaction History" },
  { icon: <FaMoneyCheckAlt className="text-purple-400" />, label: "Withdraw Details" },
  { icon: <FaDownload className="text-pink-400" />, label: "Download APP" },
  { icon: <FaWallet className="text-amber-400" />, label: "My Investments" },
  { icon: <FaLock className="text-red-400" />, label: "Security Settings" },
  { icon: <FaUser className="text-cyan-400" />, label: "Account Profile" },
];

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 font-sans py-10">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <MdExitToApp className="text-2xl text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 text-white border border-gray-700 relative overflow-hidden">
          {/* Gold accent */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500 rounded-full filter blur-3xl opacity-10"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=60"
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-yellow-500/30"
              />
              <div className="absolute inset-0 ring-2 ring-yellow-500/30 rounded-full" />
            </div>
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                Sarah Anderson 
                <span className="ml-2 bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full text-xs flex items-center">
                  <FaCrown className="mr-1" /> ELITE
                </span>
              </h2>
              <p className="text-sm text-gray-400">VIP Member Since 2022</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs border border-yellow-500/20 text-yellow-400">
                  Balance: $12,450.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-700 hover:border-yellow-500/30 flex flex-col items-center group">
            <div className="bg-blue-900/30 p-3 rounded-full mb-2 group-hover:bg-blue-900/50 border border-blue-900/20 group-hover:border-blue-400/30">
              <FaClipboardList className="text-blue-400 text-2xl group-hover:text-blue-300" />
            </div>
            <span className="font-medium text-white">Quick Recharge</span>
            <span className="text-xs text-gray-400">Instant deposit</span>
          </button>
          <button className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-700 hover:border-yellow-500/30 flex flex-col items-center group">
            <div className="bg-purple-900/30 p-3 rounded-full mb-2 group-hover:bg-purple-900/50 border border-purple-900/20 group-hover:border-purple-400/30">
              <FaMoneyCheckAlt className="text-purple-400 text-2xl group-hover:text-purple-300" />
            </div>
            <span className="font-medium text-white">Withdraw Funds</span>
            <span className="text-xs text-gray-400">24h processing</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-8 space-y-3">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-700 hover:border-yellow-500/20 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                  {item.icon}
                </div>
                <span className="font-medium text-white">{item.label}</span>
              </div>
              <FaChevronRight className="text-gray-500 group-hover:text-yellow-400" />
            </div>
          ))}
        </div>

        {/* Premium Badge */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-yellow-600/20 relative overflow-hidden">
          {/* Gold accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-500 rounded-full filter blur-xl opacity-10"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center">
                <FaCrown className="text-yellow-400 mr-2" /> Black Membership
              </h3>
              <p className="text-gray-300 text-sm mt-1">Unlock exclusive benefits and rewards</p>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
              <FaWallet className="text-2xl text-yellow-400" />
            </div>
          </div>
          
          <button className="mt-4 w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-3 rounded-lg text-sm transition-all transform hover:scale-[1.01] shadow-lg shadow-yellow-500/10">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;