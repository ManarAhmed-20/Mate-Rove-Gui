import TopBar from './components/TopBar';
import DashboardPanel from './components/DashboardPanel';
import TasksPanel from './components/TasksPanel';
import MainContent from './components/MainContent';
import { useState } from 'react';

export default function Camera(){
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MainContent />
      <TopBar activePanel={activePanel} setActivePanel={setActivePanel} isRunning={isRunning} setIsRunning={setIsRunning} time={time} setTime={setTime} />
      <DashboardPanel activePanel={activePanel} />
      <TasksPanel />
    </div>
  );
}


