import { create } from 'zustand';
import { AppMode, GestureType } from './types';

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;

  sceneRotationY: number;
  setSceneRotationY: (rad: number) => void;

  gesture: GestureType;
  setGesture: (g: GestureType) => void;

  cursorPosition: { x: number; y: number };
  setCursorPosition: (pos: { x: number; y: number }) => void;

  activeFrameId: number | null;
  setActiveFrameId: (id: number | null) => void;

  frameImages: Record<number, string>;
  setFrameImage: (id: number, url: string) => void;
}

export const useStore = create<AppState>((set) => ({
  mode: AppMode.TREE,
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === AppMode.TREE ? AppMode.EXPLODE : AppMode.TREE })),
  
  rotationSpeed: 0.2,
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),

  sceneRotationY: 0,
  setSceneRotationY: (rad) => set({ sceneRotationY: rad }),

  gesture: 'NONE',
  setGesture: (gesture) => set({ gesture }),

  cursorPosition: { x: 0.5, y: 0.5 },
  setCursorPosition: (pos) => set({ cursorPosition: pos }),

  activeFrameId: null,
  setActiveFrameId: (id) => set({ activeFrameId: id }),

  frameImages: {},
  setFrameImage: (id, url) => set((state) => ({ frameImages: { ...state.frameImages, [id]: url } })),
}));