import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import Pod from './Pod'

const PALETTE = ['#7fa63c', '#8db349', '#739b35', '#94b752', '#6f9233']

function rand(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function Cluster({ compact }) {
  const group = useRef()
  const hero = useRef()

  const pods = useMemo(() => {
    const r = rand(42)
    const count = compact ? 9 : 16
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + r() * 0.6
      const radius = 2.1 + r() * 1.6
      return {
        position: [Math.cos(angle) * radius, (r() - 0.5) * 4.2, Math.sin(angle) * radius * 0.7 - 0.8],
        rotation: [r() * Math.PI, r() * Math.PI, r() * Math.PI],
        scale: 0.32 + r() * 0.3,
        color: PALETTE[i % PALETTE.length],
        speed: 0.8 + r() * 1.4,
      }
    })
  }, [compact])

  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, dt) => {
    const p = pointer.current
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p.x * 0.35, 2.5, dt)
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -p.y * 0.2, 2.5, dt)
    }
    if (hero.current) {
      hero.current.rotation.y += dt * 0.35
      hero.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.18 + 0.35
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <group ref={hero}>
          <Pod scale={1.45} color="#88ae46" />
        </group>
      </Float>
      {pods.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1.6} floatIntensity={1.4}>
          <Pod position={p.position} rotation={p.rotation} scale={p.scale} color={p.color} />
        </Float>
      ))}
      <Sparkles count={compact ? 40 : 80} scale={[9, 6, 4]} size={2.2} speed={0.35} color="#e8cf8a" opacity={0.7} />
    </group>
  )
}

export default function HeroScene() {
  const compact = typeof window !== 'undefined' && window.innerWidth < 768
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#fff3d6" />
      <directionalLight position={[-5, -2, -3]} intensity={1.2} color="#9bbd5a" />
      <pointLight position={[0, 0, 3]} intensity={6} distance={8} color="#d9b968" />
      <Cluster compact={compact} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={1.5} position={[-5, 1, 2]} scale={4} color="#bdd68c" />
        <Lightformer form="rect" intensity={1} position={[5, -1, 2]} scale={[3, 6, 1]} color="#f1e3bb" />
      </Environment>
    </Canvas>
  )
}
