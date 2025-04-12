import React from "react";
import { 
  FaDownload, 
  FaLock, 
  FaUser, 
  FaWallet, 
  FaMoneyCheckAlt, 
  FaClipboardList, 
  FaChevronRight, 
  FaCrown,
  FaGem,
  FaCoins,
  FaChartLine
} from "react-icons/fa";
import { MdExitToApp, MdSecurity } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidBadgeCheck } from "react-icons/bi";

const menuItems = [
  { icon: <FaClipboardList className="text-cyan-300" />, label: "Transaction History", badge: "New" },
  { icon: <FaMoneyCheckAlt className="text-purple-300" />, label: "Withdraw Details" },
  { icon: <FaChartLine className="text-emerald-300" />, label: "Investment Analytics" },
  { icon: <FaDownload className="text-pink-300" />, label: "Download APP" },
  { icon: <FaWallet className="text-amber-300" />, label: "My Portfolio", badge: "3" },
  { icon: <FaLock className="text-red-300" />, label: "Security Center" },
  { icon: <FaUser className="text-blue-300" />, label: "Account Settings" },
  { icon: <IoMdNotifications className="text-yellow-300" />, label: "Notifications", badge: "5" },
];

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans py-6">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative max-w-3xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between backdrop-blur-sm bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-900/30 rounded-lg border border-indigo-700/50">
              <FaUser className="text-indigo-400 text-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Profile Hub
            </h1>
          </div>
          <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-all group">
            <MdExitToApp className="text-xl text-gray-400 group-hover:text-rose-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="relative max-w-3xl mx-auto px-4 mb-6">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-900 to-cyan-900/30 opacity-80"></div>
          
          {/* Holographic Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow"
              style={{
                background: `conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0%,
                  rgba(99, 102, 241, 0.1) 20%,
                  transparent 40%,
                  rgba(6, 182, 212, 0.1) 60%,
                  transparent 80%,
                  rgba(99, 102, 241, 0.1) 100%
                )`
              }}
            />
          </div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
                    alt="Profile"
                    className="w-16 h-16 rounded-xl border-2 border-white/20 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1 border-2 border-gray-900">
                    <BiSolidBadgeCheck className="text-white text-xs" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    Sarah Anderson
                    <span className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <FaGem className="mr-1" /> DIAMOND
                    </span>
                  </h2>
                  <p className="text-sm text-gray-300">@sarah_investor</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="bg-gray-800/50 px-2 py-1 rounded-md text-xs border border-cyan-500/20 text-cyan-300 flex items-center">
                      <FaCoins className="mr-1" /> 12,450.00
                    </span>
                    <span className="bg-gray-800/50 px-2 py-1 rounded-md text-xs border border-emerald-500/20 text-emerald-300">
                      +12.5% this month
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg border border-white/10 transition-all">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="relative max-w-3xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-sm">
            <p className="text-xs text-gray-400">Active Plans</p>
            <p className="text-xl font-bold text-white">3</p>
            <div className="h-1 mt-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-sm">
            <p className="text-xs text-gray-400">Total Profit</p>
            <p className="text-xl font-bold text-white">$2,450</p>
            <div className="h-1 mt-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-sm">
            <p className="text-xs text-gray-400">VIP Level</p>
            <p className="text-xl font-bold text-white">Diamond</p>
            <div className="h-1 mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative max-w-3xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-4 gap-2">
          <button className="bg-indigo-900/30 hover:bg-indigo-900/50 p-3 rounded-lg border border-indigo-700/30 flex flex-col items-center transition-all group">
            <div className="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <FaClipboardList className="text-indigo-300 text-xl" />
            </div>
            <span className="text-xs text-white">Deposit</span>
          </button>
          <button className="bg-purple-900/30 hover:bg-purple-900/50 p-3 rounded-lg border border-purple-700/30 flex flex-col items-center transition-all group">
            <div className="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <FaMoneyCheckAlt className="text-purple-300 text-xl" />
            </div>
            <span className="text-xs text-white">Withdraw</span>
          </button>
          <button className="bg-emerald-900/30 hover:bg-emerald-900/50 p-3 rounded-lg border border-emerald-700/30 flex flex-col items-center transition-all group">
            <div className="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <FaChartLine className="text-emerald-300 text-xl" />
            </div>
            <span className="text-xs text-white">Invest</span>
          </button>
          <button className="bg-amber-900/30 hover:bg-amber-900/50 p-3 rounded-lg border border-amber-700/30 flex flex-col items-center transition-all group">
            <div className="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <MdSecurity className="text-amber-300 text-xl" />
            </div>
            <span className="text-xs text-white">Security</span>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="relative max-w-3xl mx-auto px-4 mb-6">
        <div className="space-y-2">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                  {item.icon}
                </div>
                <span className="font-medium text-white">{item.label}</span>
              </div>
              <div className="flex items-center">
                {item.badge && (
                  <span className="bg-indigo-500/10 text-indigo-300 text-xs px-2 py-0.5 rounded-full mr-2">
                    {item.badge}
                  </span>
                )}
                <FaChevronRight className="text-gray-500 group-hover:text-indigo-300 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Card */}
      <div className="relative max-w-3xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-gray-900 to-yellow-900/30 opacity-80"></div>
          
          {/* Holographic Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow"
              style={{
                background: `conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0%,
                  rgba(245, 158, 11, 0.1) 20%,
                  transparent 40%,
                  rgba(234, 179, 8, 0.1) 60%,
                  transparent 80%,
                  rgba(245, 158, 11, 0.1) 100%
                )`
              }}
            />
          </div>
          
          <div className="relative z-10 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center">
                  <FaCrown className="text-amber-400 mr-2" /> Black Card Membership
                </h3>
                <p className="text-gray-300 text-sm mt-1">Unlock premium benefits and exclusive rewards</p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <FaWallet className="text-xl text-amber-400" />
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-900 font-semibold py-3 rounded-lg text-sm transition-all transform hover:scale-[1.01] shadow-lg shadow-amber-500/20 flex items-center justify-center">
              Upgrade to Elite
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Profile;