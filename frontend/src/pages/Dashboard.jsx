import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Dashboard = () => {

    const events = [
        { title: 'Meeting with Team', date: '2026-04-01' },
        { title: 'Project Deadline', date: '2026-04-05' },
        { title: 'Client Presentation', date: '2026-04-10' },
    ];

    const renderEventContent = (eventInfo) => {
        return (
            <div className='p-1 overflow-hidden text-xs'>
                <b className='text-sm'>{eventInfo.timeText}</b>
                <p>{eventInfo.event.title}</p>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Changed text-black to text-white for visibility */}
            <h1 className="text-3xl font-bold mb-8 text-white border-b border-[#1f293a] pb-4">
                Financial Vantage Point
            </h1>
            
            {/* 12-Column Grid: lg:grid-cols-12 gives us the 1/3 to 2/3 split control */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                
                {/* Left Column: Transactions (Takes up 4 of 12 columns) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#0d172a] p-6 rounded-3xl border border-[#1f293a] shadow-2xl min-h-[400px]">
                        <h2 className='text-white text-xl font-bold mb-4 border-b border-[#1f293a] pb-2'>
                            Transactions
                        </h2>
                        
                        {/* Placeholder for your future Transaction Form or List */}
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#1f293a] rounded-2xl">
                            <p className="text-[#94a3b8] italic text-sm text-center px-4">
                                Add a trade or expense to see it reflected on your vantage point.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Calendar (Takes up 8 of 12 columns) */}
                <div className="lg:col-span-8 bg-[#0d172a] p-6 rounded-3xl border border-[#1f293a] shadow-2xl calendar-container text-white">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        events={events}
                        eventContent={renderEventContent}
                        height="auto"
                    />
                </div>
            </div>
        </div>
    );

}

export default Dashboard;