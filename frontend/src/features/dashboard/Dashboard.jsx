import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../../components/ui/GlassCard';
import { Plus, Wallet } from 'lucide-react';
import AddTransactionModal from '../rapid-log/AddTransactionModal'; // <--- IMPORT THIS

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- STATE
  
  // Mock Data
  const spendingData = [
    { name: 'Food', value: 4500 },
    { name: 'Travel', value: 2000 },
    { name: 'Bills', value: 3000 },
    { name: 'Misc', value: 1200 },
  ];
  const COLORS = ['#C9B59C', '#D9CFC7', '#EFE9E3', '#A89F91'];

  // Handle the "Log Expense" click
  const handleAddTransaction = (transactionData) => {
    console.log("Saving to Backend:", transactionData);
    // TODO: In the next step, we will connect this to the FastAPI backend
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans p-4 md:p-8">
      
      {/* --- Header Code (Same as before) --- */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Financial Health</h1>
          <p className="text-accent font-medium mt-1">October 2025</p>
        </div>
        <button className="h-12 w-12 bg-surface rounded-full border border-muted flex items-center justify-center hover:bg-white transition-colors">
           <div className="h-8 w-8 bg-accent/30 rounded-full"></div>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Safe To Spend (Same as before) */}
            <GlassCard className="bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-surface rounded-xl">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+4% vs last mo</span>
              </div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Safe to Spend</h3>
              <div className="text-4xl font-light tracking-tight">₹12,400</div>
              <div className="mt-6">
                 <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[46%] rounded-full"></div>
                </div>
              </div>
            </GlassCard>

            {/* Rapid Log Action - UPDATED ONCLICK */}
            <GlassCard 
              onClick={() => setIsModalOpen(true)} // <--- TRIGGERS MODAL
              className="bg-surface border-muted flex flex-col justify-center items-center cursor-pointer group hover:scale-[1.02] transition-transform"
            >
               <div className="h-14 w-14 bg-accent rounded-full flex items-center justify-center text-white shadow-lg mb-3 group-hover:bg-ink transition-colors">
                 <Plus className="w-8 h-8" />
               </div>
               <span className="font-medium text-lg text-ink">Rapid Log Cash</span>
               <p className="text-xs text-gray-500 mt-1">Add expense in 3 clicks</p>
            </GlassCard>
          </div>
          
          {/* --- Recent Activity List (Same as before) --- */}
          {/* ... */}
        </div>

        {/* --- Right Column (Same as before) --- */}
        {/* ... */}
      </div>

      {/* RENDER MODAL */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default Dashboard;