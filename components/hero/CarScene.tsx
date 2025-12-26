'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Stars, Sparkles } from '@react-three/drei'

import Loader from '@/components/ui/Loader'
import CarModel from './CarModel'
import { Html } from '@react-three/drei'
import * as THREE from 'three'




function DriftingGrid() {
    const gridRef = useRef<THREE.GridHelper>(null)
    useFrame((state) => {
        if (gridRef.current) {
            // "slite moves to the right" -> slowly increment X
            // Speed 0.2 is subtle
            gridRef.current.position.x = (state.clock.elapsedTime * 0.2) % 5
            // Add a tiny bit of Z movement for 3D feel
            gridRef.current.position.z = (state.clock.elapsedTime * 0.05) % 5
        }
    })
    return <gridHelper ref={gridRef} args={[100, 50, '#222222', '#050505']} position={[0, -3, 0]} />
}

export default function CarScene() {
    const [dpr, setDpr] = useState(1.5)

    useEffect(() => {
        const pixelRatio = window.devicePixelRatio
        setDpr(Math.min(pixelRatio, 2))
    }, [])

    return (
        <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 12], fov: 35 }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
            className="w-full h-full"
            shadows
        >
            <Suspense fallback={<Html center><Loader /></Html>}>

                <color attach="background" args={['#020202']} />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <ambientLight intensity={0.2} />

                <spotLight
                    position={[10, 10, 10]}
                    angle={0.2}
                    penumbra={1}
                    intensity={5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    color="#ffffff"
                />

                <spotLight position={[-10, 5, -5]} intensity={10} color="#0088ff" angle={0.5} />
                <pointLight position={[0, -5, 5]} intensity={2} color="#444444" />

                <Environment preset="city" blur={0.8} />

                {/* Floating Particles for "Enhanced Visual Appeal" */}
                <Sparkles
                    count={150}
                    scale={[30, 20, 20]}
                    size={3}
                    speed={0.4}
                    opacity={0.5}
                    color="#00E5FF"
                    position={[0, 5, 0]}
                    noise={0.1}
                />

                <DriftingGrid />

                <CarModel />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    // autoRotate // Disable autoRotate to focus on the linear movement
                    // autoRotateSpeed={0.8}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />

            </Suspense>
        </Canvas>
    )
}
