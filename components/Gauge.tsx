
import React from 'react';

interface GaugeProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  maxHours: number;
}

const Gauge: React.FC<GaugeProps> = ({ days, hours, minutes, seconds, totalHours, maxHours }) => {
  const pressure = Math.max(0, totalHours / maxHours);
  
  // The gauge arc is 270 degrees, from -135deg (at 0) to +135deg (at max)
  const angle = -135 + pressure * 270;

  const ticks = Array.from({ length: 11 }, (_, i) => {
    const value = i; // Days 0 to 10
    const tickAngle = -135 + (i / 10) * 270;
    const x1 = 150 + 110 * Math.cos((tickAngle - 90) * (Math.PI / 180));
    const y1 = 150 + 110 * Math.sin((tickAngle - 90) * (Math.PI / 180));
    const x2 = 150 + (i % 5 === 0 ? 125 : 120) * Math.cos((tickAngle - 90) * (Math.PI / 180));
    const y2 = 150 + (i % 5 === 0 ? 125 : 120) * Math.sin((tickAngle - 90) * (Math.PI / 180));
    const tx = 150 + 135 * Math.cos((tickAngle - 90) * (Math.PI / 180));
    const ty = 150 + 135 * Math.sin((tickAngle - 90) * (Math.PI / 180));

    return {
      value,
      line: { x1, y1, x2, y2 },
      text: { x: tx, y: ty },
    };
  });

  return (
    <div className="w-80 h-80 md:w-96 md:h-96 relative drop-shadow-2xl">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <radialGradient id="brassGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#fde047', stopOpacity: 1 }} />
            <stop offset="60%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
            <stop offset="95%" style={{ stopColor: '#854d0e', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#422006', stopOpacity: 1 }} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Casing */}
        <circle cx="150" cy="150" r="150" fill="url(#brassGradient)" />
        <circle cx="150" cy="150" r="145" fill="#1e293b" />
        <circle cx="150" cy="150" r="142" fill="url(#brassGradient)" />

        {/* Gauge Face */}
        <circle cx="150" cy="150" r="138" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />

        {/* Ticks and Labels */}
        <g stroke="#334155">
          {ticks.map(tick => (
            <line key={`line-${tick.value}`} {...tick.line} strokeWidth={tick.value % 5 === 0 ? 3 : 1.5} />
          ))}
        </g>
        <g fill="#1e293b" textAnchor="middle" dominantBaseline="middle" className="font-sans font-bold text-sm">
          {ticks.map(tick => (
            <text key={`text-${tick.value}`} x={tick.text.x} y={tick.text.y}>{tick.value}</text>
          ))}
        </g>
        <text x="150" y="80" textAnchor="middle" className="text-xl font-bold fill-slate-700 tracking-widest">DAYS</text>

        {/* Digital Display */}
        <rect x="75" y="160" width="150" height="60" rx="5" fill="#1e293b" />
        <text x="150" y="195" textAnchor="middle" dominantBaseline="middle" className="font-orbitron text-[22px] font-bold fill-amber-300" filter="url(#glow)">
          {`${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </text>
        <text x="150" y="150" textAnchor="middle" className="text-xs fill-slate-500 font-orbitron">D&nbsp;&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;S</text>

        {/* Main Needle */}
        <g transform={`rotate(${angle}, 150, 150)`}>
          <polygon points="150,30 158,155 142,155" fill="#dc2626" />
          <circle cx="150" cy="150" r="12" fill="#475569" stroke="#1e293b" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

export default Gauge;
