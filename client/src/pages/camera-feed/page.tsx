import { useState } from "react";
import TasksPanel from './components/TasksPanel';
import RightSideButtons from './components/RightSideButtons';
import DashboardPanel from './components/DashboardPanel';

export default function CameraFeed() {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen bg-black pt-16 flex flex-col overflow-hidden">
      
      {/* شبكة الكاميرات */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 bg-black p-1">
        {/* CAM 1 */}
        <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 1: Front
          </span>
        </div>

        {/* CAM 2 */}
        <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 2: Back
          </span>
        </div>

        {/* CAM 3 */}
        <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 3: Left
          </span>
        </div>

        {/* CAM 4 */}
        <div className="relative bg-slate-900 border border-slate-800 overflow-hidden group">
          <span className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-[#38bdf8] font-bold z-10 border border-[#38bdf8]/30 backdrop-blur-sm shadow-lg">
            CAM 4: Right
          </span>
        </div>
      </div>

      {/* الأزرار على اليمين */}
      <RightSideButtons activePanel={activePanel} setActivePanel={setActivePanel} />

      {/* محتوى السايد بار */}
      <DashboardPanel activePanel={activePanel} />

      {/* TasksPanel تحت زي ما هو */}
      <TasksPanel />
    </div>
  );
}