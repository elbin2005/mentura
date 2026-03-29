import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Octahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
    const meshRef = useRef();
    useFrame((state) => {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    });
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
            <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#1a4f8a"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.05}
                    metalness={0.9}
                    wireframe={false}
                    emissive="#0D3863"
                    emissiveIntensity={0.2}
                />
            </Sphere>
        </Float>
    );
}

function FloatingTorus() {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.x = state.clock.elapsedTime * 0.2;
        ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    });
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Torus ref={ref} args={[3.2, 0.12, 16, 100]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#c0c0c0"
                    emissive="#F76400"
                    emissiveIntensity={0.3}
                    metalness={1}
                    roughness={0.1}
                    transparent
                    opacity={0.6}
                />
            </Torus>
        </Float>
    );
}

function FloatingOcta() {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.y = state.clock.elapsedTime * 0.4;
        ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    });
    return (
        <Float speed={1} rotationIntensity={1} floatIntensity={1.5}>
            <Octahedron ref={ref} args={[0.4]} position={[-3.5, 1.5, -1]}>
                <meshStandardMaterial
                    color="#7E7E7E"
                    emissive="#7E7E7E"
                    emissiveIntensity={0.4}
                    metalness={0.9}
                    roughness={0.1}
                />
            </Octahedron>
        </Float>
    );
}

function FloatingOcta2() {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.y = -state.clock.elapsedTime * 0.3;
        ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    });
    return (
        <Float speed={1} rotationIntensity={0.8} floatIntensity={1.2}>
            <Octahedron ref={ref} args={[0.25]} position={[3.8, -1.8, -0.5]}>
                <meshStandardMaterial
                    color="#F76400"
                    emissive="#F76400"
                    emissiveIntensity={0.6}
                    metalness={1}
                    roughness={0.05}
                />
            </Octahedron>
        </Float>
    );
}

function SmallSphere({ position, color }) {
    const ref = useRef();
    useFrame((state) => {
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.3;
    });
    return (
        <Sphere ref={ref} args={[0.12, 16, 16]} position={position}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                metalness={1}
                roughness={0}
            />
        </Sphere>
    );
}

const HeroScene = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, 5]} intensity={1.2} color="#F76400" />
            <pointLight position={[10, 10, -5]} intensity={1} color="#0D3863" />
            <pointLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />

            <AnimatedSphere />
            <FloatingTorus />
            <FloatingOcta />
            <FloatingOcta2 />
            <SmallSphere position={[2.5, 2.2, 0.5]} color="#c0c0c0" />
            <SmallSphere position={[-2.8, -2, 0]} color="#0D3863" />
            <SmallSphere position={[4, 0.5, -1]} color="#F76400" />
            <SmallSphere position={[-4, 1.2, -0.5]} color="#7E7E7E" />
        </Canvas>
    );
};

export default HeroScene;
