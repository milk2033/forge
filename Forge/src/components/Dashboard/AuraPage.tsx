// src/components/Dashboard/AuraPage.tsx

import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useYapsScore } from '../../hooks/useYapsScore'
import { USER_TIERS } from '../../utils/userTiers'
import { sha256Hex } from '../../utils/hash'
import './Dashboard.css'

export function AuraPage() {
    const hardcodedUser = 'serpinxbt'
    const { data, isLoading, error } = useYapsScore(hardcodedUser)

    const [shaHash, setShaHash] = useState<string>('')
    const [avatarUrl, setAvatarUrl] = useState<string>('')
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        sha256Hex(hardcodedUser).then(setShaHash)
        setAvatarUrl(`https://unavatar.io/x/${hardcodedUser}`)
    }, [hardcodedUser])

    useEffect(() => {
        if (!canvasRef.current || !shaHash || !data || !avatarUrl) return

        // derive seeds
        const hueSeed = parseInt(shaHash.slice(0, 8), 16) / 0xFFFFFFFF
        const phaseSeed = parseInt(shaHash.slice(8, 16), 16) / 0xFFFFFFFF
        const rngSeed = parseInt(shaHash.slice(16, 24), 16)

        // seeded RNG
        function mulberry32(a: number) {
            return function () {
                let t = (a += 0x6D2B79F5)
                t = Math.imul(t ^ (t >>> 15), t | 1)
                t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296
            }
        }
        const rng = mulberry32(rngSeed)

        // scene & camera
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
        camera.position.z = 5

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!,
            alpha: true,
            antialias: true,
        })
        renderer.setSize(300, 300)

        // — Avatar at center —
        const loader = new THREE.TextureLoader()
        const avatarGeo = new THREE.CircleGeometry(1.0, 64)
        loader.load(avatarUrl, texture => {
            const avatarMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true })
            const avatarMesh = new THREE.Mesh(avatarGeo, avatarMat)
            scene.add(avatarMesh)
        })

        // — Particle Corona —
        const count = Math.floor(300 + rng() * 700)
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const angle = rng() * Math.PI * 2
            const radius = 1.3 + rng() * 0.3
            positions[i * 3] = Math.cos(angle) * radius
            positions[i * 3 + 1] = Math.sin(angle) * radius
            positions[i * 3 + 2] = (rng() - 0.5) * 0.2
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const hue = (0.55 + hueSeed * 0.1) % 1
        const baseColor = new THREE.Color().setHSL(hue, 0.8, 0.6)
        const particleMat = new THREE.PointsMaterial({
            size: 0.03 + rng() * 0.05,
            color: baseColor,
            transparent: true,
            opacity: 0.8,
        })
        const particles = new THREE.Points(particleGeo, particleMat)
        scene.add(particles)

        // — Inner Glow Ring —
        const innerGeo = new THREE.RingGeometry(1.1, 1.2, 64)
        const innerMat = new THREE.MeshBasicMaterial({
            color: baseColor.clone().offsetHSL(0, -0.2, 0.2),
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
        })
        const innerRing = new THREE.Mesh(innerGeo, innerMat)
        scene.add(innerRing)

        // animation loop
        let reqId: number
        const clock = new THREE.Clock()
        const animate = () => {
            const t = clock.getElapsedTime()
            const pulse = Math.sin((t + phaseSeed * Math.PI * 2) * 2) * 0.5 + 0.5

            // particles
            particles.rotation.z = t * 0.2 * (1 + phaseSeed)
            const scale = 1 + 0.05 * pulse
            particles.scale.set(scale, scale, scale)

            // inner ring
            innerRing.rotation.z = -t * 0.4
            innerMat.opacity = 0.3 + 0.4 * pulse

            renderer.render(scene, camera)
            reqId = requestAnimationFrame(animate)
        }
        animate()

        // cleanup
        return () => {
            cancelAnimationFrame(reqId)
            particleGeo.dispose()
            particleMat.dispose()
            innerGeo.dispose()
            innerMat.dispose()
            avatarGeo.dispose()
            renderer.dispose()
        }
    }, [shaHash, data, avatarUrl])

    if (isLoading) return <div className="page-aura">Loading your aura…</div>
    if (error || !data) return <div className="page-aura">Error loading score.</div>

    const tier = USER_TIERS.find(t => t.name === 'Legendary')!

    return (
        <section className="page-aura">
            <div className="aura-header">
                <div className="user-info">
                    <div className="score-info">
                        <span className="score-label">Score:</span>
                        <span className="score-value">{data.yaps_all.toFixed(2)}</span>
                    </div>
                    <div className="tier-info">
                        <span className="tier-label">Tier:</span>
                        <span className={`tier-badge tier-${tier.name.toLowerCase()}`}>
                            {tier.name}
                        </span>
                    </div>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={301}
                height={300}
                className="aura-canvas"
            />
        </section>
    )
}
