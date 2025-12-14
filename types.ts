import { Vector3 } from 'three';

export enum AppMode {
  TREE = 'TREE',
  EXPLODE = 'EXPLODE'
}

export type GestureType = 'NONE' | 'PINCH' | 'OPEN' | 'POINT';

export interface ParticleData {
  initialPos: Vector3;
  targetPos: Vector3;
  color: string;
  size: number;
  speed: number;
  phase: number;
}

export interface FrameData {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  imageUrl?: string;
}

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}
