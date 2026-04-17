import React, { useState } from 'react';

const AddTransactionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. Create the final object (adding the 'title' for FullCalendar)
    const newTransaction = {
      ...formData,
      title: `${formData.name} (${formData.amount})`,
      status: 'paid', // Default for now
    };

    // 2. Send it up to the Dashboard
    onAdd(newTransaction);

    // 3. Clear the form
    setFormData({ name: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] mb-8">
      <h3 className="text-xl font-bold mb-4">Add Transaction</h3>
      <div className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Trade Name (e.g. AMD Call)" 
          className="bg-[#0a1120] border border-[#1f293a] p-3 rounded-xl focus:border-[#38bdf8] outline-none"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Amount" 
            className="w-1/2 bg-[#0a1120] border border-[#1f293a] p-3 rounded-xl focus:border-[#38bdf8] outline-none"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
          <input 
            type="date" 
            className="w-1/2 bg-[#0a1120] border border-[#1f293a] p-3 rounded-xl focus:border-[#38bdf8] outline-none"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="bg-[#38bdf8] text-[#0a1120] font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform">
          Add to Vantage
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;