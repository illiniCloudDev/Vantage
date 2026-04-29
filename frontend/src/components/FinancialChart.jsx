import React, {useMemo} from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

const FinancialChart = ({transactions}) => {
    //need to write logic for dynamic data
    const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // Group transactions by date
    const totals = transactions.reduce((acc, curr) => {
      // Ensure the bucket exists for this date
      if (!acc[curr.date]) {
        acc[curr.date] = { name: curr.date, income: 0, expense: 0 };
      }

      const amount = parseFloat(curr.amount) || 0;

      // Fill the bucket based on type
      if (curr.type === 'income') {
        acc[curr.date].income += amount;
      } else {
        acc[curr.date].expense += amount;
      }

      return acc; // The "Baton": Pass the storage object to the next loop
    }, {});

    // Convert object to array and sort by date so the timeline is correct
    return Object.values(totals).sort((a, b) => new Date(a.name) - new Date(b.name));
  }, [transactions]); // Only re-run if transactions change

  
    return(
    <div className="bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] h-[400px] w-full mb-10">
      <h3 className="text-white font-bold mb-6 text-lg">Cash Flow Analysis</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f293a" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
            tickFormatter={(str) => {
              const date = new Date(str);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
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