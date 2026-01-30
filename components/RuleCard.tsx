
import React from 'react';

interface RuleCardProps {
  num: number;
  title: string;
  content: string;
  color: string;
}

const RuleCard: React.FC<RuleCardProps> = ({ num, title, content, color }) => {
  return (
    <div className={`p-5 rounded-2xl bg-zinc-900 border-l-4 ${color} shadow-lg h-full`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-[10px] font-black">
          {num}
        </span>
        <h4 className="font-bold text-zinc-100 text-sm">{title}</h4>
      </div>
      <p className="text-zinc-400 text-xs leading-relaxed font-medium">
        {content}
      </p>
    </div>
  );
};

export default RuleCard;
