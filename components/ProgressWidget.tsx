
import React, { useState } from 'react';
import { UserStats } from '../types';

interface ProgressWidgetProps {
  stats: UserStats;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({ stats, setStats }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempWeight, setTempWeight] = useState(stats.currentWeight);

  const progressPercent = Math.min(
    100,
    Math.max(0, ((stats.currentWeight - 57) / (stats.targetWeight - 57)) * 100)
  );

  const handleUpdate = () => {
    setStats(prev => ({ ...prev, currentWeight: tempWeight }));
    setIsEditing(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl -z-10"></div>
      
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Mass Progress</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{stats.currentWeight}</span>
            <span className="text-zinc-500 font-bold uppercase text-sm">kg</span>
          </div>
        </div>
        
        {isEditing ? (
          <div className="flex gap-2">
            <input 
              type="number"
              step="0.1"
              value={tempWeight}
              onChange={(e) => setTempWeight(parseFloat(e.target.value))}
              className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-white text-sm"
              autoFocus
            />
            <button 
              onClick={handleUpdate}
              className="bg-orange-600 text-white text-xs px-3 py-1 rounded-lg font-bold"
            >
              Save
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs text-zinc-500 hover:text-orange-500 font-bold underline decoration-zinc-800 underline-offset-4"
          >
            Update Weight
          </button>
        )}
      </div>

      <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-orange-700 to-orange-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(234,88,12,0.4)]"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
        <span>Starting 57kg</span>
        <span className="text-orange-500">{Math.round(progressPercent)}% Complete</span>
        <span>Goal 70kg</span>
      </div>
    </div>
  );
};

export default ProgressWidget;
