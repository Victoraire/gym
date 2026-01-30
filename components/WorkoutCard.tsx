
import React, { useState, useEffect } from 'react';
import { WorkoutDay, WorkoutSession } from '../types';
import RestTimer from './RestTimer';

interface WorkoutCardProps {
  day: WorkoutDay;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day }) => {
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [currentDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Load session progress from storage
  useEffect(() => {
    const savedSessions = localStorage.getItem('naija-workout-sessions');
    if (savedSessions) {
      const sessions: WorkoutSession[] = JSON.parse(savedSessions);
      const todaySession = sessions.find(s => s.dayId === day.id && s.date === currentDate);
      if (todaySession) {
        setCompletedIndices(todaySession.completedExerciseIndices);
      } else {
        setCompletedIndices([]);
      }
    } else {
      setCompletedIndices([]);
    }
    setIsResting(false);
  }, [day.id, currentDate]);

  // Save session progress
  const updateProgress = (newIndices: number[]) => {
    setCompletedIndices(newIndices);
    const savedSessions = localStorage.getItem('naija-workout-sessions');
    let sessions: WorkoutSession[] = savedSessions ? JSON.parse(savedSessions) : [];
    
    const index = sessions.findIndex(s => s.dayId === day.id && s.date === currentDate);
    if (index > -1) {
      sessions[index].completedExerciseIndices = newIndices;
    } else {
      sessions.push({ dayId: day.id, date: currentDate, completedExerciseIndices: newIndices });
    }
    
    // Keep last 30 days only
    if (sessions.length > 30) sessions.shift();
    localStorage.setItem('naija-workout-sessions', JSON.stringify(sessions));
  };

  const handleComplete = (idx: number) => {
    if (completedIndices.includes(idx)) return;
    updateProgress([...completedIndices, idx]);
    
    // Only rest if it's not the last exercise
    if (idx < day.exercises.length - 1) {
      setIsResting(true);
    }
  };

  const handleReset = () => {
    if (confirm("Reset today's progress for this workout?")) {
      updateProgress([]);
      setIsResting(false);
    }
  };

  if (day.isRest) {
    return (
      <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center">
        <div className="text-5xl mb-4">🧘</div>
        <h2 className="text-2xl font-bold text-zinc-100">{day.title}</h2>
        <p className="text-zinc-400 mt-2 max-w-sm mx-auto">{day.focus}. Take a walk, stretch, or vibecode. Recovery is where the muscle grows.</p>
      </div>
    );
  }

  if (isResting) {
    return (
      <RestTimer 
        onComplete={() => setIsResting(false)} 
        onCancel={() => setIsResting(false)} 
      />
    );
  }

  const allDone = completedIndices.length === day.exercises.length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl animate-in fade-in duration-500">
      <div className="p-6 border-b border-zinc-800 bg-zinc-800/30 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{day.title}</h2>
          <p className="text-orange-500 font-bold text-xs uppercase tracking-widest">{day.focus}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Workout Progress</div>
          <div className="flex gap-1">
            {day.exercises.map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-1.5 rounded-full transition-all duration-300 ${
                  completedIndices.includes(i) ? 'bg-orange-600' : 'bg-zinc-800'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-zinc-800">
        {day.exercises.map((ex, idx) => {
          const isCompleted = completedIndices.includes(idx);
          const isNext = !isCompleted && (idx === 0 || completedIndices.includes(idx - 1));
          
          return (
            <div 
              key={idx} 
              className={`p-6 transition-all duration-300 ${
                isCompleted ? 'opacity-40 bg-zinc-950/20' : isNext ? 'bg-zinc-800/20' : 'opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-colors ${
                    isCompleted 
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-500' 
                      : isNext 
                        ? 'bg-orange-600 border-orange-500 text-white shadow-[0_0_10px_rgba(234,88,12,0.5)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold transition-colors ${isNext ? 'text-white' : 'text-zinc-300'}`}>
                      {ex.name}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">
                        {ex.sets} Sets × {ex.reps} Reps
                      </span>
                    </div>
                  </div>
                </div>
                
                {isNext && (
                  <button
                    onClick={() => handleComplete(idx)}
                    className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-black px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-900/20"
                  >
                    MARK DONE
                  </button>
                )}
              </div>
              
              <p className={`text-sm leading-relaxed italic border-l-2 pl-3 transition-colors ${
                isNext ? 'border-orange-600 text-zinc-400' : 'border-zinc-800 text-zinc-600'
              }`}>
                {ex.description}
              </p>
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="p-8 bg-zinc-950/50 text-center animate-in slide-in-from-bottom-2 duration-500">
          <div className="text-4xl mb-3">🔥</div>
          <h3 className="text-xl font-black text-white">WORKOUT COMPLETE!</h3>
          <p className="text-zinc-500 text-sm mt-1 mb-6">Mass is built in the kitchen now. Go eat!</p>
          <button 
            onClick={handleReset}
            className="text-xs font-bold text-zinc-600 hover:text-zinc-400 underline underline-offset-4"
          >
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;
