
import React, { useState, useEffect, useCallback } from 'react';

interface RestTimerProps {
  onComplete: () => void;
  onCancel: () => void;
}

const INTENSITIES = [
  { label: 'Low', time: 60, desc: '60s' },
  { label: 'Mid', time: 90, desc: '90s' },
  { label: 'High', time: 120, desc: '120s' },
  { label: 'Max', time: 180, desc: '180s' },
];

const RestTimer: React.FC<RestTimerProps> = ({ onComplete, onCancel }) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    const saved = localStorage.getItem('naija-rest-pref');
    return saved ? parseInt(saved) : 90;
  });
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    localStorage.setItem('naija-rest-pref', selectedTime.toString());
  }, [selectedTime]);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {}); // Catch browser blocking autoplay
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setIsActive(true);
  };

  return (
    <div className="bg-zinc-900 border border-orange-500/30 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(234,88,12,0.1)] animate-in fade-in zoom-in duration-300">
      <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">Resting for Growth</h3>
      
      <div className="relative inline-flex items-center justify-center mb-8">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-zinc-800"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={552.9}
            strokeDashoffset={552.9 * (1 - timeLeft / selectedTime)}
            className="text-orange-600 transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-white tabular-nums">{formatTime(timeLeft)}</span>
          <span className="text-zinc-500 text-xs font-bold mt-1">REMAINING</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {INTENSITIES.map((intensity) => (
          <button
            key={intensity.label}
            onClick={() => resetTimer(intensity.time)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTime === intensity.time
                ? 'bg-orange-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {intensity.label} ({intensity.desc})
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-2xl bg-zinc-800 text-zinc-300 font-bold text-sm hover:bg-zinc-700 transition-colors"
        >
          Skip Rest
        </button>
        <button
          onClick={() => setTimeLeft(0)}
          className="flex-1 py-3 rounded-2xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 transition-colors"
        >
          I'm Ready
        </button>
      </div>
    </div>
  );
};

export default RestTimer;
