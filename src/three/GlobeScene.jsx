import { useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import landDots from '../data/landDots.json'
import { MARKETS, ORIGIN } from '../data/content'

const R = 2
const DEG = Math.PI / 180

function toVec(lat, lon, r = R) {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}

const FOCUS = { lat: 20, lon: 66 }
const focusVec = toVec(FOCUS.lat, FOCUS.lon)
const FOCUS_Y = -Math.atan2(focusVec.x, focusVec.z)

function LandDots() {
  const ref = useRef()
  const geo = useMemo(() => new THREE.CircleGeometry(0.018, 6), [])

  useLayoutEffect(() => {
    const m = new THREE.Object3D()
    landDots.forEach(([lat, lon], i) => {
      const p = toVec(lat, lon, R + 0.002)
      m.position.copy(p)
      m.lookAt(p.clone().multiplyScalar(2))
      m.updateMatrix()
      ref.current.setMatrixAt(i, m.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[geo, undefined, landDots.length]}>
      <meshBasicMaterial color="#bdd68c" transparent opacity={0.75} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { color: { value: new THREE.Color('#9bbd5a') } },
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 color; varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(color, 1.0) * i; }`,
      }),
    [],
  )
  return (
    <mesh scale={1.18} material={material}>
      <sphereGeometry args={[R, 64, 64]} />
    </mesh>
  )
}

function Route({ to, delay }) {
  const runner = useRef()
  const { curve, tube } = useMemo(() => {
    const a = toVec(ORIGIN.lat, ORIGIN.lon)
    const b = toVec(to.lat, to.lon)
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const lift = 1 + a.distanceTo(b) * 0.28
    mid.normalize().multiplyScalar(R * lift)
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    return { curve, tube: new THREE.TubeGeometry(curve, 64, 0.008, 6, false) }
  }, [to])

  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * 0.28 + delay) % 1 + 1) % 1
    runner.current.position.copy(curve.getPoint(t))
  })

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial color="#d9b968" transparent opacity={0.55} />
      </mesh>
      <mesh ref={runner}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#fff3d0" />
      </mesh>
    </group>
  )
}

const LABEL_SIDE = {
  top: '-translate-y-6',
  bottom: 'translate-y-6',
  left: '-translate-x-[calc(50%+14px)]',
  right: 'translate-x-[calc(50%+14px)]',
}

function Marker({ lat, lon, label, side = 'top', origin }) {
  const ring = useRef()
  const pos = useMemo(() => toVec(lat, lon, R + 0.01), [lat, lon])
  const look = useMemo(() => pos.clone().multiplyScalar(2), [pos])

  useLayoutEffect(() => ring.current.lookAt(look), [look])
  useFrame(({ clock }) => {
    const s = 1 + ((clock.elapsedTime * 0.8 + lat) % 1) * 2.2
    ring.current.scale.setScalar(s)
    ring.current.material.opacity = 1 - (s - 1) / 2.2
  })

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[origin ? 0.05 : 0.038, 16, 16]} />
        <meshBasicMaterial color={origin ? '#f1e3bb' : '#d9b968'} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.05, 0.065, 32]} />
        <meshBasicMaterial color="#d9b968" transparent side={THREE.DoubleSide} />
      </mesh>
      <Html distanceFactor={4} center zIndexRange={[10, 0]}>
        <span
          className={`pointer-events-none block rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap shadow-lg ${LABEL_SIDE[side]} ${
            origin ? 'bg-gold-500 text-forest-950' : 'bg-forest-950/85 text-cream-50 ring-1 ring-gold-400/40'
          }`}
        >
          {label}
        </span>
      </Html>
    </group>
  )
}

function Globe() {
  const spin = useRef()
  useFrame(({ clock }) => {
    spin.current.rotation.y = FOCUS_Y + Math.sin(clock.elapsedTime * 0.15) * 0.35
  })

  return (
    <group rotation={[FOCUS.lat * DEG * 0.8, 0, 0]}>
      <group ref={spin} rotation={[0, FOCUS_Y, 0]}>
        <mesh>
          <sphereGeometry args={[R - 0.005, 64, 64]} />
          <meshStandardMaterial color="#10291c" roughness={0.85} metalness={0.1} />
        </mesh>
        <mesh>
          <sphereGeometry args={[R + 0.001, 36, 18]} />
          <meshBasicMaterial color="#2b6146" wireframe transparent opacity={0.12} />
        </mesh>
        <LandDots />
        <Marker lat={ORIGIN.lat} lon={ORIGIN.lon} label={ORIGIN.name} side={ORIGIN.side} origin />
        {MARKETS.map((m, i) => (
          <group key={m.port}>
            <Route to={m} delay={i * 0.25} />
            <Marker lat={m.lat} lon={m.lon} label={m.label} side={m.side} />
          </group>
        ))}
      </group>
      <Atmosphere />
    </group>
  )
}

export default function GlobeScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.8], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[-4, 3, 5]} intensity={1.6} color="#f1e3bb" />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} minAzimuthAngle={-0.7} maxAzimuthAngle={0.7} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
    </Canvas>
  )
}
