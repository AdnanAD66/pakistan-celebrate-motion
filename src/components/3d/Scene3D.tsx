import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { Suspense } from 'react';
import { PakistanFlag } from './PakistanFlag';
import { CrescentStar } from './CrescentStar';
import { Fireworks } from './Fireworks';
import { MinareePakistan } from './MinareePakistan';

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#45D62A" intensity={0.8} />
          
          {/* Stars background */}
          <Stars
            radius={300}
            depth={60}
            count={2000}
            factor={7}
            saturation={0}
            fade
            speed={0.5}
          />
          
          {/* 3D Elements */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <PakistanFlag position={[-3, 1, 0]} />
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
            <CrescentStar position={[0, 2, -2]} />
          </Float>
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
            <MinareePakistan position={[3, -1, -3]} />
          </Float>
          
          <Fireworks />
          
          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};