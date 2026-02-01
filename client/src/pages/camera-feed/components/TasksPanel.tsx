import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// const TASKS = {
//   task1: [
//     { id: "1.1", label: "1.1 Species Collection" },
//     { id: "1.2", label: "1.2 Coral Ridge Model" },
//     { id: "1.3", label: "1.3 Fly Transect" },
//   ],
//   task2: [
//     { id: "2.1", label: "2.1 Count Green Crabs" },
//     { id: "2.2", label: "2.2 Iceberg Tracking" },
//     { id: "2.3", label: "2.3 Whale Safe Gear" },
//     { id: "2.4", label: "2.4 Recover Anchor" },
//     { id: "2.5", label: "2.5 Service Observatory" },
//   ],
//   task3: [
//     { id: "3.1", label: "3.1 Install Micropile" },
//     { id: "3.2", label: "3.2 Power Connection" },
//   ],
//   task4: [
//     { id: "4.1", label: "4.1 Float Profiling" },
//   ]
// };

const TasksPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none">
      <div className="pointer-events-auto">
        {isExpanded && (
          <div className="bg-[#0B1120]/60  backdrop-blur-lg border-t border-cyan-400/20 p-4 mx-6 mb-0 rounded-t-lg">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-6 items-start">
                <div>
                  <p className="text-cyan-600 text-xs tracking-wider mb-2 font-semibold">THRUSTERS STATUS</p>
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-6 bg-cyan-400 rounded"></div>
                      <div className="w-2 h-6 bg-cyan-400 rounded"></div>
                      <div className="w-2 h-6 bg-cyan-400 rounded"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-6 bg-cyan-400 rounded"></div>
                      <div className="w-2 h-6 bg-cyan-400/30 rounded"></div>
                      <div className="w-2 h-6 bg-cyan-400 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 flex-1">
                  <div className="bg-cyan-500/8 backdrop-blur-sm border border-cyan-400/20 rounded p-2">
                    <div className="text-cyan-400 font-bold text-xs mb-1">Task 1</div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" checked className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">1.1 Species Collection</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">1.2 Soil Analysis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">1.3 Fly Transect</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/8 backdrop-blur-sm border border-cyan-400/20 rounded p-2">
                    <div className="text-cyan-400 font-bold text-xs mb-1">Task 2</div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">2.1 Count Green Crabs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">2.2 Iceberg Tracking</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">2.3 Whale Safe Gear</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/8 backdrop-blur-sm border border-cyan-400/20 rounded p-2">
                    <div className="text-cyan-400 font-bold text-xs mb-1">Task 3</div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">3.1 Install Microphone</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">3.2 Power Connection</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/8 backdrop-blur-sm border border-cyan-400/20 rounded p-2">
                    <div className="text-cyan-400 font-bold text-xs mb-1">Task 4</div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-2 h-2" readOnly />
                        <span className="text-cyan-400/60">4.1 Fleet Profiling</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-black/10 backdrop-blur-lg border-t border-cyan-400/20 hover:bg-black/20 transition-colors p-3 flex items-center justify-between mx-auto"
        >
          <span className="text-cyan-600 text-xs tracking-wider font-semibold">THRUSTERS STATUS</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-cyan-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TasksPanel;
