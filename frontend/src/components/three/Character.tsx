import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

interface CharacterProps {
  modelUrl?: string;
}

const DEFAULT_MODEL = '/models/character.glb';

function GLTFModel({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names, mixer } = useAnimations(animations, group);
  const { activePanel, mobilePanel } = useUIStore();
  const currentAction = useRef<string | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fix xray / transparency issue
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            m.transparent = false;
            m.opacity = 1;
            m.depthWrite = true;
            m.needsUpdate = true;
          });
        }
      }
    });
  }, [scene]);

  // Pre-sync all animation clips at load so switching later doesn't jank (clipSync happens once)
  useEffect(() => {
    if (!mixer || names.length === 0) return;
    for (const n of names) {
      const a = actions[n];
      if (a) {
        a.play();
        a.stop();
      }
    }
    mixer.update(0);
  }, [names, actions, mixer]);

  const findAnim = (name: string) => {
    return names.find((n) => n.toLowerCase() === name.toLowerCase())
      || names.find((n) => n.toLowerCase().includes(name.toLowerCase()));
  };

  const playAnim = (name: string, loop = true) => {
    const actualName = findAnim(name);
    if (!actualName || !actions[actualName]) return;
    const next = actions[actualName];
    const prev = currentAction.current ? actions[currentAction.current] : null;

    if (prev && prev !== next) {
      prev.fadeOut(0.15);
    }

    next.reset();
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
    next.clampWhenFinished = !loop;
    next.fadeIn(0.15).play();
    currentAction.current = actualName;
  };

  const playRandomIdle = () => {
    const idles = names.filter((n) => n.toLowerCase().includes('idle'));
    const pick = idles.length > 0 ? idles[Math.floor(Math.random() * idles.length)] : names[0];
    if (pick) playAnim(pick, true);
  };

  // On load: play first idle
  useEffect(() => {
    if (names.length > 0) playRandomIdle();
  }, [names]);

  // Randomly switch idle every 6-12 seconds
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (names.length > 0) {
      interval = setInterval(() => {
        if (!currentAction.current || currentAction.current.toLowerCase().includes('idle')) {
          playRandomIdle();
        }
      }, Math.random() * 6000 + 6000);
    }
    return () => clearInterval(interval);
  }, [names]);

  // Return to idle after one-shot finishes
  useEffect(() => {
    const onFinished = (e: { action: THREE.AnimationAction }) => {
      const clipName = e.action.getClip().name.toLowerCase();
      const isOneShot = ['click_1', 'click_2', 'panel_open', 'panel_close'].some((k) => clipName.includes(k));
      if (isOneShot) {
        idleTimer.current = setTimeout(() => playRandomIdle(), 100);
      }
    };
    mixer.addEventListener('finished', onFinished);
    return () => {
      mixer.removeEventListener('finished', onFinished);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [mixer, names]);

  // Handle panel open/close
  const prevPanel = useRef<string>('none');
  useEffect(() => {
    const isAnyOpen = activePanel !== 'none' || mobilePanel !== 'none';
    const wasAnyOpen = prevPanel.current !== 'none';
    prevPanel.current = isAnyOpen ? 'open' : 'none';

    if (isAnyOpen && !wasAnyOpen) {
      playAnim('panel_open', false);
    } else if (!isAnyOpen && wasAnyOpen) {
      playAnim('panel_close', false);
    }
  }, [activePanel, mobilePanel]);

  // Handle character click (click_1 / click_2 random)
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const picks = ['click_1', 'click_2'];
    const available = picks.filter((c) => names.some((n) => n.toLowerCase().includes(c)));
    const selected = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : picks[0];
    playAnim(selected, false);
  };

  return (
    <group ref={group} onClick={handleClick}>
      <primitive object={scene} scale={[2, 2, 2]} />
    </group>
  );
}

export default function Character({ modelUrl }: CharacterProps) {
  const url = modelUrl ?? DEFAULT_MODEL;
  return (
    <group position={[0, 0, 0]}>
      <GLTFModel url={url} />
    </group>
  );
}
