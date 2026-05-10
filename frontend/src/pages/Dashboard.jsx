import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TransactionsTable from '../components/TransactionsTable';
import AddTransactionForm from '../components/AddTransactionForm';
import FinancialOverview from '../components/FinancialOverview';
import FinancialChart from '../components/FinancialChart';
import { getTransactions, deleteTransaction, createTransaction, updateTransaction } from '../services/transactionService';
import { useEffect } from 'react';

const Dashboard = () => {

    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    //Fetch transactions from backend
    useEffect(() => {
      const fetchTransactions = async () => {
        try{
          const response = await getTransactions()
          console.log(response)

          const formattedData = response.data.map(t => ({
                    ...t,
                    displayAmount: new Intl.NumberFormat( 'en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(t.amount),
                    title: `${t.name} ($${t.amount})`
                }));
                
                setTransactions(formattedData);
        }
        catch (error){
          console.log("Fetch failed", error)

        }
      };
      fetchTransactions();

    }, []);

    const handleTransaction = async (newTrade) => {
        try {
            // Send to Backend
            //making sure amount is set to a number
            const finalTrade = {
              ...newTrade,
              amount: Number(newTrade.amount)
            };
            const response = await createTransaction(finalTrade);
            
            // Add 'title' to the newly saved trade for the UI
            const addedTrade = {
                ...response.data,
                title: `${response.data.name} ($${response.data.amount})`
            };

            setTransactions([addedTrade, ...transactions]);
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    const handleDelete = async (id) => {
      try{
        //deleting in backend
        await deleteTransaction(id)
        //updating UI for deleted trade
        setTransactions(transactions.filter(t => t._id !== id));
        console.log(`Transaction deleted successfully! id: ${id}`)

      }catch(error){
        console.error('Delete Failed', error)
      }
    }

    //editing mode
    const handleEdit = (transaction) => {
      setEditingTransaction(transaction);
    };
    //cancels edit mode
    const handleCancel = () => {
      setEditingTransaction(null); // This clears the form and resets the button to blue
    };
    const handleUpdate = async (id, updatedData) => {
      console.log(id,updatedData)
      try {
        const response = await updateTransaction(id, updatedData);
        //update UI
        setTransactions(transactions.map(t => 
          t._id === id ? { ...response.data, title: `${response.data.name} ($${response.data.amount})` } : t
    ));
        setEditingTransaction(null)
      } catch (error) {
        console.log("Update failed", error)
        
      }
    }


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
        <FinancialOverview
        transactions={transactions}/>
        <FinancialChart transactions={transactions}/>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Transactions Table */}
          <div className="lg:col-span-5">
            <AddTransactionForm 
            onAdd={handleTransaction}
            editingTransaction={editingTransaction}
            onUpdate={handleUpdate}
            onCancel={handleCancel}

            />
            <TransactionsTable 
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
             />
          </div>

          {/* RIGHT: Calendar */}
          <div className="lg:col-span-7 bg-[#0d172a] p-6 rounded-2xl border border-[#1f293a] shadow-xl">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={transactions} // 2. Pass the same state here!
              eventContent={renderEventContent}
              height="auto"
              timeZone='UTC'
            />
          </div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard;