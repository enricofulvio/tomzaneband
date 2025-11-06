
import React, { useState, useEffect, useMemo } from 'react';
import Gauge from './components/Gauge';
import GearIcon from './components/GearIcon';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
}

const App: React.FC = () => {
  const launchDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    date.setHours(0, 0, 0, 0); // Start the countdown from midnight of the 10th day.
    return date;
  }, []);

  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +launchDate - +new Date();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const totalHours = difference / (1000 * 60 * 60);
      return { days, hours, minutes, seconds, totalHours };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const totalInitialHours = 10 * 24;

  return (
    <div className="bg-slate-900 min-h-screen text-amber-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_rgba(255,255,255,0)_60%)]"></div>
      
      {/* Decorative Gears */}
      <div className="absolute top-4 left-4 opacity-20">
        <GearIcon className="w-24 h-24 text-slate-700 animate-spin" style={{ animationDuration: '20s' }} />
      </div>
      <div className="absolute bottom-10 right-[-50px] opacity-20">
        <GearIcon className="w-48 h-48 text-slate-700 animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
      </div>
       <div className="absolute top-1/2 left-[-60px] opacity-10">
        <GearIcon className="w-36 h-36 text-slate-600 animate-spin" style={{ animationDuration: '25s' }} />
      </div>


      <main className="z-10 flex flex-col items-center text-center">
        <Gauge 
          days={timeLeft?.days ?? 0}
          hours={timeLeft?.hours ?? 0}
          minutes={timeLeft?.minutes ?? 0}
          seconds={timeLeft?.seconds ?? 0}
          totalHours={timeLeft?.totalHours ?? 0}
          maxHours={totalInitialHours}
        />

        <div className="mt-8 max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-bold text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            {timeLeft ? `${timeLeft.days} days until the sonic disaster.` : 'The time has come.'}
          </h1>
          <p className="mt-4 text-base md:text-lg text-amber-100/80 leading-relaxed">
            Prepare your steam-powered headphones. Will you be there? 🔥
          </p>
          <div className="mt-6 text-sm md:text-base bg-slate-800/50 border border-amber-500/30 rounded-lg px-4 py-3 inline-block font-mono">
            <p className="text-amber-400 select-all">
              Tag us in your Stories! #Countdown #File: TOM_ZANE_ORIGIN.exe
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
