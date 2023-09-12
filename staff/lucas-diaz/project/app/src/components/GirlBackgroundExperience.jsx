import { OrbitControls, Sky } from '@react-three/drei'
import GirlExperience from "./library/girl/GirlExperience"


export default function GirlBackgroundExperience({active, info}) {
    
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
        <GirlExperience position={[0, -2, -1]} scale={0.85} active={active} info={info}/> 

        <mesh receiveShadow position-y={-2} rotation-x={- Math.PI * 0.5} scale={active ? 12 : 6}>
            <planeGeometry />
            <meshStandardMaterial color="#8765c7" />
        </mesh>

        <mesh receiveShadow position={[0, 1, -3]} scale={active ? 12 : 6}>
            <planeGeometry />
            <meshStandardMaterial color="#a26bd1" />
        </mesh>
    </>
}