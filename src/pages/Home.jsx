import React from 'react'
import Banner from '../components/Banner'
import Withdraw from "../assets/icon/withdraw.png";
import Deposite from "../assets/icon/deposit.png";
import Invite from "../assets/icon/wedding-invitation.png";
import Team from "../assets/icon/developers.png";
import { Link } from 'react-router-dom';
import { RiArrowRightSLine, RiShieldCheckFill } from 'react-icons/ri';

function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 min-h-screen py-8">
      <Banner />

      {/* Floating Action Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { to: "/deposit", icon: Deposite, label: "Deposit", color: "from-emerald-500/15 to-cyan-500/10" },
            { to: "/withdraw", icon: Withdraw, label: "Withdraw", color: "from-rose-500/15 to-pink-500/10" },
            { to: "/team", icon: Team, label: "Team", color: "from-amber-500/15 to-orange-500/10" },
            { to: "/invite", icon: Invite, label: "Invite", color: "from-violet-500/15 to-indigo-500/10" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl 
                shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
                border border-white/20 hover:border-white/40 overflow-hidden"
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 
                group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-radial-gradient from-white/30 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Container */}
              <div className="relative z-10 w-20 h-20 mb-4 p-4 bg-white rounded-2xl shadow-inner 
                flex items-center justify-center transition-transform duration-300 group-hover:scale-110 
                group-hover:bg-white/90">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 
                    transition-all duration-300"
                />
              </div>

              {/* Label with Animated Arrow */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-900 
                  bg-clip-text text-transparent group-hover:text-transparent group-hover:bg-gradient-to-r 
                  group-hover:from-emerald-600 group-hover:to-cyan-600 transition-colors duration-300">
                  {item.label}
                </span>
                <RiArrowRightSLine className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 
                  transition-all duration-300 transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Glassmorphic Financial Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-[2rem] 
          shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] 
            opacity-20 mix-blend-soft-light animate-texture-move" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />

          {/* Header Section */}
          <div className="relative flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 
                hover:border-cyan-400/30 transition-all duration-300">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 
                  bg-clip-text text-transparent animate-gradient-shift">
                  MFC
                </h2>
              </div>
              <div className="hidden md:block h-8 w-px bg-white/20" />
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm 
                border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <RiShieldCheckFill className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-cyan-200">Account #984545</span>
                <span className="text-xs text-cyan-400/80">Verified</span>
              </div>
            </div>
            
            {/* Quick Action Menu */}
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-white/5 rounded-full backdrop-blur-sm border border-white/10 
                text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                Transaction History
              </button>
              <button className="px-4 py-2 text-sm bg-cyan-500/10 rounded-full backdrop-blur-sm border border-cyan-400/20 
                text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                Upgrade Account
              </button>
            </div>
          </div>

          {/* Financial Metrics Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { 
                title: "Total Recharge", 
                value: "0.00", 
                currency: "USDT",
                icon: (
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                trend: "↑ 12% this month",
                color: "cyan"
              },
              { 
                title: "Total Balance", 
                value: "0.00", 
                currency: "USDT",
                icon: (
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                ),
                trend: "↗ 5% weekly growth",
                color: "blue"
              }
            ].map((metric, index) => (
              <div 
                key={index}
                className={`p-1 rounded-2xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/10 
                  hover:shadow-xl transition-all duration-300`}
              >
                <div className="bg-slate-900/80 rounded-xl p-6 backdrop-blur-sm border border-white/5">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-${metric.color}-500/10 rounded-lg`}>
                        {metric.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-cyan-100 mb-1">{metric.title}</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-bold text-white">{metric.value}</span>
                          <span className="text-sm text-${metric.color}-300">{metric.currency}</span>
                        </div>
                        <span className={`text-xs text-${metric.color}-400 mt-1`}>{metric.trend}</span>
                      </div>
                    </div>
                    <RiArrowRightSLine className={`w-6 h-6 text-${metric.color}-400 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm text-cyan-300 mb-2">
              <span>Account Verification Progress</span>
              <span>65%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full 
                transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;