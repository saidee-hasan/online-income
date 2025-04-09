import React from 'react';
import { StarIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const vipData = [
    {
        id: 1,
        title: "Starter Plan",
        image: "https://t4.ftcdn.net/jpg/00/95/25/75/360_F_95257548_44Iyw3ku3RWiM0R6mremvmKbOOFLH9EC.jpg",
        price: "$10",
        dailyProfit: "$1",
        validity: "10 Days",
        totalIncome: "$10",
      },
      {
        id: 2,
        title: "Basic Plan",
        image: "https://t4.ftcdn.net/jpg/00/95/25/75/360_F_95257548_44Iyw3ku3RWiM0R6mremvmKbOOFLH9EC.jpg",
        price: "$20",
        dailyProfit: "$2.5",
        validity: "10 Days",
        totalIncome: "$25",
      },
      {
        id: 3,
        title: "Silver Plan",
        image: "https://t4.ftcdn.net/jpg/00/95/25/75/360_F_95257548_44Iyw3ku3RWiM0R6mremvmKbOOFLH9EC.jpg",
        price: "$50",
        dailyProfit: "$6",
        validity: "10 Days",
        totalIncome: "$60",
      },
      {
        id: 4,
        title: "Gold Plan",
        image: "https://t4.ftcdn.net/jpg/00/95/25/75/360_F_95257548_44Iyw3ku3RWiM0R6mremvmKbOOFLH9EC.jpg",
        price: "$100",
        dailyProfit: "$13",
        validity: "10 Days",
        totalIncome: "$130",
      },
];

function Vip() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Premium Investment Plans
        </h2>
        <p className="text-lg text-gray-600">Choose your exclusive wealth growth strategy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {vipData.map((plan) => (
          <div
            key={plan.id}
            className="relative group bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            {plan.id === 4 && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-tr-2xl rounded-bl-lg text-sm font-bold shadow-md">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-1">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover rounded-full border-4 border-white"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 shadow-lg">
                    <StarIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">{plan.title}</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Investment</span>
                  <span className="text-lg font-bold text-blue-600">{plan.price}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Daily: {plan.dailyProfit}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Term: {plan.validity}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Total: {plan.totalIncome}</span>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg">
                Get Started
                <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-sm">
          🔒 All plans include 24/7 support and secured investments
        </p>
      </div>
    </div>
  );
}

export default Vip;