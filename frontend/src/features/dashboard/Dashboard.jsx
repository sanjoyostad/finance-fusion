import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../../components/ui/GlassCard';
import { Plus, Wallet } from 'lucide-react';
import AddTransactionModal from '../rapid-log/AddTransactionModal';
import { getTransactions, createTransaction } from '../../services/api'; // <--- Import API

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]); // <--- Store Real Data
  const [totalSpent, setTotalSpent] = useState(0);

  // 1. Load Data when app starts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTransactions();
    setTransactions(data);
    
    // Calculate Total
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    setTotalSpent(total);
  };

  // 2. Save Data when you click "Log Expense"
  const handleAddTransaction = async (transactionData) => {
    try {
      await createTransaction(transactionData); // Send to Python
      await fetchData(); // Refresh list immediately
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to save. Is the backend running?");
    }
  };

  // Prepare Chart Data
  const chartData = transactions.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);
  
  const COLORS = ['#C9B59C', '#D9CFC7', '#EFE9E3', '#A89F91'];

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans p-4 md:p-8">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Financial Health</h1>
          <p className="text-accent font-medium mt-1">Overview</p>
        </div>
        <div className="h-12 w-12 bg-surface rounded-full border border-muted flex items-center justify-center">
           <div className="h-8 w-8 bg-accent/30 rounded-full"></div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Total Spent Card */}
            <GlassCard className="bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-surface rounded-xl">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Total Spent</h3>
              <div className="text-4xl font-light tracking-tight">₹{totalSpent.toLocaleString()}</div>
            </GlassCard>

            {/* Rapid Log Button */}
            <GlassCard 
              onClick={() => setIsModalOpen(true)}
              className="bg-surface border-muted flex flex-col justify-center items-center cursor-pointer group hover:scale-[1.02] transition-transform"
            >
               <div className="h-14 w-14 bg-accent rounded-full flex items-center justify-center text-white shadow-lg mb-3 group-hover:bg-ink transition-colors">
                 <Plus className="w-8 h-8" />
               </div>
               <span className="font-medium text-lg text-ink">Rapid Log Cash</span>
            </GlassCard>
          </div>

          {/* Recent Activity List */}
          <GlassCard>
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {transactions.length === 0 ? (
                <p className="text-gray-400 text-sm">No transactions yet.</p>
              ) : (
                transactions.slice().reverse().map((t) => (
                  <div key={t.id} className="flex justify-between items-center py-2 border-b border-muted/30 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-surface rounded-full flex items-center justify-center text-lg">
                        {t.category === 'Food' ? '🍔' : t.category === 'Travel' ? '🚕' : '🛍️'}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{t.description}</p>
                        <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="font-medium text-ink">- ₹{t.amount}</span>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>

        {/* Analytics Chart */}
        <div className="space-y-6">
          <GlassCard className="h-full flex flex-col min-h-[400px]">
            <h3 className="text-lg font-medium mb-6">Spending Breakdown</h3>
            <div className="flex-1 relative">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      innerRadius={60} 
                      outerRadius={80} 
                      paddingAngle={5} 
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Add expenses to see chart
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default Dashboard;