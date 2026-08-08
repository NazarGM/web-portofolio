import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Character from './Character';
import Platform from './Platform';
import Lighting from './Lighting';
import CameraController from './CameraController';
import Particles from './Particles';
import { useSceneSettings } from '../../hooks/useResource';
import { resolveUrl } from '../../lib/api';

export default function Scene() {
  const { data: settings } = useSceneSettings();
  const characterModelUrl = resolveUrl(settings?.characterModelUrl);
  const platformModelUrl = resolveUrl(settings?.platformModelUrl);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: 'transparent', position: 'absolute', inset: 0 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Lighting />
        <Particles color={settings?.particleColor} />

        <Suspense fallback={null}>
          <Character modelUrl={characterModelUrl} />
          <Platform modelUrl={platformModelUrl} color={settings?.platformColor} />
        </Suspense>

        <CameraController />
      </Canvas>
    </div>
  );
}