import React from 'react';
import Feature from './Feature';
import { LayoutDashboard, Newspaper, LineChart, ShieldCheck } from 'lucide-react';

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 1. Cash Flow */}
      <Feature 
        icon={LayoutDashboard} 
        title="Cash Flow" 
        description="Track every dollar with our calendar-based tracker. Know exactly where your money goes."
      >
        <div className="h-1.5 w-full bg-[#1f293a] rounded-full mt-2">
          <div className="h-full bg-[#38bdf8] w-2/3 rounded-full"></div>
        </div>
      </Feature>

      {/* 2. Market Watch */}
      <Feature 
        icon={Newspaper} 
        title="Market Watch" 
        description="Direct integration with SEC filings and live ticker sentiment."
      >
        <div className="flex gap-2">
          <span className="text-xs font-bold px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20">SPX: +1.2%</span>
          <span className="text-xs font-bold px-2 py-1 bg-blue-500/10 text-[#38bdf8] rounded border border-blue-500/20">VIX: 14.2</span>
        </div>
      </Feature>

      {/* 3. Alpha Signals */}
      <Feature 
        icon={LineChart} 
        title="Alpha Signals" 
        description="Advanced Greeks tracking (Delta/Theta) for your options portfolio."
      >
        <p className="text-[#38bdf8] text-sm font-mono">Portfolio Delta: 0.45</p>
      </Feature>

      {/* 4. Vantage Agent */}
      <Feature 
        icon={ShieldCheck} 
        title="Vantage Agent" 
        description="AI agent that identifies unusual spending or market anomalies."
      >
        <span className="text-xs text-[#94a3b8] italic underline">Active Monitoring...</span>
      </Feature>
    </div>
  );
}

export default FeatureCards;