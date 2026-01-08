import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const categories = [
  { id: 'food', name: 'Food', icon: '🍔' },
  { id: 'travel', name: 'Travel', icon: '🚕' },
  { id: 'bills', name: 'Bills', icon: '💡' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
];

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    
    onSubmit({
      amount: parseFloat(amount),
      category: selectedCategory,
      description: description || 'Cash Expense',
      source_type: 'CASH',
      date: new Date().toISOString()
    });
    
    // Reset and Close
    setAmount('');
    setDescription('');
    onClose();
  };

  return (
    // 1. Backdrop (Glass effect)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* 2. Modal Window */}
      <div className="bg-canvas w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/40 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-muted/30">
          <h2 className="text-xl font-semibold text-ink">New Cash Entry</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Amount Input (Huge, Apple-style focus) */}
          <div className="flex flex-col items-center">
             <label className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">Amount</label>
             <div className="relative">
               <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400">₹</span>
               <input 
                 type="number" 
                 autoFocus
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 className="w-full text-center text-5xl font-light bg-transparent border-none outline-none text-ink placeholder-gray-200"
                 placeholder="0"
               />
             </div>
          </div>

          {/* Category Selector (Pills) */}
          <div>
            <label className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-3 block">Category</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={twMerge(
                    "flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap",
                    selectedCategory === cat.id 
                      ? "bg-ink text-white border-ink shadow-lg scale-105" 
                      : "bg-surface text-gray-600 border-transparent hover:bg-white"
                  )}
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description (Optional) */}
          <div>
            <input 
               type="text" 
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Add a note (e.g. 'Lunch with team')" 
               className="w-full bg-surface/50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-accent/50 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={!amount}
            className="w-full bg-accent hover:bg-[#BFA685] text-white font-medium py-4 rounded-xl shadow-soft flex justify-center items-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            <span>Log Expense</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;