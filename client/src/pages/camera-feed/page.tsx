// import { useAtom } from "jotai";
// import { rovSensorDataAtom } from "../../../atoms/atoms";
import TasksPanel from './components/TasksPanel';

export default function CameraFeed() {
  
  return (
    <div className="relative w-full h-screen bg-black pt-16 flex flex-col overflow-hidden">
      
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 bg-black p-1">
         
         {/* --- CAM 1: FRONT --- */}
         <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
            {/* Label Overlay */}
            <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
              CAM 1: Front
            </span>
            
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
              <div className="absolute w-12 h-px bg-white/50"></div>
              <div className="absolute h-12 w-px bg-white/50"></div>
            </div>
         </div>

         {/* --- CAM 2: BOTTOM --- */}
         <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
            <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
              CAM 2: Back
            </span>
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
              <div className="absolute w-12 h-px bg-white/50"></div>
              <div className="absolute h-12 w-px bg-white/50"></div>
            </div>
         </div>

         {/* --- CAM 3: ARM / GRIPPER --- */}
         <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
            <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
              CAM 3: left
            </span>
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
              <div className="absolute w-12 h-px bg-white/50"></div>
              <div className="absolute h-12 w-px bg-white/50"></div>
            </div>
         </div>

         {/* --- CAM 4: REAR / AUX --- */}
         <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
            <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
              CAM 4: right
            </span>
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
              <div className="absolute w-12 h-px bg-white/50"></div>
              <div className="absolute h-12 w-px bg-white/50"></div>
            </div>
         </div>

      </div>
       <TasksPanel />
    </div>
  );
}