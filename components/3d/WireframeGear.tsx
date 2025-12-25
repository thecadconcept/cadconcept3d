'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function WireframeGear() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Create a gear-like shape (memoized)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const radius = 1
    const teeth = 12
    const toothDepth = 0.2

    for (let i = 0; i <= teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2
      const r = i % 2 === 0 ? radius : radius + toothDepth
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r

      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        shape.lineTo(x, y)
      }
    }
    shape.closePath()

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: false,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#00E5FF"
        wireframe
        emissive="#00E5FF"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

