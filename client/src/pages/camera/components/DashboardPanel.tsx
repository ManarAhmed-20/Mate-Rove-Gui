import { ThermometerSnowflake, X } from 'lucide-react';

interface DashboardPanelProps {
  activePanel: number | null;
}

const DashboardPanel = ({ activePanel }: DashboardPanelProps) => {
  const renderPanelContent = () => {
    switch (activePanel) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <p className="text-cyan-600 text-xs mb-2 tracking-wider font-semibold">SONAR DEPTH</p>
              <div className="relative h-32 bg-black/30 rounded border border-cyan-400/30 p-3">
                <div className="text-xl font-bold text-cyan-400 mb-2">2.5m</div>
                <svg className="w-full h-20" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <polyline
                    points="0,60 50,45 100,40 150,48 200,55"
                    fill="none"
                    stroke="rgb(34, 211, 238)"
                    strokeWidth="2"
                  />
                  <polyline
                    points="0,80 50,65 100,60 150,68 200,75"
                    fill="none"
                    stroke="rgb(34, 211, 238)"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-cyan-500/10 border border-cyan-400/30 rounded p-2">
                <div className="text-cyan-600 text-xs mb-1">Max Depth</div>
                <div className="text-cyan-400 font-bold">2.5m</div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-400/30 rounded p-2">
                <div className="text-cyan-600 text-xs mb-1">Ascent Rate</div>
                <div className="text-cyan-400 font-bold">0.5m/s</div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <div>
              <p className="text-cyan-600 text-xs mb-2 tracking-wider font-semibold">DIVE STATISTICS</p>
              <div className="bg-black/30 rounded border border-cyan-400/30 p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-600 text-xs">Duration:</span>
                  <span className="text-cyan-400 font-bold">15:32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600 text-xs">Distance:</span>
                  <span className="text-cyan-400 font-bold">823m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600 text-xs">Battery:</span>
                  <span className="text-green-400 font-bold">85%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <div>
              <p className="text-cyan-600 text-xs mb-2 tracking-wider font-semibold">SYSTEM ALERTS</p>
              <div className="bg-red-500/10 border border-red-400/30 rounded p-3">
                <div className="text-red-400 font-bold text-sm mb-1">THREAT: RED</div>
                <div className="text-red-400/70 text-xs leading-relaxed">
                  Pressure readings abnormal. Recommend surface immediately.
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-32 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-cyan-600 text-xs mb-2 tracking-wider font-semibold">DEPTH</p>
                <div className="relative h-48">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-b from-cyan-900/40 to-cyan-500/60 rounded-lg">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-cyan-400/80 rounded-b-lg"></div>
                  </div>
                  <div className="absolute left-16 top-1/2 -translate-y-1/2">
                    <div className="text-4xl font-bold text-cyan-400">4.2</div>
                    <div className="text-cyan-600 text-xs">METERS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-cyan-600 text-xs mb-4 tracking-wider font-semibold">HEADING</p>
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40"></div>
                  <div className="absolute inset-2 rounded-full bg-cyan-500/15 backdrop-blur-sm"></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-cyan-400 origin-bottom -translate-x-1/2 -translate-y-full rotate-45"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-cyan-400 text-xs font-bold">N</div>
                </div>
                <div className="text-center text-cyan-400 font-bold mt-2">NW 315°</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-cyan-500/15 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3">
                  <div className="text-cyan-600 text-xs mb-1 font-semibold">WATER</div>
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 font-bold">2°C</span>
                  </div>
                </div>
                <div className="bg-orange-500/15 backdrop-blur-sm border border-orange-400/30 rounded-lg p-3">
                  <div className="text-orange-600 text-xs mb-1 font-semibold">INTERNAL</div>
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 font-bold">45°C</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-end gap-2">
              {[1, 2, 4].map((num) => (
                <div
                  key={num}
                  className="w-12 h-12 rounded-lg bg-cyan-500/25 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold text-lg"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activePanel && (
        <div className="fixed right-0 top-24 z-35 p-6 pointer-events-auto">
          <div className="w-80 bg-black/25 backdrop-blur-lg border border-cyan-400/30 rounded-lg p-4 relative">
            <button
              onClick={() => {}}
              className="absolute top-2 right-2 w-6 h-6 rounded bg-red-500/30 border border-red-400/50 flex items-center justify-center hover:bg-red-500/50 transition-colors"
            >
              <X className="w-3 h-3 text-red-400" />
            </button>
            {renderPanelContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPanel;
