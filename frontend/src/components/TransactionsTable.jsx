import React from 'react';
import {Pencil, Trash2} from 'lucide-react';

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Type", "Actions"];

const TransactionsTable = ({ transactions, onDelete, onEdit}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#1f293a] bg-[#0d172a] shadow-2xl">
      <div className="p-6 border-b border-[#1f293a]">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <p className="text-sm text-[#94a3b8]">Your latest financial movements</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#0a1120] text-[#94a3b8] text-xs uppercase">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="px-6 py-4 font-semibold tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f293a]">
            {transactions.map((row) => (
              <tr key={row._id} className="hover:bg-[#162033] transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{row.name}</td>
                <td className="px-6 py-4 text-sm text-[#38bdf8] font-bold">{row.amount}</td>
                <td className="px-6 py-4 text-sm text-[#94a3b8]">{row.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'paid' ? 'bg-green-500/10 text-green-500' : 
                    row.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={row.type === 'income' ? 'text-green-400' : 'text-rose-400'}>
                    {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                 </span>
                </td>
                <td className="px-6 py-4">
                  <div className='flex items-center gap-3'>
                    <button
                    onClick={() => onDelete(row._id)}
                    className='p-2 text-slate-400 hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 rounded-lg transition-all'
                    title="Delete Transaction"
                    >
                      <Trash2 size={18}></Trash2>
                    </button>
                    <button
                    onClick={() => onEdit(row)}
                    className='p-2 text-slate-400 hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 rounded-lg transition-all'
                    title="Edit Transaction"
                    >
                      <Pencil size={18}></Pencil>
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;