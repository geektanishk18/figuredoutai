"use client"

import { useEffect, useRef } from "react"

/**
 * Brand-aligned, non-essential 3D network visual. Loads Three.js only on the
 * client; textual content and CTA remain semantic HTML outside the canvas.
 */
export function SystemsNetworkScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let disposed = false
    let cleanup: (() => void) | undefined

    void import("three").then((THREE) => {
      if (disposed || !hostRef.current) return

      const host = hostRef.current
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.set(0, 0, 12)

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setClearColor(0x000000, 0)
      host.appendChild(renderer.domElement)

      const group = new THREE.Group()
      scene.add(group)

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.05, 2),
        new THREE.MeshBasicMaterial({
          color: 0x062b37,
          wireframe: true,
          transparent: true,
          opacity: 0.72,
        }),
      )
      group.add(core)

      const nodePositions = [
        [-3.5, 1.5, 0],
        [3.1, 1.8, 0],
        [-3.3, -1.4, 0],
        [3.2, -1.5, 0],
        [0, 2.8, 0],
        [0, -2.8, 0],
      ] as const

      nodePositions.forEach(([x, y, z], index) => {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(index === 4 ? 0.22 : 0.16, 16, 16),
          new THREE.MeshBasicMaterial({
            color: index % 2 ? 0x00d9ed : 0x4a9fff,
          }),
        )
        node.position.set(x, y, z)
        group.add(node)
      })

      const points = [
        new THREE.Vector3(-3.5, 1.5, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(3.1, 1.8, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-3.3, -1.4, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(3.2, -1.5, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 2.8, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -2.8, 0),
      ]
      const links = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: 0x00cfe8,
          transparent: true,
          opacity: 0.48,
        }),
      )
      group.add(links)

      const starPositions = new Float32Array(210 * 3)
      for (let i = 0; i < starPositions.length; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 12
        starPositions[i + 1] = (Math.random() - 0.5) * 8
        starPositions[i + 2] = (Math.random() - 0.5) * 3
      }
      const starsGeometry = new THREE.BufferGeometry()
      starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
      const stars = new THREE.Points(
        starsGeometry,
        new THREE.PointsMaterial({
          color: 0x4dbfe8,
          size: 0.018,
          transparent: true,
          opacity: 0.55,
        }),
      )
      scene.add(stars)

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      let frame = 0
      const resize = () => {
        const width = Math.max(host.clientWidth, 1)
        const height = Math.max(host.clientHeight, 1)
        camera.aspect = width / height
        camera.position.z = width < 560 ? 14 : 12
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }
      resize()
      const observer = new ResizeObserver(resize)
      observer.observe(host)

      const animate = () => {
        if (disposed) return
        if (!reducedMotion) {
          group.rotation.y += 0.0018
          group.rotation.x = Math.sin(Date.now() * 0.00025) * 0.06
          stars.rotation.y -= 0.00025
        }
        renderer.render(scene, camera)
        if (!reducedMotion) frame = window.requestAnimationFrame(animate)
      }
      animate()

      cleanup = () => {
        window.cancelAnimationFrame(frame)
        observer.disconnect()
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
            object.geometry.dispose()
            const material = object.material
            if (Array.isArray(material)) material.forEach((item) => item.dispose())
            else material.dispose()
          }
        })
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 h-full min-h-[300px] w-full opacity-90"
    />
  )
}
