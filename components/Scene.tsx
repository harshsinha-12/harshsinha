import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  color: string;
  scrollProgress?: number;
}

const AnimatedBlob = ({
  color,
  scrollProgress = 0,
}: {
  color: string;
  scrollProgress?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Rotation logic
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
    }

    // Parallax logic: Move group based on scrollProgress
    if (groupRef.current) {
      // Map scrollProgress (0 to 1) to position
      // For vertical scroll:
      // Move Y up/down (opposite to scroll)
      // Move Z slightly for depth as we go down

      // Let's try: Scroll Down -> Camera goes down -> Objects go UP relative to camera
      // Default camera is at [0,0,8].
      // Let's just move the blob on Y axis.
      // initial Y = 0.
      // Start from bottom right (y: -4, x: 4) to avoid intro text
      // Move up as we scroll
      const targetYPos = -4 + scrollProgress * 10;

      // targetX could shift slightly for variety
      const targetX = 4 - scrollProgress * 3;

      // Smooth lerp
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetYPos,
        0.05
      );

      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.05
      );

      // Add some Z depth movement
      const targetZ = -2 - scrollProgress * 5;
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetZ,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.8, 64, 64]} ref={meshRef}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.4}
            metalness={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const Particles = () => {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Colors for interaction
  const baseColor = useMemo(() => new THREE.Color("#64748b"), []); // Slate-500
  const hoverColor = useMemo(() => new THREE.Color("#38bdf8"), []); // Sky-400
  const tempColor = useMemo(() => new THREE.Color(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  // Generate random initial positions and properties
  const particles = useMemo(() => {
    const temp = [];
    /* eslint-disable react-hooks/purity */
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = (Math.random() - 0.5) * 40; // Reduced spread
      const yFactor = (Math.random() - 0.5) * 30;
      // Z range constrained to be mostly in front of the camera (camera is at z=8)
      // Range: -15 (far) to 5 (near)
      const zFactor = -15 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    /* eslint-enable react-hooks/purity */
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // Normalized mouse coordinates (-1 to 1)
    const mx = state.pointer.x;
    const my = state.pointer.y;

    particles.forEach((particle, i) => {
      const { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      // Calculate organic floating position
      const x =
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10;
      const y =
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10;
      const z =
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10;

      // Project particle position to screen space to check proximity to mouse
      tempVec.set(x, y, z);
      tempVec.project(state.camera); // Projects to NDC (-1 to 1)

      const screenDist = Math.sqrt(
        Math.pow(mx - tempVec.x, 2) + Math.pow(my - tempVec.y, 2)
      );

      // Threshold: 0.25 in NDC is roughly 12.5% of screen width/height
      const isClose = screenDist < 0.25;

      // Update time/phase
      // Accelerate animation speed when hovered
      if (isClose) {
        particle.t += speed * 8;
      } else {
        particle.t += speed / 2;
      }

      // Scale pulsating effect
      let s = 0.2 + 0.6 * Math.abs(Math.cos(t));

      // Interaction: Increase scale on hover
      if (isClose) {
        const scaleBoost = (1 - screenDist / 0.25) * 0.8;
        s += scaleBoost;
      }

      // Apply positional offset for "hover" reaction
      // Move slightly towards the camera when hovered to "pop"
      const zOffset = isClose ? (1 - screenDist / 0.25) * 2 : 0;

      dummy.position.set(x, y, z + zOffset);
      dummy.scale.set(s, s, s);

      // Rotation
      // Add extra rotation speed when hovered
      const rot = s * 5 + (isClose ? particle.t * 2 : 0);
      dummy.rotation.set(rot, rot, rot);

      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);

      // Color Interaction
      // Lerp from baseColor to hoverColor based on proximity
      const colorIntensity = isClose ? Math.max(0, 1 - screenDist / 0.25) : 0;
      tempColor.copy(baseColor).lerp(hoverColor, colorIntensity);
      mesh.current!.setColorAt(i, tempColor);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor)
      mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial
        transparent
        opacity={0.6}
        roughness={0.3}
        metalness={0.2}
      />
    </instancedMesh>
  );
};

const Scene: React.FC<SceneProps> = ({ color, scrollProgress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-1000 ease-in-out">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
        <AnimatedBlob color={color} scrollProgress={scrollProgress} />
        <Particles />
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default Scene;
