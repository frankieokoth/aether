import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ view, isAntigravity }: { view: string, isAntigravity: boolean }) {
  const count = 4000;
  const mesh = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const { positions, originalPositions, randomFactors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      randomFactors[i] = Math.random() * 2 * Math.PI;
    }
    return { positions, originalPositions, randomFactors };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    
    let targetZ = 0;
    let targetScale = 1;
    
    switch (view) {
      case 'INTRO': targetZ = 0; targetScale = 1; break;
      case 'ABOUT': targetZ = Math.PI / 4; targetScale = 1.2; break;
      case 'PROJECTS': targetZ = -Math.PI / 4; targetScale = 0.8; break;
      case 'SYSTEMS': targetZ = Math.PI / 2; targetScale = 1.5; break;
      case 'CONTACT': targetZ = Math.PI; targetScale = 1.1; break;
    }

    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, targetZ, 0.02);
    mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.02);
    
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;

    const positionsArray = mesh.current.geometry.attributes.position.array as Float32Array;
    
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      let px = positionsArray[ix];
      let py = positionsArray[iy];
      let pz = positionsArray[iz];

      if (isAntigravity) {
        const rf = randomFactors[i];
        positionsArray[ix] += Math.sin(time * 2 + rf) * 0.05;
        positionsArray[iy] += Math.cos(time * 2 + rf) * 0.05;
        positionsArray[iz] += Math.sin(time * 1.5 + rf) * 0.05;
      } else {
        const dx = px - mouseX;
        const dy = py - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = ox;
        let targetY = oy;
        let targetZ = oz;

        if (dist < 3) {
          const force = (3 - dist) / 3;
          targetX = ox + (dx / dist) * force * 2;
          targetY = oy + (dy / dist) * force * 2;
          targetZ = oz + force * 2;
        }

        positionsArray[ix] += (targetX - px) * 0.1;
        positionsArray[iy] += (targetY - py) * 0.1;
        positionsArray[iz] += (targetZ - pz) * 0.1;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#8B5CF6" 
        transparent 
        opacity={0.6} 
        sizeAttenuation={true} 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene({ view, isAntigravity }: { view: string, isAntigravity: boolean }) {
  return (
    <div className="fixed inset-0 z-0 bg-[#050014]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#050014', 5, 20]} />
        <Particles view={view} isAntigravity={isAntigravity} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050014_100%)] pointer-events-none" />
    </div>
  );
}
