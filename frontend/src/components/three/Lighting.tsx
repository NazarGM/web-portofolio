export default function Lighting() {
  return (
    <>
      {/* Ambient fill — neutral */}
      <ambientLight intensity={1.2} color="#ffffff" />

      {/* Hemispheric sky/ground fill for softer, richer light */}
      <hemisphereLight args={['#ffffff', '#dfe6f2', 1.2]} />

      {/* Key light — bright neutral from front-right */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
      />

      {/* Fill light — soft from front-left */}
      <pointLight
        position={[-4, 3, 3]}
        intensity={1.4}
        color="#ffffff"
        distance={14}
      />

      {/* Rim / backlight — pink accent from behind */}
      <pointLight
        position={[0, 3.5, -5]}
        intensity={3.2}
        color="#FFB3C6"
        distance={16}
      />
      <directionalLight
        position={[0, 2, -4]}
        intensity={2}
        color="#FF9EB5"
      />

      {/* Ground bounce */}
      <pointLight
        position={[0, 0, 2]}
        intensity={0.9}
        color="#ffffff"
        distance={8}
      />
    </>
  );
}