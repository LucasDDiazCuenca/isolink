import { useMatcapTexture, Text3D, Float } from '@react-three/drei'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()
const torusMaterial = new THREE.MeshMatcapMaterial()

export default function Experience() {
    const [matCapTexture] = useMatcapTexture("CAA094_875343_956255_EADEDC", 512)

    const [torusMatCapTexture] = useMatcapTexture("6C5DC3_352D66_5C4CAB_544CA5", 512)

    const donutsGroup = useRef()

    useFrame((state, delta) => {
        for (const donut of donutsGroup.current.children) {
            donut.rotation.y += delta * 0.2
        }
    })

    useEffect(() => {
        matCapTexture.colorSpace = THREE.SRGBColorSpace
        matCapTexture.needsUpdate = true
        torusMatCapTexture.colorSpace = THREE.SRGBColorSpace
        torusMatCapTexture.needsUpdate = true

        torusMaterial.matcap = torusMatCapTexture
        torusMaterial.needsUpdate = true
        material.matcap = matCapTexture
        material.needsUpdate = true
    }, [])

    return <>
        <Text3D
            position={[-4.5, 3.5, 14]}
            material={material}
            font="./fonts/helvetiker_regular.typeface.json"
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
        >
            REGISTER
        </Text3D>

        <Float speed={0.5} floatIntensity={2.5}>

            <group ref={donutsGroup}>
                {[...Array(300)].map((value, index) => {
                    return <mesh
                        geometry={torusGeometry}
                        material={torusMaterial}
                        key={index}
                        position={[
                            (Math.random() - 0.5) * 30,
                            (Math.random() - 0.5) * 30,
                            (Math.random() - 0.5) * 30
                        ]}
                        scale={0.2 + Math.random() * 0.2}
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            0
                        ]}
                    />
                })}
            </group>
        </Float>
    </>
}