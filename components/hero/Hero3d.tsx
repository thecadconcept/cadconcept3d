'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const isMobile = window.innerWidth < 768
        const isLowPower = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // ── Renderer ────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !(isMobile || isLowPower),
            powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(isMobile || isLowPower ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 1.8))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        // ── Scene & Camera ───────────────────────────────────────────────────
        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x030712, 7, 18)

        const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100)
        camera.position.set(0, 0, 8)

        // ── Lights ───────────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.42))

        const spotLight = new THREE.SpotLight(0x4f9aff, 1.8)
        spotLight.position.set(10, 10, 10)
        spotLight.angle = 0.2
        spotLight.penumbra = 1
        scene.add(spotLight)

        const pointLight = new THREE.PointLight(0xff6600, 1.3)
        pointLight.position.set(-10, -5, -5)
        scene.add(pointLight)

        // ── Materials ────────────────────────────────────────────────────────
        const metalMat = new THREE.MeshStandardMaterial({
            color: '#2d4a7c',
            roughness: 0.25,
            metalness: 0.82,
            emissive: '#1a2b4b',
            emissiveIntensity: 0.22,
        })
        const wireMat = new THREE.MeshBasicMaterial({
            color: '#00aaff',
            wireframe: true,
            transparent: true,
            opacity: 0.14,
        })
        const accentMat = new THREE.MeshStandardMaterial({
            color: '#ff6600',
            roughness: 0.22,
            metalness: 0.9,
            emissive: '#ff4400',
            emissiveIntensity: 0.36,
        })

        // ── Main Group ───────────────────────────────────────────────────────
        const group = new THREE.Group()
        group.position.set(isMobile ? 0 : 3.2, isMobile ? -1 : 0, 0)
        scene.add(group)

        // Central Core
        const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 2, 24)
        const core = new THREE.Mesh(coreGeo, metalMat)
        core.rotation.x = Math.PI / 2
        group.add(core)

        const coreWireGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.8, 14)
        const coreWire = new THREE.Mesh(coreWireGeo, wireMat)
        coreWire.rotation.x = Math.PI / 2
        group.add(coreWire)

        // Inner Gear
        const gearGroup = new THREE.Group()
        const gearDiskGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 8)
        const gearDisk = new THREE.Mesh(gearDiskGeo, metalMat)
        gearDisk.rotation.x = Math.PI / 2
        gearGroup.add(gearDisk)

        for (let i = 0; i < 8; i++) {
            const toothGeo = new THREE.BoxGeometry(0.4, 0.8, 0.2)
            const tooth = new THREE.Mesh(toothGeo, accentMat)
            tooth.position.set(
                Math.cos((i * Math.PI) / 4) * 1.4,
                Math.sin((i * Math.PI) / 4) * 1.4,
                0,
            )
            tooth.rotation.z = (i * Math.PI) / 4
            gearGroup.add(tooth)
        }
        group.add(gearGroup)

        // Outer Gimbal Rings
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.1, 12, 48), metalMat)
        group.add(ring1)

        const ring1Wire = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.1, 12, 48), wireMat)
        ring1Wire.rotation.set(0.5, 0.5, 0)
        group.add(ring1Wire)

        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.05, 10, 40), metalMat)
        group.add(ring2)

        const ring2Wire = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.05, 10, 40), wireMat)
        ring2Wire.rotation.set(-0.5, -0.5, 0)
        group.add(ring2Wire)

        // Floating Accent Nodes
        const floatNodes: THREE.Mesh[] = []
        for (let i = 0; i < 4; i++) {
            const node = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), accentMat)
            node.position.set(
                Math.sin(i) * 4,
                Math.cos(i) * 4,
                (i % 2 === 0 ? 1 : -1) * 2,
            )
            group.add(node)
            floatNodes.push(node)
        }

        // ── Animation Loop ───────────────────────────────────────────────────
        const clock = new THREE.Clock()
        let rafId: number

        function animate() {
            rafId = requestAnimationFrame(animate)
            if (prefersReducedMotion) {
                renderer.render(scene, camera)
                return
            }

            const t = clock.getElapsedTime()
            const scrollY = window.scrollY || 0

            // Gentle float on main group
            group.position.y = (isMobile ? -1 : 0) + Math.sin(t * 1.8) * 0.12

            // Scroll-driven rotation
            group.rotation.y = t * 0.1 + scrollY * 0.002
            group.rotation.x = scrollY * 0.0005

            // Ring spin
            ring1.rotation.x += 0.002
            ring1.rotation.z += 0.001
            ring2.rotation.x -= 0.0015
            ring2.rotation.y += 0.001

            // Gear spin
            gearGroup.rotation.z -= 0.003

            // Float nodes
            floatNodes.forEach((node, i) => {
                node.rotation.x += 0.01 * (i + 1)
                node.rotation.y += 0.008 * (i + 1)
                node.position.y = Math.cos(i) * 4 + Math.sin(t * (3 + i) * 0.5) * 0.3
            })

            renderer.render(scene, camera)
        }

        animate()

        // ── Resize Handler ───────────────────────────────────────────────────
        const onResize = () => {
            if (!mount) return
            const w = mount.clientWidth
            const h = mount.clientHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
        window.addEventListener('resize', onResize)

        // ── Cleanup ──────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', onResize)
            mount.removeChild(renderer.domElement)
            renderer.dispose()
            metalMat.dispose()
            wireMat.dispose()
            accentMat.dispose()
            scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh) obj.geometry.dispose()
            })
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 z-0"
            style={{ opacity: 0.82 }}
        />
    )
}
