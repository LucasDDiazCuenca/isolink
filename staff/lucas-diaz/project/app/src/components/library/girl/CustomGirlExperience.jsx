import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls, Text, Html } from "@react-three/drei";
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import animateCharacter from "../../../logic/character/animateCharacter"
import moveCharacter from "../../../logic/character/moveCharacter"
import customizeCharacter from "../../../logic/character/customizeCharacter"
import followCharacter from "../../../logic/character/followCharacter"
import getUserId from "../../../logic/getUserId";

import { io } from "socket.io-client"
export const socket = io(`${import.meta.env.VITE_API2_URL}`)

export default function CustomGirlExperience(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/girl.glb");
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { actions, mixer } = useAnimations(animations, group)
    const [socketText, setSocketText] = useState(null)
    const avatar = props.avatar
    const girlRigidBody = props.girlRigidBody
    const text = props.messageToSend
    const emotion = props.emotionToSend
    const animationStates = { idle: true, walk: false, talk: false, tempEmote: false }
    const { camera, viewport } = useThree()
    let isMoving = false

    const walk = actions["walk"]
    const idle = actions["idle"]
    const talk = actions["talk"]
    const tempEmote = actions[emotion]

    customizeCharacter(materials, avatar)

    if (girlRigidBody) {
        useFrame((state, delta) => {
            const girlBodyPosition = girlRigidBody?.current?.translation()
            const { forward, backward, leftward, rightward } = getKeys()

            if (avatar?.author._id === getUserId()) {
                socket.emit("girl_on_room", true)
                const movementDirection = new THREE.Vector3();

                if (forward) {
                    movementDirection.z = -1;
                }
                if (backward) {
                    movementDirection.z = 1;
                }
                if (leftward) {
                    movementDirection.x = -1;
                }
                if (rightward) {
                    movementDirection.x = 1;
                }

                isMoving = forward || backward || leftward || rightward;

                moveCharacter(movementDirection, group, girlRigidBody, delta, avatar);
                animateCharacter(isMoving, animationStates, walk, idle, talk, text, tempEmote)
                followCharacter(girlBodyPosition, camera, viewport, avatar)

                if (isMoving) {
                    socket.emit("move_character2_secondary", {
                        x: girlBodyPosition.x,
                        y: girlBodyPosition.y,
                        z: girlBodyPosition.z,
                        delta,
                        isMoving,
                        animationStates,
                        emotion
                    })
                }
            }
        })
    }

    if (avatar?.author._id !== getUserId()) {
        socket.on("send_girl_message_to_front", data => {
            setSocketText(data.message)

            setTimeout(() => {
                setSocketText(null)
            }, 3000)
        })
    }


    socket.on("move_character2_secondary_front", data => {
        const { x, y, z, delta, isMoving, animationStates, emotion } = data

        const currentPosition = girlRigidBody?.current?.translation()
        const newPosition = new THREE.Vector3(x, y, z)
        const movementDirection = newPosition?.clone().sub(currentPosition).normalize()

        moveCharacter(movementDirection, group, girlRigidBody, delta, avatar)
        animateCharacter(isMoving, animationStates, walk, idle, talk, text, emotion)
    })



    useEffect(() => {
        const idleAction = actions["idle"];
        const walkAction = actions["walk"];

        idleAction.reset().fadeIn(0.5).play();

        animationStates.idle = true;
        animationStates.walk = false;

        return () => {
            idleAction.fadeOut(0.5)
            walkAction.fadeOut(0.5)
        }
    }, [mixer]);

    return <>
        <group ref={group} {...props} dispose={null}>
            {text && <Html
                as="div"
                center
                position-y={4.3}
                sprite
                occlude
                className="text-white bg-violet-800 p-2 px-5 rounded-3xl w-36 text-center"
            >{text}</Html>}

            {socketText && <Html
                as="div"
                center
                position-y={4.3}
                sprite
                occlude
                className="text-white bg-violet-800 p-2 px-5 rounded-3xl w-36 text-center"
            >{socketText}</Html>}

            <group background={new THREE.Color("#000000")}>
                <Text position-y={4} fontSize={0.2} rotation-y={Math.PI * 0.15}>{avatar.name}</Text>
            </group>
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
    </>
}

useGLTF.preload("./models/girl.glb");
