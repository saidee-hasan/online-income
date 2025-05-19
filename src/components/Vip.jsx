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
