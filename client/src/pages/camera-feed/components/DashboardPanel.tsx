interface DashboardPanelProps {
  activePanel: number | null;
}

export default function DashboardPanel({ activePanel }: DashboardPanelProps) {
  if (activePanel === null) return null;

  return (
    <div className="absolute top-24 right-32 z-20 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg p-6 shadow-2xl">
      {activePanel === 1 && (
        <div>
          <div className="flex gap-4 mb-4">
            <button className="flex-1 text-cyan-400 text-xs font-semibold py-2 px-3 border border-cyan-500/50 rounded hover:bg-cyan-500/10 transition-colors">OMD</button>
            <button className="flex-1 text-cyan-400 text-xs font-semibold py-2 px-3 border border-gray-600 rounded hover:bg-gray-800 transition-colors">CAPTURE</button>
          </div>
          <div className="space-y-3">
            <div className="text-gray-400 text-xs tracking-wider mb-2">SNAPSHOTS</div>
            <div className="bg-gradient-to-b from-cyan-900/20 to-blue-900/20 rounded h-20 border border-gray-700 flex items-center justify-center">
              <svg className="w-12 h-12 text-cyan-500/40" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" />
              </svg>
            </div>
            <div className="bg-gradient-to-b from-orange-900/20 to-yellow-900/20 rounded h-28 border border-gray-700 flex items-center justify-center">
              <svg className="w-16 h-16 text-yellow-600/40" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {activePanel === 2 && (
        <div>
          <div className="text-right mb-4">
            <div className="text-cyan-400 text-xs tracking-wider">DEPTH vs TIME (s)</div>
            <div className="text-cyan-400 text-3xl font-light mt-1">2.5m</div>
            <div className="text-cyan-400 text-xs mt-1">REAL-TIME</div>
          </div>
          <div className="bg-gray-800/50 rounded h-40 border border-gray-700 relative overflow-hidden mb-6">
            <svg className="w-full h-full" viewBox="0 0 300 150">
              <defs>
                <linearGradient id="depthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d="M 10 120 Q 40 100 70 85 Q 100 70 130 75 Q 160 80 190 60 Q 220 40 250 55 Q 270 65 290 50" fill="none" stroke="#22d3ee" strokeWidth="2" />
            </svg>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Max Depth</span>
              <span className="text-cyan-400 font-semibold">2.5m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ascent Rate</span>
              <span className="text-cyan-400 font-semibold">0.6m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Target Depth</span>
              <span className="text-cyan-400 font-semibold">3.0m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Stability</span>
              <span className="text-cyan-400 font-semibold">98.2%</span>
            </div>
          </div>
        </div>
      )}

      {activePanel === 4 && (
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-cyan-500/30 border border-cyan-400 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              </div>
              <div className="text-cyan-400 text-sm font-semibold">ICEBERG: AI Analysis</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs tracking-wider">GREEN CRABS (AI)</span>
              <span className="text-green-400 text-xs font-semibold">TRACKING</span>
            </div>
            <div className="text-cyan-400 text-3xl font-light">5</div>
            <div className="text-gray-400 text-xs">SPECIMEN DETECTED</div>
          </div>

          <div className="mb-6">
            <div className="text-gray-400 text-xs tracking-wider mb-3">THREAT CALCULATOR</div>
            <div className="text-gray-400 text-xs mb-2">KEL DEPTH INPUT (M)</div>
            <input
              type="text"
              defaultValue="12.5"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-cyan-400 text-sm"
            />
          </div>

          <div className="bg-red-950/50 border border-red-600/50 rounded p-4">
            <div className="text-red-400 text-xs tracking-wider mb-1 font-semibold">SYSTEM ALERT</div>
            <div className="text-red-400 text-lg font-bold">THREAT: RED</div>
            <div className="text-gray-400 text-xs mt-2 leading-relaxed">Keel depth jammer detected for current bathymetry</div>
          </div>
        </div>
      )}
    </div>
  );
}
