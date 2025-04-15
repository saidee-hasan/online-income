import React, { useState, useEffect, useCallback } from 'react';
import { FaCoins, FaFire, FaHistory, FaUserAlt, FaStar, FaGem, FaBolt, FaCrown } from 'react-icons/fa';
import { MdDone, MdOutlineTimer, MdStars, MdClose } from 'react-icons/md';
import { GiTwoCoins, GiCash } from 'react-icons/gi';
import { RiVipCrownFill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const Ads = () => {
  // State initialization
  const [points, setPoints] = useState(() => {
    const savedPoints = typeof window !== 'undefined' ? localStorage.getItem('points') : null;
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [adViewed, setAdViewed] = useState(false);
  const [adTimer, setAdTimer] = useState(3);
  const [adActive, setAdActive] = useState(false);
  const [history, setHistory] = useState([]);
  const [userLevel, setUserLevel] = useState(() => {
    const savedLevel = typeof window !== 'undefined' ? localStorage.getItem('userLevel') : null;
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(() => {
    const today = new Date().toDateString();
    const lastClaimed = typeof window !== 'undefined' ? localStorage.getItem('lastBonusClaim') : null;
    return lastClaimed === today;
  });
  const [adsWatched, setAdsWatched] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  // Premium ad data
  const ads = [
    { 
      id: 1, 
      title: "Premium Game - Install Now!", 
      points: 10, 
      premium: false,
      image: "https://via.placeholder.com/300x150/4A5568/FFFFFF?text=Game+Ad"
    },
    { 
      id: 2, 
      title: "Limited Time Offer", 
      points: 15, 
      premium: false,
      image: "https://via.placeholder.com/300x150/4A5568/FFFFFF?text=Special+Offer"
    },
    { 
      id: 3, 
      title: "Exclusive Deal", 
      points: 20, 
      premium: false,
      image: "https://via.placeholder.com/300x150/4A5568/FFFFFF?text=Exclusive+Deal"
    },
    { 
      id: 4, 
      title: "VIP Black Offer", 
      points: 50, 
      premium: true,
      image: "https://via.placeholder.com/300x150/000000/FFFFFF?text=VIP+Black+Offer",
      bgColor: "bg-black",
      borderColor: "border-yellow-500"
    },
    { 
      id: 5, 
      title: "Elite Partner Deal", 
      points: 40, 
      premium: true,
      image: "https://via.placeholder.com/300x150/111827/FFFFFF?text=Elite+Deal",
      bgColor: "bg-gray-900",
      borderColor: "border-yellow-400"
    },
  ];

  const [currentAd, setCurrentAd] = useState(ads[0]);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('userLevel', userLevel.toString());
  }, [userLevel]);

  // Responsive design handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Streak calculation with proper date handling
  useEffect(() => {
    try {
      const lastAccess = localStorage.getItem('lastAdAccess');
      const today = new Date().toDateString();
      
      if (lastAccess === today) return;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastAccess === yesterday.toDateString()) {
        setStreak(prev => prev + 1);
      } else if (lastAccess !== today) {
        setStreak(0);
      }
      
      localStorage.setItem('lastAdAccess', today);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Points animation cleanup
  useEffect(() => {
    let timer;
    if (showPointsAnimation) {
      timer = setTimeout(() => {
        setShowPointsAnimation(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showPointsAnimation]);

  // Ad timer with proper cleanup
  useEffect(() => {
    let interval;
    
    if (adActive && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer(prev => prev - 1);
      }, 1000);
    } else if (adActive && adTimer === 0) {
      completeAdView();
    }

    return () => clearInterval(interval);
  }, [adActive, adTimer]);

  // Calculate streak multiplier
  const streakMultiplier = useCallback(() => {
    if (streak >= 7) return 1.5;
    if (streak >= 3) return 1.2;
    return 1;
  }, [streak]);

  const startAdView = () => {
    if (adViewed || adActive) return;
    
    setAdActive(true);
    setAdTimer(3);
    setAdViewed(false);
    
    // Rotate through available ads (both regular and premium)
    const currentIndex = ads.findIndex(ad => ad.id === currentAd.id);
    const nextIndex = (currentIndex + 1) % ads.length;
    setCurrentAd(ads[nextIndex]);
  };

  const completeAdView = () => {
    setAdActive(false);
    setAdViewed(true);
    const earnedPoints = currentAd.points * userLevel * streakMultiplier();
    
    setPoints(prev => {
      const newPoints = prev + earnedPoints;
      setAnimatedPoints(earnedPoints);
      setShowPointsAnimation(true);
      return newPoints;
    });
    
    setAdsWatched(prev => prev + 1);
    
    setHistory(prev => [
      { 
        type: 'ad', 
        amount: earnedPoints, 
        date: new Date().toLocaleTimeString(),
        details: currentAd.title,
        premium: currentAd.premium
      },
      ...prev.slice(0, 9)
    ]);
  };

  const claimDailyBonus = () => {
    if (dailyBonusClaimed) return;
    
    const bonus = 50 * userLevel * streakMultiplier();
    setPoints(prev => prev + bonus);
    setDailyBonusClaimed(true);
    
    // Store the last claim date
    localStorage.setItem('lastBonusClaim', new Date().toDateString());
    
    setHistory(prev => [
      { 
        type: 'bonus', 
        amount: bonus, 
        date: new Date().toLocaleTimeString(),
        details: 'Daily Bonus'
      },
      ...prev.slice(0, 9)
    ]);
  };

  const levelUp = () => {
    const requiredPoints = userLevel * 500;
    if (points >= requiredPoints) {
      setUserLevel(prev => prev + 1);
      setPoints(prev => prev - requiredPoints);
      
      setHistory(prev => [
        { 
          type: 'level', 
          amount: userLevel + 1, 
          date: new Date().toLocaleTimeString(),
          details: 'Level Up!'
        },
        ...prev.slice(0, 9)
      ]);
    }
  };

  const openPremiumModal = () => setShowPremiumModal(true);
  const closePremiumModal = () => setShowPremiumModal(false);

  // Calculate progress percentage safely
  const progressPercentage = Math.min(100, (points / (userLevel * 500)) * 100);

  const PremiumModal = ({ closeModal }) => (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 "
      onClick={closeModal}
    >
      <motion.div 
        className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-6 max-w-md w-full border-2 border-yellow-500 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              <RiVipCrownFill className="inline mr-3" /> VIP ELITE
            </h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-white">
              <MdClose size={24} />
            </button>
          </div>
          
          {/* Premium features list */}
          <div className="space-y-4 mb-8">
            {[
              { icon: <FaStar />, color: "bg-yellow-600", title: "2x Earnings", desc: "Double points from all activities" },
              { icon: <FaGem />, color: "bg-purple-600", title: "Exclusive Ads", desc: "High-value premium ads only" },
              { icon: <FaBolt />, color: "bg-blue-600", title: "No Limits", desc: "Unlimited daily rewards" },
              { icon: <FaCrown />, color: "bg-red-600", title: "VIP Status", desc: "Special recognition badge" }
            ].map((feature, index) => (
              <div key={index} className="flex items-start bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className={`${feature.color} p-3 rounded-xl mr-4 text-white`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white">{feature.title}</h4>
                  <p className="text-sm text-gray-300 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing */}
          <div className="bg-black bg-opacity-50 p-4 rounded-xl border border-yellow-500 mb-6 text-center">
            <div className="text-yellow-400 text-sm mb-1">SPECIAL INTRODUCTORY OFFER</div>
            <div className="text-2xl font-bold text-white">$4.99<span className="text-gray-400 text-lg">/month</span></div>
            <div className="text-gray-400 text-sm mt-1">7-day free trial included</div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20">
            UPGRADE NOW
          </button>
          
          <div className="text-center text-xs text-gray-500 mt-4">
            Cancel anytime. No hidden fees.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const AdCard = ({ ad, isActive, isViewed, pointsEarned, onClick, userLevel, streakMultiplier }) => {
    const points = ad.points * userLevel * streakMultiplier();
    
    return (
      <motion.div 
        className={`relative overflow-hidden rounded-2xl p-1 ${ad.premium ? 
          'bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500' : 
          'bg-white'}`}
        whileHover={{ scale: 1.02 }}
      >
        {ad.premium && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold z-10 flex items-center">
            <RiVipCrownFill className="mr-1" /> VIP
          </div>
        )}
        
        <div 
          className={`h-full w-full rounded-xl overflow-hidden ${ad.premium ? 'bg-gray-900' : 'bg-gray-50'}`}
          onClick={onClick}
        >
          {/* Ad image */}
          <div className="relative h-40 w-full">
            <img 
              src={ad.image} 
              alt={ad.title}
              className="w-full h-full object-cover"
            />
            {isActive && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                <motion.div 
                  className="text-4xl font-bold text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {adTimer}s
                </motion.div>
              </div>
            )}
          </div>
          
          {/* Ad content */}
          <div className={`p-3 ${ad.premium ? 'text-white' : 'text-gray-800'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{ad.title}</h3>
              <div className={`text-sm font-bold ${ad.premium ? 'text-yellow-400' : 'text-purple-600'}`}>
                +{points}p
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <div className={`flex items-center ${ad.premium ? 'text-gray-400' : 'text-gray-500'}`}>
                <FaUserAlt className="mr-1" /> Lvl {userLevel}
              </div>
              <div className="flex items-center">
                <FaBolt className={`${streakMultiplier() > 1 ? 'text-yellow-400' : 'text-gray-400'} mr-1`} />
                <span>{streakMultiplier()}x</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Points animation */}
        <AnimatePresence>
          {pointsEarned && (
            <motion.div
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.5, y: -50 }}
              exit={{ opacity: 0 }}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold ${
                ad.premium ? 'text-yellow-400' : 'text-green-500'
              }`}
            >
              +{pointsEarned}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const DailyBonus = ({ claimed, claimBonus, userLevel, streakMultiplier }) => {
    const bonusAmount = 50 * userLevel * streakMultiplier();
    
    return (
      <motion.div 
        className={`relative rounded-2xl overflow-hidden ${claimed ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-indigo-700'}`}
        whileHover={{ scale: claimed ? 1 : 1.02 }}
      >
        {claimed && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <MdDone className="text-white text-6xl" />
          </div>
        )}
        
        <div className="relative z-10 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-">Daily Bonus</h3>
              <p className="text-sm">
                {bonusAmount} Points
                {streakMultiplier() > 1 && (
                  <span className="ml-2 bg-yellow-400 bg-opacity-20 text-yellow-300 px-2 py-0.5 rounded-full text-xs">
                    +{Math.round((streakMultiplier() - 1) * 100)}%
                  </span>
                )}
              </p>
            </div>
            
            <button
              onClick={claimBonus}
              disabled={claimed}
              className={`px-4 py-2 rounded-full font-bold flex items-center ${
                claimed 
                  ? 'bg-gray-700 text-gray-400' 
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {claimed ? (
                <>
                  <MdDone className="mr-1" /> Claimed
              </>
              ) : (
                <>
                  <FaStar className="mr-1" /> Claim
                </>
              )}
            </button>
          </div>
          
          {!claimed && (
            <div className="mt-3 h-1 bg-black bg-opacity-20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 pb-20 ">
      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && <PremiumModal closeModal={closePremiumModal} />}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto">
        {/* Header with Points and Level */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <FaFire className="text-yellow-400 mr-2" /> Ad Rewards
            </h1>
            <p className="text-purple-200 text-sm md:text-base">Watch ads, earn rewards!</p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="bg-purple-800 p-2 md:p-3 rounded-lg flex items-center shadow-lg">
              <FaCoins className="text-yellow-400 mr-1 md:mr-2 text-sm md:text-base" />
              <div>
                <div className="text-xs text-purple-300">Points</div>
                <div className="font-bold text-sm md:text-lg">{points}</div>
              </div>
            </div>
            <div className="bg-indigo-800 p-2 md:p-3 rounded-lg flex items-center shadow-lg">
              <FaUserAlt className="text-blue-300 mr-1 md:mr-2 text-sm md:text-base" />
              <div>
                <div className="text-xs text-indigo-300">Level</div>
                <div className="font-bold text-sm md:text-lg">{userLevel}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar - Mobile Optimized */}
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-2 md:gap-3 mb-6`}>
          <div className="bg-white bg-opacity-10 rounded-lg md:rounded-xl p-2 md:p-3 flex items-center">
            <div className="bg-blue-600 p-1 md:p-2 rounded md:rounded-lg mr-2 md:mr-3">
              <MdOutlineTimer className="text-white text-sm md:text-base" />
            </div>
            <div>
              <div className="text-xs text-blue-300">Ads</div>
              <div className="font-bold text-sm md:text-base">{adsWatched}</div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg md:rounded-xl p-2 md:p-3 flex items-center">
            <div className="bg-yellow-600 p-1 md:p-2 rounded md:rounded-lg mr-2 md:mr-3">
              <FaBolt className="text-white text-sm md:text-base" />
            </div>
            <div>
              <div className="text-xs text-yellow-300">Streak</div>
              <div className="font-bold text-sm md:text-base">{streak}d</div>
            </div>
          </div>
          
          {!isMobile && (
            <div className="bg-white bg-opacity-10 rounded-xl p-3 flex items-center">
              <div className="bg-green-600 p-2 rounded-lg mr-3">
                <MdStars className="text-white" />
              </div>
              <div>
                <div className="text-xs text-green-300">Multiplier</div>
                <div className="font-bold">{userLevel}x{streakMultiplier() !== 1 ? `+${(streakMultiplier()-1)*100}%` : ''}</div>
              </div>
            </div>
          )}
        </div>

        {/* User Level Progress */}
        <motion.div 
          whileHover={{ scale: isMobile ? 1 : 1.02 }}
          className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-xl p-4 mb-6 shadow-lg relative"
        >
          {userLevel > 3 && (
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <RiVipCrownFill className="mr-1" /> PRO
            </div>
          )}
          
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold flex items-center text-sm md:text-base">
              <FaUserAlt className="mr-2" /> Level {userLevel}
            </h3>
            <span className="text-yellow-300 text-sm md:text-base">{userLevel}x Earnings</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 md:h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 md:h-3 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-xs md:text-sm text-purple-200">
              {Math.max(0, userLevel * 500 - points)} to next
            </p>
            
            {points >= userLevel * 500 && (
              <button 
                onClick={levelUp}
                className="px-3 py-1 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                aria-label="Level up"
              >
                Level Up!
              </button>
            )}
          </div>
        </motion.div>

        {/* Daily Bonus */}
        <DailyBonus 
          claimed={dailyBonusClaimed} 
          claimBonus={claimDailyBonus} 
          userLevel={userLevel} 
          streakMultiplier={streakMultiplier} 
        />

        {/* Ad Area */}
        <AdCard 
          ad={currentAd} 
          isActive={adActive} 
          isViewed={adViewed} 
          pointsEarned={showPointsAnimation ? animatedPoints : 0} 
          onClick={startAdView} 
          userLevel={userLevel} 
          streakMultiplier={streakMultiplier} 
        />

        {/* Premium CTA - Mobile Optimized */}
        <motion.div 
          whileHover={{ scale: isMobile ? 1 : 1.02 }}
          className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 mb-6 shadow-lg cursor-pointer border border-yellow-500"
          onClick={openPremiumModal}
          role="button"
          aria-label="Learn about premium features"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openPremiumModal()}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-yellow-400 flex items-center">
                <RiVipCrownFill className="mr-2" /> Black Membership
              </h3>
              <p className="text-sm text-gray-300">Unlock premium ads & 2x earnings!</p>
            </div>
            <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center">
              <FaGem className="mr-1" /> VIP
            </div>
          </div>
        </motion.div>

        {/* Reward Shop Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 mb-6 shadow-lg border border-gray-700"
        >
          <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-400">
            <GiTwoCoins className="mr-2" /> VIP Reward Shop
          </h3>
          
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
            {[1000, 2500, 5000].map(cost => (
              <div key={cost} className="bg-gray-800 rounded-lg p-2 text-center border border-gray-700 hover:border-yellow-500 transition">
                <div className="text-xs mb-1 text-gray-400">From</div>
                <div className="font-bold text-base md:text-lg text-yellow-400">{cost} pts</div>
                <div className="text-xs mt-1 text-gray-500">Premium Reward</div>
              </div>
            ))}
          </div>
          
          <button 
            className="w-full mt-3 bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-600 text-sm md:text-base transition flex items-center justify-center"
            aria-label="View all rewards"
          >
            <FaGem className="mr-2" /> View All Rewards
          </button>
        </motion.div>

        {/* History - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-700"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg flex items-center text-white">
              <FaHistory className="mr-2" /> Activity History
            </h3>
            <div className="text-xs text-gray-400">
              Last {history.length}
            </div>
          </div>
          
          {history.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">📊</div>
              <p className="text-gray-400 text-sm md:text-base">No activity yet</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                Watch ads to see activity here
              </p>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3 max-h-60 overflow-y-auto pr-2">
              {history.map((item, index) => (
                <motion.div 
                  key={`${item.type}-${item.date}-${index}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 md:p-3 rounded-lg flex justify-between items-center ${item.premium ? 'bg-yellow-900 bg-opacity-20 border border-yellow-900' : 'bg-gray-800'} hover:bg-opacity-50 transition text-sm`}
                >
                  <div className="flex items-center truncate">
                    {item.type === 'ad' && <FaCoins className={`mr-2 md:mr-3 ${item.premium ? 'text-yellow-400' : 'text-yellow-400'}`} />}
                    {item.type === 'bonus' && <MdStars className="mr-2 md:mr-3 text-blue-400" />}
                    {item.type === 'level' && <FaGem className="mr-2 md:mr-3 text-purple-400" />}
                    
                    <div className="truncate">
                      <div className={`capitalize font-medium truncate ${item.premium ? 'text-yellow-300' : 'text-white'}`}>
                        {item.type === 'level' ? `Level ${item.amount}` : item.type}
                        {item.premium && <span className="ml-1 text-xs text-yellow-500">(VIP)</span>}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {item.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`font-bold ml-2 ${item.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.amount > 0 ? '+' : ''}
                    {item.amount}
                    {item.type === 'ad' || item.type === 'bonus' ? 'p' : ''}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile Floating Action Button */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-20 right-4 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <button 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-4 rounded-full shadow-xl"
            onClick={openPremiumModal}
          >
            <RiVipCrownFill size={24} />
          </button>
        </motion.div>
      )}

      {/* Bottom Navigation - Mobile Only */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around items-center p-2 z-30 backdrop-blur-sm bg-opacity-90">
          {[
            { icon: <FaCoins />, label: "Earn" },
            { icon: <GiCash />, label: "Rewards" },
            { icon: <RiVipCrownFill />, label: "VIP", isPremium: true },
            { icon: <FaHistory />, label: "History" },
            { icon: <FaUserAlt />, label: "Profile" }
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center p-2 ${item.isPremium ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <div className="text-lg">{item.icon}</div>
              <div className="text-xs mt-1">{item.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ads;