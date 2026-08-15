import { useEffect, useMemo, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

interface CharacterProps {
  modelUrl?: string;
  scale?: number;
  y?: number;
}

const DEFAULT_MODEL = '/models/character.glb';
const USED_ANIMS = new Set(['click_1', 'click_2', 'idle_1', 'idle_2', 'idle_3', 'idle_4', 'idle_5', 'panel_close', 'panel_open']);
const isMobileDevice = () => window.matchMedia('(pointer: coarse)').matches;

const HEAD_BONE_NAME = 'mixamorigHead';
const MAX_YAW = THREE.MathUtils.degToRad(30);
const MAX_PITCH = THREE.MathUtils.degToRad(15);

const raycaster = new THREE.Raycaster();
const mouseNDC = new THREE.Vector2();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const intersectionPoint = new THREE.Vector3();
const headWorldPos = new THREE.Vector3();
const tempQuat = new THREE.Quaternion();
const lookAtQuat = new THREE.Quaternion();
const dummy = new THREE.Object3D();

function GLTFModel({ url, scale }: { url: string; scale: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const usedAnims = useMemo(() => animations.filter((a) => USED_ANIMS.has(a.name)), [animations]);
  const { actions, names, mixer } = useAnimations(usedAnims, group);
  const { activePanel, mobilePanel } = useUIStore();
  const currentAction = useRef<string | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headBone = useRef<THREE.Bone | null>(null);
  const hasMouse = useRef(false);
  const isMobile = useRef(false);
  const { camera } = useThree();

  useEffect(() => {
    isMobile.current = isMobileDevice();
  }, []);

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

  // Find head bone
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Bone).isBone && child.name === HEAD_BONE_NAME) {
        headBone.current = child as THREE.Bone;
      }
    });
  }, [scene]);

  // Track mouse position (desktop only)
  useEffect(() => {
    if (isMobile.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      hasMouse.current = true;
      mouseNDC.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    const handleMouseLeave = () => {
      hasMouse.current = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Head look-at: runs AFTER animation mixer updates each frame
  useFrame(() => {
    if (!headBone.current || isMobile.current || !camera) return;

    const bone = headBone.current;

    if (!hasMouse.current) return;

    // Article technique: plane at character facing camera
    const groupPos = group.current?.position || new THREE.Vector3(0, 0, 0);
    planeNormal.copy(camera.position).sub(groupPos).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, groupPos);

    raycaster.setFromCamera(mouseNDC, camera);
    const hit = raycaster.ray.intersectPlane(plane, intersectionPoint);
    if (!hit) return;

    // Get head world position
    bone.getWorldPosition(headWorldPos);

    // Article uses: head.lookAt(intersectionPoint.x, intersectionPoint.y, 2)
    const targetX = intersectionPoint.x;
    const targetY = intersectionPoint.y;
    const targetZ = 2;

    // Use dummy object to get correct world quaternion for lookAt
    dummy.position.copy(headWorldPos);
    dummy.lookAt(new THREE.Vector3(targetX, targetY, targetZ));
    lookAtQuat.copy(dummy.quaternion);

    // Convert to head's local space (parent's inverse world quaternion)
    const parent = bone.parent;
    if (parent) {
      parent.getWorldQuaternion(tempQuat).invert();
      lookAtQuat.premultiply(tempQuat);
    }

    // Blend with current animation
    const currentQuat = bone.quaternion.clone();
    currentQuat.slerp(lookAtQuat, 0.5);

    // Clamp
    const euler = new THREE.Euler().setFromQuaternion(currentQuat, bone.rotation.order);
    euler.x = THREE.MathUtils.clamp(euler.x, -MAX_PITCH, MAX_PITCH);
    euler.y = THREE.MathUtils.clamp(euler.y, -MAX_YAW, MAX_YAW);
    currentQuat.setFromEuler(euler);

    bone.quaternion.copy(currentQuat);
  });

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
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
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
      const current = currentAction.current ? actions[currentAction.current] : null;
      if (e.action !== current) return;
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
  }, [mixer, names, actions]);

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
  const handleClick = () => {
    if (currentAction.current && currentAction.current.toLowerCase().includes('click')) return;
    const picks = ['click_1', 'click_2'];
    const available = picks.filter((c) => names.some((n) => n.toLowerCase().includes(c)));
    const selected = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : picks[0];
    playAnim(selected, false);
  };

  const mobile = isMobile.current;

  return (
    <group ref={group}>
      <primitive object={scene} scale={[scale, scale, scale]} />
      <mesh position={[0, 1.9, 0]} onClick={handleClick}>
        <planeGeometry args={[mobile ? 3.2 : 5.2, mobile ? 3.2 : 5.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function Character({ modelUrl, scale = 2.5, y = 0 }: CharacterProps) {
  const url = modelUrl ?? DEFAULT_MODEL;
  return (
    <group position={[0, y, 0]}>
      <GLTFModel url={url} scale={scale} />
    </group>
  );
}