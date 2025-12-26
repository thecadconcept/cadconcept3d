'use client'

import { useRef, useState } from 'react'
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { ScannerShader } from './ScannerShader'

// Register (Redundant but safe if file loaded separately)
extend({ ScannerShader })

// Type def
declare global {
    namespace JSX {
        interface IntrinsicElements {
            scannerShader: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof ScannerShader> & {
                uColor?: THREE.Color
                uScanColor?: THREE.Color
                uWireframeColor?: THREE.Color
                uCadColor?: THREE.Color
                uScanPos?: number
            }
        }
    }
}

interface CarModelProps {
    isMobile: boolean
}

export default function CarModel({ isMobile }: CarModelProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const groupRef = useRef<THREE.Group>(null)

    // Animation Loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const scrollY = window.scrollY || 0

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = time

            // Scan Motion
            const duration = 8
            const cycle = time % duration
            let scanY = 4.0 - (cycle / 4.0) * 8.0
            if (cycle > 4.0) {
                scanY = -4.0 + ((cycle - 4.0) / 4.0) * 8.0
            }
            materialRef.current.uniforms.uScanPos.value = scanY
        }

        // Scroll-driven rotation
        if (groupRef.current) {
            // Smooth rotation based on scroll
            // Rotate Y axis based on scroll
            const targetRotationY = scrollY * 0.002
            const targetRotationX = scrollY * 0.0005

            // Base rotation + scroll influence
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY + 0.5, 0.1) // 0.5 is initial offset
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1)
        }
    })

    const position: [number, number, number] = isMobile ? [0, 0, 0] : [4, 0, 0]
    const scale = isMobile ? 0.7 : 1

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh castShadow receiveShadow>
                    {/* Reduce segments for performance */}
                    <torusKnotGeometry args={[1.8, 0.6, 150, 20, 2, 3]} />
                    {/* @ts-ignore */}
                    <scannerShader
                        ref={materialRef}
                        uColor={new THREE.Color('#222222')}
                        uScanColor={new THREE.Color('#00E5FF')} // Primary
                        uWireframeColor={new THREE.Color('#00E5FF')} // Primary
                        uCadColor={new THREE.Color('#FFFFFF')}
                    />
                </mesh>
            </Float>

            {/* Floating UI - 3D tracked DOM elements */}
            <Html position={isMobile ? [0, 2.5, 0] : [2.5, 1, 0]} className="pointer-events-none select-none w-40" center={isMobile}>
                <div className="bg-black/40 backdrop-blur-md border border-primary/30 p-2 rounded-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-primary font-mono tracking-widest">SCANNING LIVE</span>
                    </div>
                    <div className="text-[10px] text-white/60 font-mono space-y-0.5">
                        <div>PTS: 121,984</div>
                        <div>ACC: ±0.025mm</div>
                        <div className="w-full h-0.5 bg-white/10 mt-1">
                            <div className="h-full bg-primary w-[70%] animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </Html>

            {!isMobile && (
                <Html position={[-2, -2, 1]}>
                    <div className="font-mono text-[10px] text-white/40 tracking-[0.2em]">
                        GRID_REF_X: 42.10
                    </div>
                </Html>
            )}
        </group>
    )
}
