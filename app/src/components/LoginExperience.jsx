import { useAnimations, useGLTF, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useEffect } from "react"
import {useControls} from "leva"

export default function LoginExperience(){
    const boy = useGLTF("./models/boy.glb")

    boy.scene.children[0].children[0].children.forEach(mesh => {
        mesh.castShadow = true
    })

    boy.materials["Shirt 2"].color = new THREE.Color("#ffffff")
    boy.materials["Pants"].color = new THREE.Color("#595656")
    boy.materials["Body Skin"].color = new THREE.Color("#cba9a9")
    boy.materials["Shores.002"].color = new THREE.Color("#0b0808")

    const animations = useAnimations(boy.animations, boy.scene)

    useEffect(() => {
        const action = animations.actions["wave"]
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [])

    useFrame((state, delta) => {
        setTimeout(() => {
            if (boy.scene.position.z <= 2) {
                boy.scene.position.z += delta * 2

                const waving = animations.actions["wave"]
                waving.stop()

                const walk = animations.actions["walk"]
                walk.play()

                if (boy.scene.position.z >= 2) {
                    const waving = animations.actions["wave"]
                    walk.fadeOut(0.1)
                    waving.reset().fadeIn(0.1).play()
                }
            }
        }, 2500)
    })

    return <>
        <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />

        <ambientLight intensity={0.4} />

        <Sparkles
            size={7}
            position={[0,1,1]}
            scale={[8, 4, 5]}
            count={100}
            speed={0.4}
            opacity={0.3}
        />

        <mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5} scale={[14, 17, 1]} receiveShadow>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial args={[{ color: "#452b8e" }]} />
        </mesh>

        <primitive object={boy.scene} scale={1} position={[0.2, -1, -8]} />
    </>
}

useGLTF.preload("./models/boy.glb")