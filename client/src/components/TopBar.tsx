import { Settings, Gamepad2, Battery } from 'lucide-react';
import React from 'react';

const SettingsIcon = Settings as React.FC<React.SVGProps<SVGSVGElement>>;
const GamepadIcon = Gamepad2 as React.FC<React.SVGProps<SVGSVGElement>>;
const BatteryIcon = Battery as React.FC<React.SVGProps<SVGSVGElement>>;

const TopBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-between items-start">
        
        {/* Logo + Team Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-cyan-400 font-bold text-sm tracking-wider">PENGUINS TEAM</h1>
            <p className="text-cyan-600 text-xs">MAKE NOV 2024 | PIONEER</p>
          </div>
        </div>

        {/* Clock + Controls */}
        <div className="text-center">
          <div className="text-5xl font-bold text-cyan-400 tracking-wider">
            15:00
          </div>
          <div className="flex gap-2 justify-center mt-2">
            <div className="w-6 h-6 bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center rounded">
              <span className="text-cyan-400 text-xs">▶</span>
            </div>
            <div className="w-6 h-6 bg-yellow-500/30 backdrop-blur-sm border border-yellow-400/50 flex items-center justify-center rounded">
              <span className="text-yellow-400 text-xs">⏸</span>
            </div>
            <div className="w-6 h-6 bg-pink-500/30 backdrop-blur-sm border border-pink-400/50 flex items-center justify-center rounded">
              <span className="text-pink-400 text-xs">⏹</span>
            </div>
          </div>
        </div>

        {/* Buttons + Battery */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors">
            <GamepadIcon className="w-5 h-5 text-cyan-400" />
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30">
            <BatteryIcon className="w-5 h-5 text-green-400" />
            <span className="text-cyan-400 font-semibold text-sm">85%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;