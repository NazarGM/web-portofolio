import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

export default function CameraController() {
  const activePanel = useUIStore((state) => state.activePanel);
  const targetPos = useRef(new THREE.Vector3(0, 2, 10));
  const targetLook = useRef(new THREE.Vector3(0, 1.5, 0));
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const IDLE = new THREE.Vector3(0, 2, 10);
  const PEEK = new THREE.Vector3(0, 2.5, 13);

  useEffect(() => {
    targetPos.current.copy(isMobile ? IDLE : (activePanel === 'none' ? IDLE : PEEK));
    targetLook.current.set(0, 1.5, 0);
  }, [activePanel, isMobile]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    state.camera.position.lerp(targetPos.current, dt * 3);
    const dummyCamera = state.camera.clone();
    dummyCamera.position.copy(state.camera.position);
    dummyCamera.lookAt(targetLook.current);
    state.camera.quaternion.slerp(dummyCamera.quaternion, dt * 3);
  });

  return null;
}
