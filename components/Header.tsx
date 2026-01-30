
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="pt-10 pb-6 px-6 text-center border-b border-zinc-900 bg-zinc-950">
      <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-white">
        NAIJA <span className="text-orange-600">SCAN</span>
      </h1>
      <p className="mt-2 text-zinc-400 text-lg font-medium">57KG &rarr; 70KG Mass Mastery</p>
      <div className="mt-4 flex justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 50KG Barbell</span>
        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 10KG DBs</span>
        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> X-Frame</span>
      </div>
    </header>
  );
};

export default Header;
