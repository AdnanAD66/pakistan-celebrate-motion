import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface CrescentStarProps {
  position: [number, number, number];
}

export const CrescentStar = ({ position }: CrescentStarProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.5;
      groupRef.current.rotation.z = Math.sin(time) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Crescent */}
      <mesh position={[-0.3, 0, 0]}>
        <torusGeometry args={[0.8, 0.3, 8, 20, Math.PI * 1.5]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF" 
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
      
      {/* Star */}
      <mesh position={[0.5, 0.2, 0]}>
        <coneGeometry args={[0.3, 0.6, 5]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
      
      {/* Additional glow effect */}
      <mesh position={[0, 0, 0]} scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.1}
          emissive="#45D62A"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};