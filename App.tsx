
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* Progress Tracker */}
        <section>
          <ProgressWidget stats={stats} setStats={setStats} />
        </section>

        {/* Day Selector */}
        <section className="sticky top-4 z-40 bg-zinc-950/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-800 overflow-x-auto">
          <div className="flex space-x-2">
            {WORKOUT_DAYS.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedDayId === day.id
                    ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {day.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </section>

        {/* Selected Workout */}
        <section>
          <WorkoutCard day={selectedDay} />
        </section>

        {/* The 3 Rules */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 px-1">
            <span className="w-2 h-6 bg-orange-600 rounded-full"></span>
            The 3 Pillars for Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RuleCard 
              num={1}
              title="The Clean Slate Rule"
              content="Equipment is capped at 50kg. Once it feels light, slow down. Make 50kg feel like 100kg with 4s eccentrics."
              color="border-orange-500/30"
            />
            <RuleCard 
              num={2}
              title="Naija Fuel"
              content="You are a furnace at 179cm. Eat peanut butter, whole milk, and dense carbs. Surplus is mandatory."
              color="border-orange-500/30"
            />
            <RuleCard 
              num={3}
              title="Functional Core"
              content="Don't skip side bends and twists. A strong core protects your spine during 50kg heavy squats/rows."
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
