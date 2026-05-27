import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ view, isAntigravity }: { view: string, isAntigravity: boolean }) {
  const count = 2500; // Middle ground density (was 4000, then 1500)
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Track mouse globally to bypass the DOM overlay blocking pointer events
  // Also track click state for the Gravity Well effect
  const globalState = useRef({ 
    x: -999, // Start off-screen
    y: -999,
    isDown: false,
    justReleased: false,
    shockwaveRadius: 0,
    shockwaveStrength: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalState.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalState.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        globalState.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        globalState.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };
    const handleDown = () => { globalState.current.isDown = true; };
    const handleUp = () => { 
      globalState.current.isDown = false; 
      globalState.current.justReleased = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchstart', handleDown);
    window.addEventListener('touchend', handleUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  const { positions, originalPositions, randomFactors, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Base color: #6D28D9 (109, 40, 217)
    const baseR = 0.427;
    const baseG = 0.157;
    const baseB = 0.851;

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

      colors[i * 3] = baseR;
      colors[i * 3 + 1] = baseG;
      colors[i * 3 + 2] = baseB;

      randomFactors[i] = Math.random() * 2 * Math.PI;
    }
    return { positions, originalPositions, randomFactors, velocities, colors };
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
    
    // Middle ground global rotation speed
    mesh.current.rotation.y += 0.00075;
    mesh.current.rotation.x += 0.00035;

    const positionsArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const colorsArray = mesh.current.geometry.attributes.color.array as Float32Array;
    
    // Use our globally tracked mouse instead of R3F's blocked mouse state
    const mouseX = (globalState.current.x * viewport.width) / 2;
    const mouseY = (globalState.current.y * viewport.height) / 2;

    // Handle Shockwave trigger
    if (globalState.current.justReleased) {
      globalState.current.shockwaveRadius = 0;
      globalState.current.shockwaveStrength = 1.5;
      globalState.current.justReleased = false;
    }

    // Expand and decay shockwave
    if (globalState.current.shockwaveStrength > 0) {
      globalState.current.shockwaveRadius += 0.4;
      globalState.current.shockwaveStrength *= 0.95;
    }

    // Physics constants
    const friction = 0.88;
    const springFactor = 0.04;

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
        // Smooth floating in antigravity (Middle ground speed)
        velocities[ix] += Math.sin(time * 1.5 + rf) * 0.0075;
        velocities[iy] += Math.cos(time * 1.5 + rf) * 0.0075;
        velocities[iz] += Math.sin(time * 1.1 + rf) * 0.0075;
        
        velocities[ix] *= 0.95;
        velocities[iy] *= 0.95;
        velocities[iz] *= 0.95;
        
        positionsArray[ix] += velocities[ix];
        positionsArray[iy] += velocities[iy];
        positionsArray[iz] += velocities[iz];
      } else {
        const dx = px - mouseX;
        const dy = py - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Organic idle drift (Middle ground speed)
        const rf = randomFactors[i];
        const driftX = Math.sin(time * 0.35 + rf) * 0.3;
        const driftY = Math.cos(time * 0.2 + rf) * 0.3;
        const driftZ = Math.sin(time * 0.3 + rf) * 0.3;

        let targetX = ox + driftX;
        let targetY = oy + driftY;
        let targetZ = oz + driftZ;

        // Mouse interaction (Gravity Well vs Repulsion)
        if (globalState.current.isDown) {
          // Gravity Well: Pull particles in
          if (dist < 8) {
            const force = (8 - dist) / 8;
            velocities[ix] -= (dx / dist) * force * 0.15;
            velocities[iy] -= (dy / dist) * force * 0.15;
            velocities[iz] -= force * 0.15;
          }
        } else {
          // Normal Repulsion
          if (dist < 3) {
            const force = (3 - dist) / 3;
            velocities[ix] += (dx / dist) * force * 0.3;
            velocities[iy] += (dy / dist) * force * 0.3;
            velocities[iz] += force * 0.3; // Push outward in 3D
          }
        }

        // Shockwave interaction
        if (globalState.current.shockwaveStrength > 0.01) {
          const swDist = Math.abs(dist - globalState.current.shockwaveRadius);
          if (swDist < 1.0) {
            const swForce = (1.0 - swDist) * globalState.current.shockwaveStrength;
            velocities[ix] += (dx / dist) * swForce * 0.5;
            velocities[iy] += (dy / dist) * swForce * 0.5;
            velocities[iz] += swForce * 0.5;
          }
        }

        // Spring physics
        velocities[ix] += (targetX - px) * springFactor;
        velocities[iy] += (targetY - py) * springFactor;
        velocities[iz] += (targetZ - pz) * springFactor;

        // Apply friction
        velocities[ix] *= friction;
        velocities[iy] *= friction;
        velocities[iz] *= friction;

        // Update positions
        positionsArray[ix] += velocities[ix];
        positionsArray[iy] += velocities[iy];
        positionsArray[iz] += velocities[iz];
      }

      // Kinetic Color Shifting & Twinkling
      const vx = velocities[ix];
      const vy = velocities[iy];
      const vz = velocities[iz];
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      
      // Map speed to heat (0.0 to 1.0) - Increased sensitivity drastically
      const heat = Math.min(speed * 40.0, 1.0);
      
      // Add a subtle twinkle based on time and random factor
      const rf = randomFactors[i];
      const twinkle = (Math.sin(time * 2.0 + rf) + 1.0) * 0.5 * 0.2; // 0.0 to 0.2
      
      // Base: #6D28D9 (0.427, 0.157, 0.851)
      // Hot: #00FF41 (0.0, 1.0, 0.255)
      colorsArray[ix] = 0.427 + (0.0 - 0.427) * heat + twinkle * (1.0 - heat);
      colorsArray[iy] = 0.157 + (1.0 - 0.157) * heat + twinkle * (1.0 - heat);
      colorsArray[iz] = 0.851 + (0.255 - 0.851) * heat + twinkle * (1.0 - heat);
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.color.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#ffffff" // Ensure base color is white so vertex colors multiply correctly
        vertexColors={true}
        transparent 
        opacity={0.6} // Boosted slightly to make the glowing colors pop more
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
