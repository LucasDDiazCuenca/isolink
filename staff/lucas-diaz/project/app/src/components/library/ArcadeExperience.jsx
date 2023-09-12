import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

export default function ArcadeExperience(props) {
    const { nodes, materials } = useGLTF("./models/arcade.glb");

    materials.blue.color = new THREE.Color("#ffa6f9")
    return (
        <group {...props} dispose={null}>
            <group
                name="G_Asset_Electronic_GameMachine_01"
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <group
                    name="Cylinder449"
                    position={[-11.316, -76.624, 0]}
                    rotation={[-Math.PI / 2, Math.PI / 6, 0]}
                >
                    <group name="Object_5" position={[2, -3.464, -6.608]}>
                        <mesh
                            name="Cylinder449_black_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder449_black_0.geometry}
                            material={materials.black}
                        />
                        <mesh
                            name="Cylinder449_metal_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder449_metal_0.geometry}
                            material={materials.metal}
                        />
                    </group>
                </group>
                <mesh
                    name="Line166_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Line166_black_0.geometry}
                    material={materials.black}
                    position={[1.866, -18.756, 0]}
                />
                <mesh
                    name="gamemachine_01_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.gamemachine_01_black_0.geometry}
                    material={materials.black}
                />
                <mesh
                    name="gamemachine_01_blue_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.gamemachine_01_blue_0.geometry}
                    material={materials.blue}
                />
                <mesh
                    name="gamemachine_01_screen_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.gamemachine_01_screen_0.geometry}
                    material={materials.screen}
                />
                <mesh
                    name="gamemachine_01_red_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.gamemachine_01_red_0.geometry}
                    material={materials.material}
                />
                <mesh
                    name="gamemachine_01_orange_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.gamemachine_01_orange_0.geometry}
                    material={materials.orange}
                />
                <mesh
                    name="Text001_orange_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Text001_orange_0.geometry}
                    material={materials.orange}
                    position={[39.432, -38.236, 103.129]}
                    rotation={[1.301, 0, 0]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("./models/arcade.glb");
