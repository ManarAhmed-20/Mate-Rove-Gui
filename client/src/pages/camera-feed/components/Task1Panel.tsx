import { useAtom } from "jotai";
import { task1SnapshotsAtom } from "../../../../atoms/atoms";
import { TbGrid4X4 } from "react-icons/tb"; 
import { IoScanOutline } from "react-icons/io5"; 

export default function Task1Panel() {
  const [snapshots, setSnapshots] = useAtom(task1SnapshotsAtom);

  const handleCapture = () => {
    const testImageUrl = `https://picsum.photos/seed/${Math.random()}/300/200`;
    
    const newSnapshot = { 
      url: testImageUrl, 
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }) 
    };
    
    setSnapshots([newSnapshot, ...snapshots]);
  };

  return (
    <div className="absolute right-20 top-20 z-30 bg-black/80 p-4 rounded-xl border border-cyan-500/30 w-80">
      
      <div className="flex gap-3 mb-6">
        <button className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 border-cyan-500 bg-cyan-500/10 text-cyan-400">
          <TbGrid4X4 size={32} strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Grid</span>
        </button>

        <button 
          onClick={handleCapture}
          className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-gray-700 bg-transparent text-white hover:bg-white/5 transition-colors"
        >
          <IoScanOutline size={32} strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/80">Capture</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Snapshots</h3>
      </div>

      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-hide">
        {snapshots.map((snap, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden border border-cyan-900/30 group">
            <img 
              src={snap.url} 
              alt={`Snapshot ${i}`} 
              className="w-full h-28 object-cover brightness-90 group-hover:brightness-100 transition-all"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x200?text=Error+Loading"; }}
            />
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-[9px] text-white font-mono border border-white/10">
              {snap.timestamp}
            </div>
          </div>
        ))}

        {snapshots.length === 0 && (
          <div className="space-y-3">
            {[1, 2].map((n) => (
              <div key={n} className="h-28 bg-black/40 rounded-lg border border-dashed border-gray-800 flex items-center justify-center">
                <span className="text-[9px] text-gray-700 uppercase">Waiting for feed...</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-cyan-900/20">
         <p className="text-[10px] text-cyan-600 font-bold uppercase tracking-widest">
           Targets Captured: {snapshots.length} / 8
         </p>
      </div>
    </div>
  );
}