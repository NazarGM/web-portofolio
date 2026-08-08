import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

export default function CameraController() {
  const activePanel = useUIStore((state) => state.activePanel);
  const targetPos = useRef(new THREE.Vector3(0, 2, 10)); // Default position
  const targetLook = useRef(new THREE.Vector3(0, 1.5, 0));    // Default look at

    useEffect(() => {
    if (activePanel === 'none') {
      targetPos.current.set(0, 2, 10);
      targetLook.current.set(0, 1.5, 0);
    } else {
      // Zoom out and move slightly up when a panel is open
      targetPos.current.set(0, 2.2, 12);
      targetLook.current.set(0, 1.5, 0);
    }
  }, [activePanel]);

  useFrame((state, delta) => {
    // Smoothly interpolate camera position
    state.camera.position.lerp(targetPos.current, delta * 3);

    // Smoothly interpolate look-at target via quaternion slerp:
    const dummyCamera = state.camera.clone();
    dummyCamera.position.copy(state.camera.position);
    dummyCamera.lookAt(targetLook.current);
    state.camera.quaternion.slerp(dummyCamera.quaternion, delta * 3);
  });

  return null;
}
