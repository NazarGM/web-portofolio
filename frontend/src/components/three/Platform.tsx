import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PlatformProps {
  modelUrl?: string;
  color?: string;
}

function PlatformModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Platform({ modelUrl, color = '#38bdf8' }: PlatformProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.4;
  });

  if (modelUrl) {
    return (
      <group position={[0, -0.1, 0]}>
        <PlatformModel url={modelUrl} />
      </group>
    );
  }

  return (
    <group position={[0, -0.1, 0]}>
      {/* Faint ground disc */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>

      {/* Glowing ring */}
      <mesh ref={ringRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.04, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}