'use client'
import { useRef, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Model({
  isHoveredRef,
  mousePosRef,
}: {
  isHoveredRef: React.MutableRefObject<boolean>
  mousePosRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const { scene: gltfScene } = useGLTF('/sleeping.glb')
  const scene = useMemo(() => gltfScene.clone(true), [gltfScene])
  const groupRef    = useRef<THREE.Group>(null)
  const tRef        = useRef(0)
  const autoRotYRef = useRef(0)   // always-incrementing auto rotation
  const offsetXRef  = useRef(0)   // hover tilt X (recoils back)
  const offsetYRef  = useRef(0)   // hover tilt Y (recoils back)

  const { sc, offset } = useMemo(() => {
    const box    = new THREE.Box3().setFromObject(scene)
    const size   = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const sc = 2.6 / Math.max(size.x, size.y, size.z)
    return { sc, offset: center }
  }, [scene])

  useEffect(() => {
    // Solid iridescent pearl — you can see all the features clearly,
    // but the surface shimmers like glass/crystal as it rotates
    const mat = new THREE.MeshPhysicalMaterial({
      color:            new THREE.Color('#D4C0F8'), // soft lavender base
      roughness:        0.12,
      metalness:        0.0,
      reflectivity:     0.9,
      // Iridescence = rainbow shimmer on the surface
      iridescence:      1.0,
      iridescenceIOR:   1.5,
      iridescenceThicknessRange: [120, 700],
      // Clearcoat = glassy top layer that catches light
      clearcoat:        1.0,
      clearcoatRoughness: 0.04,
      // Sheen = soft highlight that follows the form curves (makes face visible)
      sheen:            1.0,
      sheenColor:       new THREE.Color('#E0D0FF'),
      sheenRoughness:   0.25,
      // Subtle self-glow so it doesn't go dark in shadows
      emissive:         new THREE.Color('#6050A0'),
      emissiveIntensity: 0.1,
      // NOT transparent — fully solid so you can see the 3D form
      transparent: false,
    })

    const meshes: THREE.Mesh[] = []
    scene.traverse(c => { if (c instanceof THREE.Mesh) meshes.push(c) })
    meshes.forEach(child => {
      child.material = mat

      // Soft purple rim/outline (BackSide trick)
      const rimMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#A888E0'),
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.18,
      })
      const rim = new THREE.Mesh(child.geometry, rimMat)
      rim.scale.setScalar(1.045)
      child.add(rim)
    })
  }, [scene])

  useFrame(() => {
    if (!groupRef.current) return
    tRef.current += 0.01
    const t = tRef.current

    // Breathing pulse
    const breath = 1 + Math.sin(t * 0.7) * 0.03
    groupRef.current.scale.setScalar(breath)

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.1

    // Auto-rotate always
    autoRotYRef.current += 0.008

    if (isHoveredRef.current) {
      // Lerp offset toward cursor direction — follows the mouse
      const targetX =  mousePosRef.current.x * 0.5  // Y-axis tilt (left/right)
      const targetY = -mousePosRef.current.y * 0.3   // X-axis tilt (up/down)
      offsetXRef.current += (targetX - offsetXRef.current) * 0.08
      offsetYRef.current += (targetY - offsetYRef.current) * 0.08
    } else {
      // Recoil — snap back fast
      offsetXRef.current += (0 - offsetXRef.current) * 0.18
      offsetYRef.current += (0 - offsetYRef.current) * 0.18
    }

    groupRef.current.rotation.y = autoRotYRef.current + offsetXRef.current
    groupRef.current.rotation.x = offsetYRef.current
  })

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={sc}
        position={[-offset.x * sc, -offset.y * sc, -offset.z * sc]}
      />
    </group>
  )
}

function FloatingZ({ delay, x, size, opacity }: { delay: number; x: string; size: number; opacity: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{ opacity: [0, opacity, opacity * 0.6, 0], y: -70, x: [0, 14, 22, 30] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatDelay: 3 + delay * 0.6, ease: 'easeOut' }}
      style={{ position: 'absolute', left: x, top: '30%', fontFamily: 'var(--font-cormorant), serif', fontSize: size, fontStyle: 'italic', fontWeight: 700, color: 'rgba(150,110,210,0.9)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.02em' }}
    >z</motion.span>
  )
}

function FloatingStar({ delay, x, y, size = 12 }: { delay: number; x: string; y: string; size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 20 20" fill="rgba(190,160,240,0.75)"
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.9, 0.4, 0.9, 0], scale: [0, 1, 0.8, 1, 0], rotate: [0, 20, -10, 5, 0] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatDelay: 3.2 + delay * 0.4 }}
    ><path d="M10 0l1.8 8.2L20 10l-8.2 1.8L10 20l-1.8-8.2L0 10l8.2-1.8z" /></motion.svg>
  )
}

export default function SleepingModel() {
  const isHoveredRef = useRef(false)
  const mousePosRef  = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const onMouseEnter = () => { isHoveredRef.current = true }
  const onMouseLeave = () => { isHoveredRef.current = false; mousePosRef.current = { x: 0, y: 0 } }
  const onMouseMove  = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    // Normalise to -1 … +1
    mousePosRef.current = {
      x: (e.clientX - rect.left)  / rect.width  * 2 - 1,
      y: (e.clientY - rect.top)   / rect.height * 2 - 1,
    }
  }

  // Force R3F to re-measure the container after the browser has finished layout.
  // Without this, a hard refresh can give the canvas wrong initial dimensions.
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{ width: '100%', height: '100%', position: 'relative', cursor: 'default' }}
    >
      {/* Glow backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 54%, rgba(190,155,255,0.28) 0%, rgba(255,190,230,0.12) 45%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Canvas — pointerEvents none so drag events reach outer div */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
          style={{ background: 'transparent', width: '100%', height: '100%', display: 'block' }}
        >
          <Environment preset="city" />
          <ambientLight intensity={1.8} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} />
          <directionalLight position={[-4, 3, -3]} intensity={1.4} color="#c8b8ff" />
          <pointLight position={[2, 2, 3]} intensity={2.0} color="#ffe0f8" />
          <pointLight position={[-2, 1, 2]} intensity={1.2} color="#b8d8ff" />
          {/* Front fill so face is lit */}
          <pointLight position={[0, 0, 4]} intensity={1.0} color="#ffffff" />

          <Suspense fallback={null}>
            <Model isHoveredRef={isHoveredRef} mousePosRef={mousePosRef} />
          </Suspense>
        </Canvas>
      </div>

      {/* ZZZs — staggered diagonal from figure's head area */}
      <FloatingZ delay={0}   x="68%" size={13} opacity={0.55} />
      <FloatingZ delay={0.9} x="72%" size={19} opacity={0.72} />
      <FloatingZ delay={1.8} x="76%" size={26} opacity={0.88} />

      {/* Stars */}
      <FloatingStar delay={0.3} x="18%" y="15%" size={13} />
      <FloatingStar delay={1.6} x="72%" y="18%" size={10} />
      <FloatingStar delay={0.9} x="76%" y="54%" size={11} />

<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to top, rgba(248,246,242,0.5), transparent)', pointerEvents: 'none', zIndex: 2 }} />
    </div>
  )
}

useGLTF.preload('/sleeping.glb')
