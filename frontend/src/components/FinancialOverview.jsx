import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const FinancialOverview = ({transactions}) => {
  // pass through transactions prop

  //Inflow and outflow logic
  const totals = transactions.reduce((acc,curr) => {

    const amount = parseFloat(curr.amount) || 0; 

    if(curr.type === 'income'){
        acc.inflow += amount; 
    }else if(curr.type === 'expense'){
        acc.outflow += amount;
    }
    return acc

  }, {inflow:0, outflow:0});
  //net position/balance
  const netPosition = totals.inflow - totals.outflow; 


  // 2. Simple formatting helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-6">
      
      {/* 1. Total Inflow Card */}
      <div className="bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] flex items-start gap-4 transition-all hover:border-[#10b981]/30">
        <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
          <ArrowUpRight size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#94a3b8]">Total Inflow</p>
          <h4 className="text-3xl font-extrabold text-white mt-1">
            {formatCurrency(totals.inflow)}
          </h4>
        </div>
      </div>

      {/* 2. Total Outflow Card */}
      <div className="bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] flex items-start gap-4 transition-all hover:border-[#f43f5e]/30">
        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
          <ArrowDownRight size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#94a3b8]">Total Outflow</p>
          <h4 className="text-3xl font-extrabold text-white mt-1">
            {formatCurrency(totals.outflow)}
          </h4>
        </div>
      </div>

      {/* 3. Net Position Card */}
      <div className={`bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] flex items-start gap-4 transition-all ${
        netPosition >= 0 ? 'hover:border-[#38bdf8]/30' : 'hover:border-red-500/30'
      }`}>
        <div className={`p-3 rounded-xl ${
          netPosition >= 0 ? 'bg-[#38bdf8]/10 text-[#38bdf8]' : 'bg-red-500/10 text-red-500'
        }`}>
          <TrendingUp size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#94a3b8]">Net Position</p>
          <h4 className={`text-3xl font-extrabold mt-1 ${
            netPosition >= 0 ? 'text-[#38bdf8]' : 'text-red-500'
          }`}>
            {formatCurrency(netPosition)}
          </h4>
        </div>
      </div>

    </div>
  );
};

export default FinancialOverview;