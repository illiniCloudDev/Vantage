import React from 'react';
import { Link } from 'react-router-dom';
import { ChartArea, LayoutDashboard, Newspaper, ArrowRight } from 'lucide-react';

import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0a1120] text-[#e2e8f0] font-sans">
      
      {/* 1. Header (Top Nav) */}
      {/* <header className="border-b border-[#1f293a] py-4 bg-[#0d172a]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChartArea className="text-[#38bdf8] w-7 h-7" /> 
            <span className="text-3xl font-bold text-white tracking-tight">Vantage</span>
          </div>

        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Feature Cards (Robinhood Layout) */}
        <FeatureCards />
      </main>
    </div>
  );
};

export default HomePage;