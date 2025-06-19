import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiArrowRightSLine, 
  RiShieldCheckFill, 
  RiSparkling2Fill,
  RiExchangeFill,
  RiWallet3Fill,
  RiPieChartFill,
  RiNotification3Fill,
  RiMoneyDollarCircleFill,
  RiCalendarEventFill
} from 'react-icons/ri';
import { FiCreditCard, FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { BsGraphUp, BsCurrencyExchange, BsBank2 } from 'react-icons/bs';
import { IoMdAnalytics } from 'react-icons/io';
import incomeChart from '../assets/icon/deposit.png';
import expenseChart from '../assets/icon/deposit.png';
import premiumBadge from '../assets/icon/deposit.png';
import Deposite from "../assets/icon/deposit.png"

// Mock data service
const fetchIncomeData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        totalIncome: 18750.25,
        totalExpenses: 6250.75,
        netProfit: 12499.50,
        incomeSources: [
          { id: 1, name: 'Freelance Work', amount: 7500, percentage: 40, trend: 'up' },
          { id: 2, name: 'Investments', amount: 6250, percentage: 33, trend: 'up' },
          { id: 3, name: 'Product Sales', amount: 3500, percentage: 19, trend: 'down' },
          { id: 4, name: 'Other', amount: 1500.25, percentage: 8, trend: 'neutral' }
        ],
        recentTransactions: [
          { id: 1, type: 'income', source: 'Client Project', amount: 2500, date: '2023-06-15', status: 'completed' },
          { id: 2, type: 'expense', source: 'Office Rent', amount: 1200, date: '2023-06-14', status: 'completed' },
          { id: 3, type: 'income', source: 'Stock Dividends', amount: 850, date: '2023-06-12', status: 'completed' },
          { id: 4, type: 'expense', source: 'Software Subscriptions', amount: 350, date: '2023-06-10', status: 'pending' }
        ],
        monthlyTrend: {
          income: [12000, 13500, 14200, 15600, 16200, 17400, 18750],
          expenses: [5800, 6200, 5900, 6100, 6300, 6150, 6250]
        }
      });
    }, 800);
  });
};

const PremiumIncomeDashboard = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New income received: $2,500 from Client Project', time: '3 hours ago', read: false },
    { id: 2, message: 'Your monthly financial report is ready', time: '1 day ago', read: false },
    { id: 3, message: 'Subscription renewal due in 3 days', time: '2 days ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [newIncome, setNewIncome] = useState({ source: '', amount: '', date: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIncomeData();
        setIncomeData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Adding new income:', newIncome);
    setShowIncomeModal(false);
    setNewIncome({ source: '', amount: '', date: '' });
  };

  const quickActions = [
    { icon: <FiDollarSign size={20} />, label: 'Add Income', action: () => setShowIncomeModal(true) },
    { icon: <FiCreditCard size={20} />, label: 'Add Expense', action: () => console.log('Add Expense clicked') },
    { icon: <BsGraphUp size={20} />, label: 'Generate Report', action: () => console.log('Generate Report clicked') },
    { icon: <IoMdAnalytics size={20} />, label: 'Tax Forecast', action: () => console.log('Tax Forecast clicked') }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full mb-4"
          />
          <p className="text-indigo-100 font-medium">Loading your premium dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-5 text-white overflow-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-400"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 5 + 1,
              height: Math.random() * 5 + 1,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-400/30">
              <RiMoneyDollarCircleFill className="text-indigo-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Income Tracker Pro
              </h1>
              <p className="text-sm text-indigo-300">Track, analyze, and optimize your income streams</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-white/5 hover:bg-indigo-500/10 transition-colors relative"
              >
                <RiNotification3Fill className="text-xl" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                  >
                    <div className="p-3 border-b border-white/10 text-sm font-medium flex justify-between items-center">
                      <span>Notifications</span>
                      <button className="text-xs text-indigo-400 hover:text-indigo-300">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${notification.read ? 'opacity-70' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-white/50 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 relative">
              <img 
                src={premiumBadge} 
                alt="Premium Badge" 
                className="w-5 h-5 absolute -left-2 -top-2"
              />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Premium Member</span>
            </div>
          </div>
        </header>

        {/* Time Range Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center md:justify-end mb-8"
        >
          <div className="inline-flex bg-slate-800/50 rounded-lg p-1 border border-white/10">
            {['weekly', 'monthly', 'quarterly', 'yearly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  timeRange === range 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Quick Actions</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                View all <RiArrowRightSLine />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/70 rounded-xl border border-white/10 hover:border-indigo-400/30 transition-all"
                >
                  <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Income Card */}
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/10 rounded-2xl border border-indigo-400/20 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-indigo-200 mb-1">Total Income</p>
                      <h3 className="text-2xl font-bold">${incomeData.totalIncome.toLocaleString()}</h3>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FiDollarSign className="text-indigo-400 text-xl" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400">+15.2% from last {timeRange}</span>
                  </div>
                </div>
              </div>

              {/* Total Expenses Card */}
              <div className="bg-gradient-to-br from-rose-600/20 to-pink-600/10 rounded-2xl border border-rose-400/20 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-rose-200 mb-1">Total Expenses</p>
                      <h3 className="text-2xl font-bold">${incomeData.totalExpenses.toLocaleString()}</h3>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg">
                      <RiExchangeFill className="text-rose-400 text-xl" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-amber-400">+3.8% from last {timeRange}</span>
                  </div>
                </div>
              </div>

              {/* Net Profit Card */}
              <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/10 rounded-2xl border border-emerald-400/20 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-emerald-200 mb-1">Net Profit</p>
                      <h3 className="text-2xl font-bold">${incomeData.netProfit.toLocaleString()}</h3>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FiTrendingUp className="text-emerald-400 text-xl" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400">+22.4% from last {timeRange}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income Chart */}
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <FiDollarSign className="text-indigo-400" />
                    Income Breakdown
                  </h3>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    Details <RiArrowRightSLine />
                  </button>
                </div>
                <div className="h-48 bg-slate-700/30 rounded-lg border border-white/5 overflow-hidden">
                  <img 
                    src={incomeChart} 
                    alt="Income Chart" 
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {incomeData.incomeSources.map((source, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        source.trend === 'up' ? 'bg-emerald-500' : 
                        source.trend === 'down' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}></div>
                      <span className="text-xs text-white/80 flex-1 truncate">{source.name}</span>
                      <span className="text-xs font-medium">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expenses Chart */}
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <RiExchangeFill className="text-rose-400" />
                    Expense Analysis
                  </h3>
                  <button className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1">
                    Details <RiArrowRightSLine />
                  </button>
                </div>
                <div className="h-48 bg-slate-700/30 rounded-lg border border-white/5 overflow-hidden">
                  <img 
                    src={expenseChart} 
                    alt="Expense Chart" 
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-400">Essential (62%)</span>
                    <span className="text-white/70">$3,875.50</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[62%]"></div>
                  </div>
                  <div className="flex justify-between text-xs mt-3 mb-1">
                    <span className="text-amber-400">Discretionary (28%)</span>
                    <span className="text-white/70">$1,750.25</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-[28%]"></div>
                  </div>
                  <div className="flex justify-between text-xs mt-3 mb-1">
                    <span className="text-rose-400">Unexpected (10%)</span>
                    <span className="text-white/70">$625.00</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 w-[10%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Recent Transactions */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-md font-medium">Recent Transactions</h2>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View all <RiArrowRightSLine />
                </button>
              </div>
              
              <div className="space-y-3">
                {incomeData.recentTransactions.map((txn, index) => (
                  <div key={index} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        txn.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {txn.type === 'income' ? <FiDollarSign /> : <RiExchangeFill />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{txn.source}</p>
                        <p className="text-xs text-white/50 flex items-center gap-1">
                          <RiCalendarEventFill className="text-xs" />
                          {txn.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        txn.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
                      </p>
                      <p className={`text-xs ${
                        txn.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {txn.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/10 rounded-2xl border border-indigo-400/20 p-6">
              <h2 className="text-md font-medium mb-4 flex items-center gap-2">
                <RiSparkling2Fill className="text-indigo-400" />
                Premium Features
              </h2>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 text-indigo-400">
                    <RiShieldCheckFill />
                  </div>
                  <span>Advanced income analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 text-indigo-400">
                    <FiPieChart />
                  </div>
                  <span>Customizable reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 text-indigo-400">
                    <BsBank2 />
                  </div>
                  <span>Multi-account integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 text-indigo-400">
                    <IoMdAnalytics />
                  </div>
                  <span>Tax optimization tools</span>
                </li>
              </ul>
              
              <button className="w-full mt-4 py-2 text-sm bg-indigo-500/10 rounded-lg border border-indigo-400/30 text-indigo-400 hover:bg-indigo-500/20 transition-colors flex items-center justify-center gap-2">
                Explore All Features <RiArrowRightSLine />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Income Modal */}
      <AnimatePresence>
        {showIncomeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-2xl border border-white/10 w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FiDollarSign className="text-indigo-400" />
                  Add New Income
                </h3>
              </div>
              
              <form onSubmit={handleAddIncome} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Income Source</label>
                    <input 
                      type="text" 
                      value={newIncome.source}
                      onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                      className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Freelance work, Investment, etc."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                      <input 
                        type="number" 
                        value={newIncome.amount}
                        onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2.5 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Date</label>
                    <input 
                      type="date" 
                      value={newIncome.date}
                      onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                      className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowIncomeModal(false)}
                    className="px-4 py-2 text-sm bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 text-sm bg-indigo-500/10 rounded-lg border border-indigo-400/30 text-indigo-400 hover:bg-indigo-500/20 transition-colors flex items-center gap-2"
                  >
                    <FiDollarSign />
                    Add Income
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumIncomeDashboard;