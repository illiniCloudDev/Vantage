import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

const FinancialChart = () => {

    const data = [
            {name: 'Week 1', income: 10000, expense: 2400},
            {name: 'Week 2', income: 10000, expense: 1200},
            {name: 'Week 3', income: 10000, expense: 600},
            {name: 'Week 4', income: 10000, expense: 300}
        ];
    return(
    <div className="bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] h-[400px] w-full mb-10">
      <h3 className="text-white font-bold mb-6 text-lg">Cash Flow Analysis</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f293a" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={{ fill: '#1e293b', opacity: 0.4 }}
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1f293a', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
          <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
        
    )
}

export default FinancialChart