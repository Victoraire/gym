
import React, { useState, useEffect } from 'react';
import { WORKOUT_DAYS } from './constants';
import { WorkoutDay, UserStats } from './types';
import Header from './components/Header';
import WorkoutCard from './components/WorkoutCard';
import RuleCard from './components/RuleCard';
import AIAssistant from './components/AIAssistant';
import ProgressWidget from './components/ProgressWidget';

const App: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>(() => {
    const today = new Date().getDay(); // 0 (Sun) to 6 (Sat)
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return map[today];
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('naija-scan-stats');
    if (saved) return JSON.parse(saved);
    return { currentWeight: 57, targetWeight: 70, height: 179 };
  });

  useEffect(() => {
    localStorage.setItem('naija-scan-stats', JSON.stringify(stats));
  }, [stats]);

  const selectedDay = WORKOUT_DAYS.find(d => d.id === selectedDayId) || WORKOUT_DAYS[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24 selection:bg-orange-500/30">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-10">
        {/* Progress Tracker */}
        <section>
          <ProgressWidget stats={stats} setStats={setStats} />
        </section>

        {/* Day Selector */}
        <section className="sticky top-4 z-40 bg-zinc-950/90 backdrop-blur-xl p-2 rounded-2xl border border-zinc-800 shadow-2xl">
          <div className="flex space-x-2 overflow-x-auto no-scrollbar scroll-smooth">
            {WORKOUT_DAYS.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-black tracking-tight transition-all duration-300 ${
                  selectedDayId === day.id
                    ? 'bg-orange-600 text-white shadow-[0_0_25px_rgba(234,88,12,0.4)] scale-105'
                    : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
              >
                {day.title}
              </button>
            ))}
          </div>
        </section>

        {/* Selected Workout / Rest Timer Flow */}
        <section className="min-h-[400px]">
          <WorkoutCard day={selectedDay} />
        </section>

        {/* The 3 Rules */}
        <section className="space-y-6">
          <h2 className="text-xl font-black flex items-center gap-3 px-1 uppercase tracking-tighter">
            <span className="w-1.5 h-6 bg-orange-600 rounded-full"></span>
            Growth Foundations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RuleCard 
              num={1}
              title="Tempo over Load"
              content="Capped at 50kg? Use 4s eccentrics. Time under tension is what recruits those deep fibers."
              color="border-orange-500/30"
            />
            <RuleCard 
              num={2}
              title="Hyper-Surplus"
              content="179cm furnaces need fuel. PB & Milk are your best friends. Don't let your stomach stay empty."
              color="border-orange-500/30"
            />
            <RuleCard 
              num={3}
              title="Core Stability"
              content="Russian twists aren't for 'abs'—they're for core armor to protect you during heavy barbell work."
              color="border-orange-500/30"
            />
          </div>
        </section>
      </main>

      {/* Persistent Floating AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default App;
