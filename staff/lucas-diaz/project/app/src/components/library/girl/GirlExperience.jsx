import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { button, useControls } from "leva"
import * as THREE from "three"

export default function GirlExperience(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/girl.glb");
    const { actions } = useAnimations(animations, group);
    
    const active = props.active

    if (active){
        const { hair2, skin2, shirt2, trousers2, shoes2 } = useControls("Edit Avatar:", {
            hair2: "#eb4c4c",
            skin2: "#e5df8e",
            shirt2: "#64ba9e",
            trousers2: "#efe4e4",
            shoes2: "#141212",

        })

        const colorInfo2 = {
            hair2,
            skin2,
            shirt2,
            trousers2,
            shoes2
        }

        props.info(colorInfo2)

        materials.pelo.color = new THREE.Color(hair2)
        materials.camisa.color = new THREE.Color(shirt2)
        materials.глаза.color = new THREE.Color(shoes2)
        materials.тело.color = new THREE.Color(skin2)
        materials.pantalones.color = new THREE.Color(trousers2)
    }

    useEffect(() => {
        const idle = actions["idle"]
        idle.reset().fadeIn(0.5).play()
    }, []);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group
                    name="Armature"
                    position={[0.026, 0, 0]}
                    rotation={[Math.PI / 2, 0, -0.059]}
                    scale={0.01}
                >
                    <group name="Torus001">
                        <skinnedMesh
                            castShadow
                            name="Torus001_1"
                            geometry={nodes.Torus001_1.geometry}
                            material={materials.pantalones}
                            skeleton={nodes.Torus001_1.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_2"
                            geometry={nodes.Torus001_2.geometry}
                            material={materials.рот}
                            skeleton={nodes.Torus001_2.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_3"
                            geometry={nodes.Torus001_3.geometry}
                            material={materials.тело}
                            skeleton={nodes.Torus001_3.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_4"
                            geometry={nodes.Torus001_4.geometry}
                            material={materials.БРОВ}
                            skeleton={nodes.Torus001_4.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_5"
                            geometry={nodes.Torus001_5.geometry}
                            material={materials.глаза}
                            skeleton={nodes.Torus001_5.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_6"
                            geometry={nodes.Torus001_6.geometry}
                            material={materials.camisa}
                            skeleton={nodes.Torus001_6.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_7"
                            geometry={nodes.Torus001_7.geometry}
                            material={materials.pelo}
                            skeleton={nodes.Torus001_7.skeleton}
                        />
                    </group>
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("./models/girl.glb");
