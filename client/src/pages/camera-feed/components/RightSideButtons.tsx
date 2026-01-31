interface RightSideButtonsProps {
  activePanel: number | null;
  setActivePanel: (panel: number | null) => void;
}

export default function RightSideButtons({ activePanel, setActivePanel }: RightSideButtonsProps) {
  const buttons = [1, 2, 4];

  return (
    <div className="absolute right-6 top-40 z-30 flex flex-col gap-4">
      {buttons.map((num) => (
        <button
          key={num}
          onClick={() => setActivePanel(activePanel === num ? null : num)}
          className={`w-14 h-14 rounded-lg font-bold text-base transition-all duration-200 flex items-center justify-center ${
            activePanel === num
              ? 'bg-cyan-500 text-gray-900 shadow-lg shadow-cyan-500/70'
              : 'bg-cyan-500 text-gray-900 hover:bg-cyan-600 shadow-lg'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
