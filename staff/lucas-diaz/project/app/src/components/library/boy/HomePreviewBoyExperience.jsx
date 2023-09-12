import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";

export default function HomePreviewBoyExperience(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF("models/boy.glb")
    const { actions } = useAnimations(animations, group)
    const avatar = props.avatar


    materials["Hair 2"].color = new THREE.Color(avatar.hair)
    materials["Hair 1"].color = new THREE.Color(avatar.hair)
    materials["Body Skin"].color = new THREE.Color(avatar.skin)
    materials["Shirt 2"].color = new THREE.Color(avatar.shirt)
    materials.Pants.color = new THREE.Color(avatar.trousers)
    materials["Shores.002"].color = new THREE.Color(avatar.shoes)
    

    useEffect(() => {
        const idleAction = actions["idle"];
        idleAction.reset().fadeIn(0.5).play();

        return () => {
            idleAction.fadeOut(0.5)
        }
    }, []);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group
                    name="Armature"
                    position={[-0.168, 0, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.01}
                >
                    <group name="Character_Merge001">
                        <skinnedMesh
                            castShadow
                            name="Roundcube001"
                            geometry={nodes.Roundcube001.geometry}
                            material={materials.Black}
                            skeleton={nodes.Roundcube001.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_1"
                            geometry={nodes.Roundcube001_1.geometry}
                            material={materials["Body Skin"]}
                            skeleton={nodes.Roundcube001_1.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_2"
                            geometry={nodes.Roundcube001_2.geometry}
                            material={materials["Hair 2"]}
                            skeleton={nodes.Roundcube001_2.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_3"
                            geometry={nodes.Roundcube001_3.geometry}
                            material={materials["Hair 1"]}
                            skeleton={nodes.Roundcube001_3.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_4"
                            geometry={nodes.Roundcube001_4.geometry}
                            material={materials["Shirt 2"]}
                            skeleton={nodes.Roundcube001_4.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_5"
                            geometry={nodes.Roundcube001_5.geometry}
                            material={materials.Pants}
                            skeleton={nodes.Roundcube001_5.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_6"
                            geometry={nodes.Roundcube001_6.geometry}
                            material={materials["Shores.002"]}
                            skeleton={nodes.Roundcube001_6.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_7"
                            geometry={nodes.Roundcube001_7.geometry}
                            material={materials["Shores Edge"]}
                            skeleton={nodes.Roundcube001_7.skeleton}
                        />
                    </group>
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("models/boy.glb");
