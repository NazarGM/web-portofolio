import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  modelUrl?: string;
}

const DEFAULT_MODEL = '/models/character.glb';

function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={[2, 2, 2]} />;
}

export default function Character({ modelUrl }: CharacterProps) {
  const group = useRef<THREE.Group>(null);
  const url = modelUrl ?? DEFAULT_MODEL;

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = 2.08 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, 2.08, 0]}>
      <GLTFModel url={url} />
    </group>
  );
}