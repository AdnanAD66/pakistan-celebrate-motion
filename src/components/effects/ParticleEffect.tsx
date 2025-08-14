import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  life: number;
}

export const ParticleEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#01411C', '#FFFFFF', '#FFD700'];
    let particleId = 0;

    const createParticle = (): Particle => ({
      id: particleId++,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      size: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: -(Math.random() * 3 + 1)
      },
      life: 1
    });

    const updateParticles = () => {
      setParticles(prev => {
        const updated = prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            life: particle.life - 0.01
          }))
          .filter(particle => particle.life > 0 && particle.y > -50);

        // Add new particles
        if (Math.random() < 0.3) {
          updated.push(createParticle());
        }

        return updated.slice(-100); // Limit particles
      });
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export const ConfettiEffect = () => {
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  const triggerConfetti = () => {
    setIsActive(true);
    const colors = ['#01411C', '#FFFFFF', '#FFD700'];
    const newConfetti: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20
        },
        life: 1
      });
    }

    setConfetti(newConfetti);

    setTimeout(() => {
      setIsActive(false);
      setConfetti([]);
    }, 3000);
  };

  useEffect(() => {
    if (!isActive) return;

    const updateConfetti = () => {
      setConfetti(prev =>
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          velocity: {
            x: particle.velocity.x * 0.98,
            y: particle.velocity.y + 0.5 // gravity
          },
          life: particle.life - 0.005
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(updateConfetti, 16);
    return () => clearInterval(interval);
  }, [isActive]);

  // Auto trigger on mount
  useEffect(() => {
    const timer = setTimeout(triggerConfetti, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `rotate(${particle.velocity.x * 5}deg)`,
          }}
        />
      ))}
    </div>
  );
};