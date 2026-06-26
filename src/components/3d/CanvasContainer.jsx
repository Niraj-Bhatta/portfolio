import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CanvasContainer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Track mouse coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Normalize mouse coords (-1 to 1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Get current container dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00d4ff, 8, 30);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 8, 30);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);

    // 5. Particles (Stars / Dust field)
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x00d4ff);
    const colorPurple = new THREE.Color(0x7c3aed);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random coordinates inside a box
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = (Math.random() - 0.5) * 45;
      positions[i + 2] = (Math.random() - 0.5) * 30 - 5;

      // Random color gradient between blue and purple
      const mixedColor = new THREE.Color().lerpColors(colorBlue, colorPurple, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Floating Meshes (Geometric objects)
    const geometries = [
      new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.TorusGeometry(1.2, 0.4, 16, 64),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.ConeGeometry(0.8, 1.8, 4)
    ];

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x00d4ff,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x7c3aed,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x00d4ff,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x7c3aed,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
    ];

    const meshes = [];
    const positionsData = [
      { x: -5, y: 3, z: 2 },
      { x: 6, y: -3, z: 1 },
      { x: -4, y: -4, z: -1 },
      { x: 5, y: 4, z: -2 }
    ];

    geometries.forEach((geom, idx) => {
      const mesh = new THREE.Mesh(geom, materials[idx]);
      const pos = positionsData[idx];
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Handle Window Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow (lerping)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax effect on camera
      camera.position.x = mouse.x * 2.5;
      camera.position.y = mouse.y * 2.5;
      camera.lookAt(0, 0, 0);

      // Rotate particle cloud slowly
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = elapsedTime * 0.005;

      // Animate floating geometric objects
      meshes.forEach((mesh, index) => {
        const speedMultiplier = 1 + index * 0.15;
        mesh.rotation.x = elapsedTime * 0.12 * speedMultiplier;
        mesh.rotation.y = elapsedTime * 0.18 * speedMultiplier;
        mesh.rotation.z = elapsedTime * 0.08 * speedMultiplier;

        // Floating offset animation
        mesh.position.y = positionsData[index].y + Math.sin(elapsedTime * 0.8 + index) * 0.4;
        mesh.position.x = positionsData[index].x + Math.cos(elapsedTime * 0.5 + index) * 0.3;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose of geometries & materials to release GPU memory
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }} 
    />
  );
}
