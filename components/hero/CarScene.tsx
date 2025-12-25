'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Loader from '@/components/ui/Loader'
import CarModel from './CarModel'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function CarScene() {
    const [dpr, setDpr] = useState(1.5)

    useEffect(() => {
        const pixelRatio = window.devicePixelRatio
        setDpr(Math.min(pixelRatio, 2))
    }, [])

    return (
        <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 10], fov: 30 }} // Tighter FOV for cinematic look
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
            className="w-full h-full"
            shadows
        >
            <Suspense fallback={<Html center><Loader /></Html>}>

                <color attach="background" args={['#020202']} />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                {/* Cinematic Studio Lighting */}
                <ambientLight intensity={0.2} />

                {/* Main Key Light */}
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.2}
                    penumbra={1}
                    intensity={5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    color="#ffffff"
                />

                {/* Rim Light (Cool Blue) */}
                <spotLight position={[-10, 5, -5]} intensity={10} color="#0088ff" angle={0.5} />

                {/* Fill Light */}
                <pointLight position={[0, -5, 5]} intensity={2} color="#444444" />

                <Environment preset="city" blur={0.8} />

                {/* Floor Reflections */}
                <gridHelper args={[50, 50, '#222222', '#050505']} position={[0, -3, 0]} />

                <CarModel />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.8}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />

            </Suspense>
        </Canvas>
    )
}
