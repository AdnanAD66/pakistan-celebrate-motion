import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointsMaterial } from 'three';
import { Float } from '@react-three/drei';

export const Fireworks = () => {
  const pointsRef = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    const colors = new Float32Array(300 * 3);
    
    for (let i = 0; i < 300; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Pakistan colors
      const isGreen = Math.random() > 0.5;
      if (isGreen) {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.2;
      } else if (Math.random() > 0.5) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.84;
        colors[i * 3 + 2] = 0.0;
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particles.positions}
            count={300}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={particles.colors}
            count={300}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </Float>
  );
};