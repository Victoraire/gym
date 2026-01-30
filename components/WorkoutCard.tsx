
import React from 'react';
import { WorkoutDay } from '../types';

interface WorkoutCardProps {
  day: WorkoutDay;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day }) => {
  if (day.isRest) {
    return (
      <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center">
        <div className="text-5xl mb-4">🧘</div>
        <h2 className="text-2xl font-bold text-zinc-100">{day.title}</h2>
        <p className="text-zinc-400 mt-2 max-w-sm mx-auto">{day.focus}. Take a walk, stretch, or vibecode. Recovery is where the muscle grows.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-zinc-800 bg-zinc-800/30 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">{day.title}</h2>
          <p className="text-orange-500 font-semibold text-sm">{day.focus}</p>
        </div>
        <div className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full border border-zinc-700 font-bold uppercase">
          Today's Split
        </div>
      </div>
      
      <div className="divide-y divide-zinc-800">
        {day.exercises.map((ex, idx) => (
          <div key={idx} className="p-6 hover:bg-zinc-800/40 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors">{idx + 1}. {ex.name}</h3>
              <div className="flex gap-2">
                <span className="bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded border border-zinc-700 font-bold">
                  {ex.sets} Sets
                </span>
                <span className="bg-zinc-800 text-orange-500 text-xs px-2 py-1 rounded border border-zinc-700 font-bold">
                  {ex.reps} Reps
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-zinc-800 pl-3">
              {ex.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutCard;
