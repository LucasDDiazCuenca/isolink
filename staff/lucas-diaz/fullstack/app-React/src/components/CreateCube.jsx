import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CreateCube() {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, cube;

        function init() {
            // Creating scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            // Add camera
            camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight);

            // Renderer
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearAlpha(0) // we use it in order to ser a transparency 

            // Add geometry
            const geometry = new THREE.IcosahedronGeometry(1, 2); // 4 cube  THREE.BoxGeometry( 1, 1, 1 , 3 ,3 ,3 ); 
            const material = new THREE.MeshBasicMaterial({ color: "green", wireframe: true });
            cube = new THREE.Mesh(geometry, material);

            scene.add(cube);

            camera.position.z = 4.0;

            animate();
        }

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.000;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        init();

        // Clean up
        return () => {
            scene.remove(cube);
            cube.geometry.dispose();
            cube.material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-xl'>Loading...</p>
        <canvas ref={canvasRef} className='relative z-1 opacity-75'>
        </canvas>
    </div>
}