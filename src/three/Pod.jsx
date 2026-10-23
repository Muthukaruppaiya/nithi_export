import { useMemo } from 'react'
import * as THREE from 'three'

let cached = null

// A green cardamom pod: a stretched sphere with a three-lobed cross-section,
// fine lengthwise ridges, a pointed tip and a short stalk at the base.
export function podGeometry() {
  if (cached) return cached
  const geo = new THREE.SphereGeometry(1, 72, 56)
  const pos = geo.attributes.position
  const v = new THREE.Vector3()
  const colors = []
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const y = v.y
    const theta = Math.atan2(v.z, v.x)
    const lobe = 1 + 0.1 * Math.cos(3 * theta)
    const ridge = 1 + 0.022 * Math.cos(27 * theta) * (1 - Math.abs(y) ** 4)
    const taper = y > 0 ? 1 - 0.42 * y ** 2.4 : 1 - 0.22 * (-y) ** 3
    const r = 0.44 * lobe * ridge * taper
    pos.setXYZ(i, v.x * r, y * 1.05, v.z * r)

    const shade = 0.86 + 0.14 * Math.cos(3 * theta) + 0.05 * Math.cos(27 * theta)
    const tipFade = y > 0.75 ? 1 - (y - 0.75) * 0.9 : 1
    colors.push(shade * tipFade, shade * tipFade, shade * 0.95 * tipFade)
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.computeVertexNormals()
  cached = geo
  return geo
}

export default function Pod({ color = '#86ab45', roughness = 0.62, ...props }) {
  const geometry = useMemo(() => podGeometry(), [])
  return (
    <group {...props}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial color={color} vertexColors roughness={roughness} metalness={0.02} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <coneGeometry args={[0.06, 0.16, 12]} />
        <meshStandardMaterial color="#5c7a2a" roughness={0.8} />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.18, 10]} />
        <meshStandardMaterial color="#8a8a4a" roughness={0.9} />
      </mesh>
    </group>
  )
}
