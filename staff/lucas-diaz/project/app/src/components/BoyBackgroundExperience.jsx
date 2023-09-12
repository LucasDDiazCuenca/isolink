import { OrbitControls, Sky } from '@react-three/drei'
import BoyExperience from "./library/boy/BoyExperience"
import { useState } from 'react'

export default function BoyBackgroundExperience({ active, info }) {
    const [update, setUpdate] = useState(false)


    return <>
        {active && <OrbitControls makeDefault />}
        <Sky />
        <directionalLight
            castShadow
            position={[1, 2, 3]}
            intensity={1.2}
            shadow-normalBias={0.04}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            shadow-camera-near={1}
            shadow-camera-far={10}
        />
        <ambientLight intensity={0.5} />
        <BoyExperience position={[0.3, -2, -1]} active={active} info={info} />

        <mesh receiveShadow position-y={-2} rotation-x={- Math.PI * 0.5} scale={active ? 12 : 6}>
            <planeGeometry />
            <meshStandardMaterial color="#d16ab7" />
        </mesh>

        <mesh receiveShadow position={[0, 1, -3]} scale={active ? 12 : 6}>
            <planeGeometry />
            <meshStandardMaterial color="#de7cb4" />
        </mesh>
    </>
}