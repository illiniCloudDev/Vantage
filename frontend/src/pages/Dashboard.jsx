import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TransactionsTable from '../components/TransactionsTable';

const Dashboard = () => {

    const [transactions, setTransactions] = useState([
        { name: 'Bought AAPL', title: 'Bought AAPL', amount: '-$1500', date: '2026-04-01', status: 'paid' },
        { name: 'Sold TSLA', title: 'Sold TSLA', amount: '+$2000', date: '2026-04-03', status: 'pending' },
        { name: 'Dividend from MSFT', title: 'Dividend from MSFT', amount: '+$300', date: '2026-04-05', status: 'failed' },
    ]);


    const renderEventContent = (eventInfo) => {
    return (
        <div className="p-1 bg-[#38bdf8]/20 text-[#FFFFFF] rounded border border-[#38bdf8]/40 overflow-hidden w-full">
            {/* Using a smaller font size ensures it fits in the calendar box */}
            <div className="text-[10px] sm:text-xs leading-tight">
                {eventInfo.event.title}
            </div>
        </div>
    );
};
    
return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Financial Vantage Point</h1>
          <p className="text-slate-400">Welcome back, here is your market overview.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Transactions Table */}
          <div className="lg:col-span-5">
            <TransactionsTable transactions={transactions} />
          </div>

          {/* RIGHT: Calendar */}
          <div className="lg:col-span-7 bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] shadow-xl">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={transactions} // 2. Pass the same state here!
              eventContent={renderEventContent}
              height="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard;