import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface PakistanFlagProps {
  position: [number, number, number];
}

export const PakistanFlag = ({ position }: PakistanFlagProps) => {
  const flagRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (flagRef.current) {
      // Gentle waving animation
      const time = state.clock.elapsedTime;
      flagRef.current.rotation.z = Math.sin(time * 2) * 0.1;
      flagRef.current.rotation.x = Math.cos(time * 1.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Flag pole */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Pakistan flag */}
      <mesh ref={flagRef} position={[0, 0.5, 0]}>
        <planeGeometry args={[2.4, 1.6]} />
        <meshStandardMaterial transparent opacity={0.9}>
          <canvasTexture
            attach="map"
            image={(() => {
              const canvas = document.createElement('canvas');
              canvas.width = 240;
              canvas.height = 160;
              const ctx = canvas.getContext('2d')!;
              
              // Green section (75%)
              ctx.fillStyle = '#01411C';
              ctx.fillRect(0, 0, 240, 160);
              
              // White section (25%)
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, 60, 160);
              
              // Crescent
              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.arc(150, 80, 25, 0, 2 * Math.PI);
              ctx.fill();
              ctx.fillStyle = '#01411C';
              ctx.beginPath();
              ctx.arc(155, 75, 20, 0, 2 * Math.PI);
              ctx.fill();
              
              // Star
              ctx.fillStyle = '#FFFFFF';
              const star = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
                let rot = Math.PI / 2 * 3;
                let x = cx;
                let y = cy;
                const step = Math.PI / spikes;
                
                ctx.beginPath();
                ctx.moveTo(cx, cy - outerRadius);
                for (let i = 0; i < spikes; i++) {
                  x = cx + Math.cos(rot) * outerRadius;
                  y = cy + Math.sin(rot) * outerRadius;
                  ctx.lineTo(x, y);
                  rot += step;
                  
                  x = cx + Math.cos(rot) * innerRadius;
                  y = cy + Math.sin(rot) * innerRadius;
                  ctx.lineTo(x, y);
                  rot += step;
                }
                ctx.lineTo(cx, cy - outerRadius);
                ctx.closePath();
                ctx.fill();
              };
              star(175, 80, 5, 12, 6);
              
              return canvas;
            })()}
          />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};