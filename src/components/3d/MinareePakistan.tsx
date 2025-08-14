import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface MinareePakistanProps {
  position: [number, number, number];
}

export const MinareePakistan = ({ position }: MinareePakistanProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.8}>
      {/* Base structure */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 0.5, 8]} />
        <meshStandardMaterial color="#E8E8E8" />
      </mesh>
      
      {/* Main tower */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 3, 12]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      
      {/* Upper section */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 8]} />
        <meshStandardMaterial color="#E8E8E8" />
      </mesh>
      
      {/* Top dome */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#45D62A" 
          emissive="#45D62A" 
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Crescent on top */}
      <mesh position={[0, 3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.15, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Decorative lights */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, index) => (
        <mesh
          key={index}
          position={[
            Math.sin(angle) * 0.5,
            0.5,
            Math.cos(angle) * 0.5
          ]}
        >
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};