import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAetherStore } from '../store/aether-store';

const VIEW_PARAMS: Record<string, { z: number, scale: number }> = {
  HOME: { z: 0, scale: 1 },
  ABOUT: { z: Math.PI / 4, scale: 1.2 },
  WORK: { z: -Math.PI / 4, scale: 0.8 },
  STACK: { z: Math.PI / 2, scale: 1.5 },
  CONTACT: { z: Math.PI, scale: 1.1 }
};

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uReducedMotion;
uniform float uPixelRatio;

attribute float randomFactor;
attribute vec3 color;

varying vec3 vColor;

void main() {
  vColor = color;
  
  vec3 pos = position;
  
  if (uReducedMotion == 0.0) {
    // Drifting motion
    float driftX = sin(uTime * 0.35 + randomFactor) * 0.3;
    float driftY = cos(uTime * 0.2 + randomFactor) * 0.3;
    float driftZ = sin(uTime * 0.3 + randomFactor) * 0.3;
    
    pos += vec3(driftX, driftY, driftZ);
    
    // Project to view space
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // We approximate mouse repulsion by comparing the xy of the view space position
    // (uMouse is mapped to view space roughly)
    vec2 mouseDelta = mvPosition.xy - (uMouse * 10.0);
    float dist = length(mouseDelta);
    
    float radius = 3.0;
    if (dist < radius) {
      float force = (radius - dist) / radius;
      vec2 push = normalize(mouseDelta) * force * 1.5;
      mvPosition.xy += push;
    }
    
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = 25.0 * uPixelRatio * (1.0 / -mvPosition.z);
  } else {
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 25.0 * uPixelRatio * (1.0 / -mvPosition.z);
  }
  
  // Twinkle
  float twinkle = (sin(uTime * 2.0 + randomFactor) + 1.0) * 0.5 * 0.2;
  vColor = mix(color, vec3(1.0), twinkle);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
  // Circular particle with soft edge
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;
  
  float alpha = smoothstep(0.5, 0.3, d) * 0.6;
  gl_FragColor = vec4(vColor, alpha);
}
`;

function Particles() {
  const view = useAetherStore((s) => s.view);
  const count = 2500;
  const mesh = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  const globalState = useRef({ 
    x: -999,
    y: -999,
    reducedMotion: false
  });

  const _targetScaleVec = useRef(new THREE.Vector3());

  useEffect(() => {
    globalState.current.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      globalState.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalState.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(-999, -999) },
    uReducedMotion: { value: 0.0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) }
  }), []);

  const { positions, randomFactors, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    const baseR = 0.427; // 109
    const baseG = 0.157; // 40
    const baseB = 0.851; // 217

    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      colors[i * 3] = baseR;
      colors[i * 3 + 1] = baseG;
      colors[i * 3 + 2] = baseB;

      randomFactors[i] = Math.random() * 2 * Math.PI;
    }
    return { positions, randomFactors, colors };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current || !materialRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const params = VIEW_PARAMS[view] || VIEW_PARAMS.HOME;
    
    // Update global mesh rotation/scale depending on view
    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, params.z, 0.02);
    _targetScaleVec.current.set(params.scale, params.scale, params.scale);
    mesh.current.scale.lerp(_targetScaleVec.current, 0.02);
    
    mesh.current.rotation.y += 0.00075;
    mesh.current.rotation.x += 0.00035;

    // Update uniforms
    materialRef.current.uniforms.uTime.value = time;
    materialRef.current.uniforms.uReducedMotion.value = globalState.current.reducedMotion ? 1.0 : 0.0;
    
    // Convert normalized mouse coordinates to match the shader's view space scaling
    const targetMouseX = globalState.current.x * (viewport.width / 20.0);
    const targetMouseY = globalState.current.y * (viewport.height / 20.0);
    
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(targetMouseX, targetMouseY), 
      0.1
    );
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-randomFactor" count={count} array={randomFactors} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <div className="scene-wrapper fixed inset-0 z-0 bg-[#050014]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={['#050014', 5, 20]} />
        <Particles />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050014_100%)] pointer-events-none" />
    </div>
  );
}
