'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Float, Cylinder, Torus, Box } from '@react-three/drei'
import * as THREE from 'three'

function MechanicalAssembly() {
    const groupRef = useRef<THREE.Group>(null)
    const ring1Ref = useRef<THREE.Mesh>(null)
    const ring2Ref = useRef<THREE.Mesh>(null)
    const gearRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const scrollY = typeof window !== 'undefined' ? window.scrollY : 0

        if (groupRef.current) {
            // Combine continuous rotation (time) with scroll influence
            // Replaces previous relative increment (+= delta * 0.1) with absolute calculation
            groupRef.current.rotation.y = (time * 0.1) + (scrollY * 0.002)

            // Add slight tilt on scroll for dynamic feel
            groupRef.current.rotation.x = (scrollY * 0.0005)
        }

        // Keep inner mechanical animations continuously running
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x += delta * 0.2
            ring1Ref.current.rotation.z += delta * 0.1
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x -= delta * 0.15
            ring2Ref.current.rotation.y += delta * 0.1
        }
        if (gearRef.current) {
            gearRef.current.rotation.z -= delta * 0.3
        }
    })

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: "#2d4a7c",
        roughness: 0.2,
        metalness: 0.8,
        emissive: "#1a2b4b",
        emissiveIntensity: 0.2
    })

    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: "#00aaff",
        wireframe: true,
        transparent: true,
        opacity: 0.15
    })

    const accentMaterial = new THREE.MeshStandardMaterial({
        color: "#ff6600",
        roughness: 0.2,
        metalness: 0.9,
        emissive: "#ff4400",
        emissiveIntensity: 0.4
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <group ref={groupRef}>
                {/* Central Core */}
                <Cylinder args={[0.5, 0.5, 2, 32]} rotation={[Math.PI / 2, 0, 0]}>
                    <primitive object={metalMaterial} />
                </Cylinder>
                <Cylinder args={[0.6, 0.6, 1.8, 16]} rotation={[Math.PI / 2, 0, 0]}>
                    <primitive object={wireframeMaterial} />
                </Cylinder>

                {/* Inner Rotating Gear */}
                <group ref={gearRef}>
                    <Cylinder args={[1.2, 1.2, 0.2, 8]} rotation={[Math.PI / 2, 0, 0]}>
                        <primitive object={metalMaterial} />
                    </Cylinder>
                    {/* Teeth */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Box key={i} args={[0.4, 0.8, 0.2]} position={[Math.cos(i * Math.PI / 4) * 1.4, Math.sin(i * Math.PI / 4) * 1.4, 0]} rotation={[0, 0, i * Math.PI / 4]}>
                            <primitive object={accentMaterial} />
                        </Box>
                    ))}
                </group>

                {/* Outer Gimbal Rings */}
                <Torus ref={ring1Ref} args={[2.2, 0.1, 16, 64]}>
                    <primitive object={metalMaterial} />
                </Torus>
                <Torus args={[2.25, 0.1, 16, 64]} rotation={[0.5, 0.5, 0]}>
                    <primitive object={wireframeMaterial} />
                </Torus>

                <Torus ref={ring2Ref} args={[3, 0.05, 16, 64]}>
                    <primitive object={metalMaterial} />
                </Torus>
                <Torus args={[3.05, 0.05, 16, 64]} rotation={[-0.5, -0.5, 0]}>
                    <primitive object={wireframeMaterial} />
                </Torus>

                {/* Floating Particles/Nodes */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <Float key={`f-${i}`} speed={3 + i} rotationIntensity={1} floatIntensity={2} position={[
                        Math.sin(i) * 4,
                        Math.cos(i) * 4,
                        (i % 2 === 0 ? 1 : -1) * 2
                    ]}>
                        <Box args={[0.2, 0.2, 0.2]}>
                            <primitive object={accentMaterial} />
                        </Box>
                    </Float>
                ))}

            </group>
        </Float>
    )
}

export default function Hero3D() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="w-full h-full absolute inset-0 z-0 opacity-80">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} color="#4f9aff" />
                <pointLight position={[-10, -5, -5]} intensity={2} color="#ff6600" />

                <group position={isMobile ? [0, -1, 0] : [3.5, 0, 0]}>
                    <MechanicalAssembly />
                </group>

                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
