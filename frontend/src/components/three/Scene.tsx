import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import Character from './Character';
import Platform from './Platform';
import Lighting from './Lighting';
import CameraController from './CameraController';
import Particles from './Particles';
import { useUIStore } from '../../store/uiStore';
import * as THREE from 'three';

const SCENE_COLORS = {
  platform: '#FFE4EC',
  ambient: '#FFF0F3',
  particle: '#FFB3C6',
};

function RotatableGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const gl = useThree((state) => state.gl);
  const rotY = useRef(0);
  const stateRef = useRef({ dragging: false, prevX: 0 });

  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.prevX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.dragging) return;
      const deltaX = e.clientX - stateRef.current.prevX;
      stateRef.current.prevX = e.clientX;
      rotY.current += deltaX * 0.01;
      if (groupRef.current) groupRef.current.rotation.y = rotY.current;
    };
    const onPointerUp = () => {
      stateRef.current.dragging = false;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointerleave', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointerleave', onPointerUp);
    };
  }, [gl]);

  return <group ref={groupRef}>{children}</group>;
}

export default function Scene() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, touchAction: 'none', userSelect: 'none' }}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        shadows={!isMobile}
        dpr={isMobile ? [0.75, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true, premultipliedAlpha: false, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
        style={{ background: 'transparent', position: 'absolute', inset: 0 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Lighting />
        {!isMobile && <Particles color={SCENE_COLORS.particle} count={80} />}

        <Suspense fallback={null}>
          <RotatableGroup>
            <Character scale={2.2} y={-0.6} />
            <Platform color={SCENE_COLORS.platform} scale={1.4} y={-0.6} />
          </RotatableGroup>
        </Suspense>

        <CameraController />
      </Canvas>
    </div>
  );
}