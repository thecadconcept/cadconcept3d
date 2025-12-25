'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'

export default function Scene() {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Optimize pixel ratio
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#0A0A0A']} />

                    {/* Lighting - Moody and contrasty */}
                    <ambientLight intensity={0.2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1}
                        color="#C0C0C0"
                    />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5FF" />

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />


                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 2.5}
                    />

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    )
}
