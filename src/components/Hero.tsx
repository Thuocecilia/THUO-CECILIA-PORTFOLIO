
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import './Hero.css'

function Laptop() {
  const laptopRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!laptopRef.current) return

    // Continuous horizontal rotation
    laptopRef.current.rotation.y += delta * 0.35

    // Gentle movement while rotating
    laptopRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.06
  })

  return (
    <group ref={laptopRef} position={[0, 0, 0]} scale={0.92}>
      {/* Laptop screen casing */}
      <group position={[0, 0.18, -0.55]} rotation={[-0.12, 0, 0]}>
        <RoundedBox
          args={[2.9, 1.9, 0.12]}
          radius={0.09}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#252B3A"
            metalness={0.75}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Screen display */}
        <mesh position={[0, 0, 0.066]}>
          <planeGeometry args={[2.68, 1.68]} />
          <meshBasicMaterial color="#0B0D12" />
        </mesh>

        {/* Blue-tinted screen */}
        <mesh position={[0, 0, 0.071]}>
          <planeGeometry args={[2.58, 1.58]} />
          <meshBasicMaterial
            color="#10264A"
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Decorative code lines */}
        {Array.from({ length: 6 }, (_, index) => (
          <group key={index}>
            <mesh
              position={[-0.72, 0.48 - index * 0.18, 0.078]}
            >
              <boxGeometry
                args={[
                  index % 2 === 0 ? 0.95 : 0.68,
                  0.025,
                  0.006,
                ]}
              />
              <meshBasicMaterial
                color={index % 2 === 0 ? '#60A5FA' : '#A3FFCB'}
              />
            </mesh>

            <mesh
              position={[0.52, 0.48 - index * 0.18, 0.078]}
            >
              <boxGeometry args={[0.35, 0.025, 0.006]} />
              <meshBasicMaterial color="#64748B" />
            </mesh>
          </group>
        ))}

        {/* Webcam */}
        <mesh position={[0, 0.91, 0.065]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#60A5FA" />
        </mesh>
      </group>

      {/* Laptop keyboard base */}
      <group position={[0, -0.86, 0.05]}>
        <RoundedBox
          args={[3.05, 0.15, 2.05]}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#353D50"
            metalness={0.8}
            roughness={0.28}
          />
        </RoundedBox>

        {/* Keyboard surface */}
        <mesh position={[0, 0.078, -0.22]}>
          <boxGeometry args={[2.45, 0.018, 0.82]} />
          <meshStandardMaterial
            color="#151A25"
            metalness={0.35}
            roughness={0.5}
          />
        </mesh>

        {/* Keyboard keys */}
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[
                -1.12 + col * 0.204,
                0.091,
                -0.51 + row * 0.19,
              ]}
            >
              <boxGeometry args={[0.15, 0.018, 0.12]} />
              <meshStandardMaterial
                color={col % 3 === 0 ? '#52627C' : '#242C3B'}
                roughness={0.45}
              />
            </mesh>
          )),
        )}

        {/* Trackpad */}
        <mesh position={[0, 0.09, 0.52]}>
          <boxGeometry args={[0.72, 0.018, 0.38]} />
          <meshStandardMaterial
            color="#64748B"
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>

        {/* Blue front-edge highlight */}
        <mesh position={[0, 0.045, 1.02]}>
          <boxGeometry args={[2.7, 0.025, 0.025]} />
          <meshBasicMaterial color="#60A5FA" />
        </mesh>
      </group>
    </group>
  )
}

function LaptopScene() {
  return (
    <>
      <ambientLight intensity={1.3} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={2}
        color="#FFFFFF"
      />

      <pointLight
        position={[-4, 1, 2]}
        intensity={35}
        color="#3B82F6"
      />

      <pointLight
        position={[3, -2, -2]}
        intensity={20}
        color="#A3FFCB"
      />

      <Float
        speed={1.2}
        rotationIntensity={0.08}
        floatIntensity={0.18}
      >
        <Laptop />
      </Float>
    </>
  )
}

export default function Hero() {
  return (
    <div className="hero-laptop-background" aria-hidden="true">
      {/* Background lighting effects */}
      <div className="hero-laptop-glow hero-laptop-glow-blue" />
      <div className="hero-laptop-glow hero-laptop-glow-mint" />

      {/* Rotating 3D laptop */}
      <div className="hero-laptop-canvas">
        <Canvas
          camera={{ position: [0, 0.35, 7.2], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <LaptopScene />
        </Canvas>
      </div>

      {/* Decorative background grid */}
      <div className="hero-laptop-grid" />
    </div>
  )
}
