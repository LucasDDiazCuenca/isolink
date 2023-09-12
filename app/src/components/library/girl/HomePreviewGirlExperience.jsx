import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three"

export default function HomePreviewGirlExperience(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/girl.glb");
    const { actions } = useAnimations(animations, group);
    const avatar = props.avatar

    materials.pelo.color = new THREE.Color(avatar.hair)
    materials.тело.color = new THREE.Color(avatar.skin)
    materials.camisa.color = new THREE.Color(avatar.shirt)
    materials.pantalones.color = new THREE.Color(avatar.trousers)
    materials.глаза.color = new THREE.Color(avatar.shoes)

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
                            name="Torus001_1"
                            geometry={nodes.Torus001_1.geometry}
                            material={materials.pantalones}
                            skeleton={nodes.Torus001_1.skeleton}
                        />
                        <skinnedMesh
                            name="Torus001_2"
                            geometry={nodes.Torus001_2.geometry}
                            material={materials.рот}
                            skeleton={nodes.Torus001_2.skeleton}
                        />
                        <skinnedMesh
                            name="Torus001_3"
                            geometry={nodes.Torus001_3.geometry}
                            material={materials.тело}
                            skeleton={nodes.Torus001_3.skeleton}
                        />
                        <skinnedMesh
                            name="Torus001_4"
                            geometry={nodes.Torus001_4.geometry}
                            material={materials.БРОВ}
                            skeleton={nodes.Torus001_4.skeleton}
                        />
                        <skinnedMesh
                            name="Torus001_5"
                            geometry={nodes.Torus001_5.geometry}
                            material={materials.глаза}
                            skeleton={nodes.Torus001_5.skeleton}
                        />
                        <skinnedMesh
                            name="Torus001_6"
                            geometry={nodes.Torus001_6.geometry}
                            material={materials.camisa}
                            skeleton={nodes.Torus001_6.skeleton}
                        />
                        <skinnedMesh
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
