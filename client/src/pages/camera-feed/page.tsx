import { useState } from "react";
import TasksPanel from "./components/TasksPanel";
import RightSideButtons from "./components/RightSideButtons";
import Task1Panel from "./components/Task1Panel";
import Task2Panel from "./components/Task2Panel";
import Task4Panel from "./components/Task4Panel";

export default function CameraFeed() {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen bg-black pt-16 flex flex-col overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 bg-black p-1">
        {/* CAM 1 */}
        <div
          className="relative bg-slate-900 border border-slate-800 overflow-hidden group transition-all hover:brightness-110"
          style={{
            backgroundImage: "url('/underwater.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 1
          </span>
          {/* Crosshair Overlay for Cam */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
            <div className="absolute w-12 h-px bg-white/50"></div>
            <div className="absolute h-12 w-px bg-white/50"></div>
          </div>
        </div>

        {/* CAM 2 */}
        <div
          className="relative bg-slate-900 border border-slate-800 overflow-hidden group transition-all hover:brightness-110"
          style={{
            backgroundImage: "url('/underwater2.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 2
          </span>
        </div>

        {/* CAM 3 */}
        <div
          className="relative bg-slate-900 border border-slate-800 overflow-hidden group transition-all hover:brightness-110"
          style={{
            backgroundImage: "url('/underwater3.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 3
          </span>
        </div>

        {/* CAM 4 */}
        <div
          className="relative bg-slate-900 border border-slate-800 overflow-hidden group transition-all hover:brightness-110"
          style={{
            backgroundImage: "url('/underwater4.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 4
          </span>
        </div>
      </div>

      <RightSideButtons activePanel={activePanel} setActivePanel={setActivePanel} />

    <div className="pointer-events-none absolute inset-0"> 
       <div className="pointer-events-auto">
          {activePanel === 1 && <Task1Panel />}
          {activePanel === 2 && <Task2Panel />}
          {activePanel === 4 && <Task4Panel />}
       </div>
    </div>

      <TasksPanel />
    </div>
  );
}
