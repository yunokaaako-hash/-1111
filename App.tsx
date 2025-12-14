import React, { useRef } from 'react';
import { Scene } from './components/Scene';
import { HandController } from './components/HandController';
import { useStore } from './store';
import { AppMode } from './types';

// Cursor Component
const CustomCursor = () => {
  const { x, y } = useStore(state => state.cursorPosition);
  return (
    <div 
      className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_cyan] bg-white/20"
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
    >
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

// Expanded Photo Modal
const PhotoModal = () => {
  const activeFrameId = useStore(state => state.activeFrameId);
  const setActiveFrameId = useStore(state => state.setActiveFrameId);
  const frameImages = useStore(state => state.frameImages);
  
  if (activeFrameId === null) return null;
  
  const imageUrl = frameImages[activeFrameId];

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setActiveFrameId(null)}
    >
      <div 
        className="relative bg-black border-2 border-[#FFD700] p-2 shadow-[0_0_50px_#FF69B4] transform transition-all scale-100 max-w-[90vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '25vw', height: 'auto', aspectRatio: '3/4' }} // 1:4 screen size approx logic
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Memory" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-pink-500 font-mono">
            <p className="mb-4">No Image</p>
            <label className="cursor-pointer bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded shadow-[0_0_15px_#FF69B4]">
              Upload Photo
              <input 
                type="file" 
                hidden 
                accept="image/*" 
                onChange={(e) => {
                  if(e.target.files?.[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    useStore.getState().setFrameImage(activeFrameId, url);
                  }
                }} 
              />
            </label>
          </div>
        )}
        <button 
          onClick={() => setActiveFrameId(null)}
          className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-400"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const toggleMode = useStore(state => state.toggleMode);
  const mode = useStore(state => state.mode);
  const gesture = useStore(state => state.gesture);

  return (
    <div className="w-full h-screen relative bg-[#050103]">
      {/* 3D Scene */}
      <div className="absolute inset-0" onClick={toggleMode}>
        <Scene />
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 pointer-events-none flex justify-between items-start z-10">
        <div>
           <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]" style={{ fontFamily: 'Orbitron' }}>
            CYBER CHRISTMAS
          </h1>
          <p className="text-pink-300 mt-2 font-mono text-sm tracking-widest opacity-80">
            MODE: <span className="font-bold text-white">{mode}</span>
          </p>
          <p className="text-cyan-300 mt-1 font-mono text-xs tracking-widest opacity-80">
            GESTURE: <span className="font-bold text-white">{gesture}</span>
          </p>
        </div>
        
        <div className="text-right pointer-events-auto">
           <button 
             onClick={(e) => { e.stopPropagation(); toggleMode(); }}
             className="glass-panel text-pink-100 px-6 py-2 rounded-full font-bold hover:bg-pink-500/20 transition-all duration-300 tracking-wider text-sm border border-pink-500/50"
           >
             {mode === AppMode.TREE ? 'EXPLODE' : 'ASSEMBLE'}
           </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 pointer-events-none max-w-sm text-xs text-gray-400 font-mono space-y-1 opacity-70">
        <p><span className="text-pink-500">PINCH</span> to Assemble Tree</p>
        <p><span className="text-pink-500">OPEN HAND</span> to Explode</p>
        <p><span className="text-pink-500">OPEN + MOVE</span> to Rotate</p>
        <p><span className="text-pink-500">POINT</span> to Move Cursor</p>
      </div>

      <HandController />
      <CustomCursor />
      <PhotoModal />
    </div>
  );
};

export default App;
