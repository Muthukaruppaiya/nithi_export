import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Pod from './Pod'
import { GRADES } from '../data/content'

const SPACING = 1.9

function Turntable({ active }) {
  const refs = useRef([])

  useFrame((state, dt) => {
    refs.current.forEach((g, i) => {
      if (!g) return
      const target = GRADES[i].id === active ? 1.12 : 0.92
      const s = THREE.MathUtils.damp(g.scale.x, target * (GRADES[i].sizeMm / 8), 6, dt)
      g.scale.setScalar(s)
      g.rotation.y += dt * (GRADES[i].id === active ? 0.9 : 0.3)
    })
  })

  return GRADES.map((g, i) => (
    <Float key={g.id} speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={(el) => (refs.current[i] = el)} position={[(i - 1) * SPACING, 0.15, 0]} rotation={[0, 0, 0.22]}>
        <Pod color={g.id === active ? '#8bb348' : '#7c9f3d'} />
      </group>
    </Float>
  ))
}

export default function PodViewer({ active }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.6, 6.8], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff3d6" />
      <directionalLight position={[-4, 1, -3]} intensity={1} color="#bdd68c" />
      <Turntable active={active} />
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={9} blur={2.6} far={3} color="#10291c" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 4, -4]} scale={[8, 4, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[-4, 1, 3]} scale={3} color="#f1e3bb" />
      </Environment>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.9} />
    </Canvas>
  )
}
