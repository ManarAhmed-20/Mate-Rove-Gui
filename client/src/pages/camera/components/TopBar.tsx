import { Settings, Gamepad2, Battery } from 'lucide-react';
import { useEffect } from 'react';

interface TopBarProps {
  activePanel: number | null;
  setActivePanel: (panel: number | null) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  time: number;
  setTime: (time: number) => void;
}

const TopBar = ({ activePanel, setActivePanel, isRunning, setIsRunning, time, setTime }: TopBarProps) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, setTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePlayClick = () => {
    setIsRunning(true);
    setActivePanel(1);
  };

  const handlePauseClick = () => {
    setIsRunning(false);
    setActivePanel(2);
  };

  const handleStopClick = () => {
    setIsRunning(false);
    setTime(0);
    setActivePanel(3);
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-cyan-400 font-bold text-sm tracking-wider">PENGUINS TEAM</h1>
            <p className="text-cyan-600 text-xs">MAKE NOV 2024 | PIONEER</p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold text-cyan-400 tracking-wider">
            {formatTime(time)}
          </div>
          <div className="flex gap-2 justify-center mt-2">
            <button
              onClick={handlePlayClick}
              className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                activePanel === 1
                  ? 'bg-cyan-500/80 border border-cyan-300'
                  : 'bg-cyan-500/30 border border-cyan-400/50 hover:bg-cyan-500/50'
              }`}
            >
              <span className="text-cyan-400 text-xs">▶</span>
            </button>
            <button
              onClick={handlePauseClick}
              className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                activePanel === 2
                  ? 'bg-yellow-500/80 border border-yellow-300'
                  : 'bg-yellow-500/30 border border-yellow-400/50 hover:bg-yellow-500/50'
              }`}
            >
              <span className="text-yellow-400 text-xs">⏸</span>
            </button>
            <button
              onClick={handleStopClick}
              className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                activePanel === 3
                  ? 'bg-pink-500/80 border border-pink-300'
                  : 'bg-pink-500/30 border border-pink-400/50 hover:bg-pink-500/50'
              }`}
            >
              <span className="text-pink-400 text-xs">⏹</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors">
            <Settings className="w-5 h-5 text-cyan-400" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30">
            <Battery className="w-5 h-5 text-green-400" />
            <span className="text-cyan-400 font-semibold text-sm">85%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
