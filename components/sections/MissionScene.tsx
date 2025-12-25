'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Center, Float, Line, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useMemo, useRef } from 'react'

function ProceduralHull() {
    // Creating a boat-like hull shape using LatheGeometry sections or Lofting
    // Let's use a custom shape extruded or lathed.
    // Simpler: A stretched half-capsule or modified cylinder.

    // Abstract Technical Hull
    return (
        <group rotation={[0, Math.PI / 1.5, 0]}>
            {/* Main Hull Shape (Bottom) */}
            <mesh position={[0, -0.5, 0]}>
                {/* Length, Width, Depth */}
                <boxGeometry args={[4, 1, 1.5]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Deck / Top */}
            <mesh position={[-0.2, 0.2, 0]}>
                <boxGeometry args={[3.5, 0.5, 1.4]} />
                <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Cabin / Superstructure */}
            <mesh position={[-0.5, 1.0, 0]}>
                <boxGeometry args={[1.5, 1.0, 1.0]} />
                <meshStandardMaterial color="#fff" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Wireframe Overlay Effect (Cutaway look) */}
            <mesh position={[0, -0.5, 0]} scale={[1.01, 1.01, 1.01]}>
                <boxGeometry args={[4, 1, 1.5]} />
                <meshBasicMaterial wireframe color="#00ffff" transparent opacity={0.3} />
            </mesh>
            <mesh position={[-0.5, 1.0, 0]} scale={[1.01, 1.01, 1.01]}>
                <boxGeometry args={[1.5, 1.0, 1.0]} />
                <meshBasicMaterial wireframe color="#00ffff" transparent opacity={0.5} />
            </mesh>

            {/* Abstract Engines */}
            <mesh position={[-2.2, -0.2, 0.4]}>
                <boxGeometry args={[0.6, 0.8, 0.3]} />
                <meshStandardMaterial color="#555" />
            </mesh>
            <mesh position={[-2.2, -0.2, -0.4]}>
                <boxGeometry args={[0.6, 0.8, 0.3]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* Measurement Lines (Floating UI in 3D) */}
            <Line points={[[-2, 2, 0], [2, 2, 0]]} color="cyan" lineWidth={1} />
            <Line points={[[2, 2, 0], [2, 1, 0]]} color="cyan" lineWidth={1} />
        </group>
    )
}

function BoatScene() {
    return (
        <group>
            <Center>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <ProceduralHull />
                </Float>
            </Center>

            {/* Environment */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="cyan" />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="orange" />
            <Environment preset="city" />
        </group>
    )
}

export default function MissionScene() {
    return (
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
            <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={40} />
            <Suspense fallback={null}>
                <BoatScene />
            </Suspense>
        </Canvas>
    )
}
