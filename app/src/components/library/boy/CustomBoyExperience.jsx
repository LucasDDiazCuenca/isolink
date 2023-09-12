import React, { useRef, useEffect, useState } from "react"
import { useGLTF, useAnimations, useKeyboardControls, Text, Html } from "@react-three/drei"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import animateCharacter from "../../../logic/character/animateCharacter"
import moveCharacter from "../../../logic/character/moveCharacter"
import customizeCharacter from "../../../logic/character/customizeCharacter"
import followCharacter from "../../../logic/character/followCharacter"
import getUserId from "../../../logic/getUserId"

import { io } from "socket.io-client"
export const socket = io(`${import.meta.env.VITE_API2_URL}`)


export default function CustomBoyExperience(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF("models/boy.glb")
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { actions, mixer } = useAnimations(animations, group)
    const avatar = props.avatar
    const boyRigidBody = props.boyRigidBody
    let text = props.messageToSend
    const emotion = props.emotionToSend
    const [socketText, setSocketText] = useState(null)
    const animationStates = { idle: true, walk: false, talk: false, tempEmote: false }
    const { camera, viewport } = useThree()
    let isMoving = false

    const walk = actions["walk"]
    const idle = actions["idle"]
    const talk = actions["talk"]
    const tempEmote = actions[emotion]

    customizeCharacter(materials, avatar)

    if (boyRigidBody) {
        useFrame((state, delta) => {
            let boyBodyPosition = boyRigidBody?.current?.translation()
            const { forward, backward, leftward, rightward } = getKeys()

            if (avatar?.author._id === getUserId()) {
                socket.emit("boy_on_room", true)

                const movementDirection = new THREE.Vector3();

                if (forward) {
                    movementDirection.z = -1
                }
                if (backward) {
                    movementDirection.z = 1
                }
                if (leftward) {
                    movementDirection.x = -1
                }
                if (rightward) {
                    movementDirection.x = 1
                }

                isMoving = forward || backward || leftward || rightward

                moveCharacter(movementDirection, group, boyRigidBody, delta, avatar)
                animateCharacter(isMoving, animationStates, walk, idle, talk, text, tempEmote)
                followCharacter(boyBodyPosition, camera, viewport, avatar)

                if (isMoving) {
                    // Emitir solo si el personaje está en movimiento
                    socket.emit('move_character_secondary', {
                        x: boyBodyPosition.x,
                        y: boyBodyPosition.y,
                        z: boyBodyPosition.z,
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
        socket.on("send_boy_message_to_front", data => {
            setSocketText(data.message)

            setTimeout(() => {
                setSocketText(null)
            }, 3000)
        })
    }

    socket.on("move_character_secondary_front", (data) => {
        const { x, y, z, delta, isMoving, animationStates, emotion } = data

        const currentPosition = boyRigidBody?.current?.translation()
        const newPosition = new THREE.Vector3(x, y, z)
        const movementDirection = newPosition?.clone().sub(currentPosition).normalize()

        moveCharacter(movementDirection, group, boyRigidBody, delta, avatar)
        animateCharacter(isMoving, animationStates, walk, idle, talk, text, emotion)
    });



    useEffect(() => {
        const idleAction = actions["idle"];
        idleAction.reset().fadeIn(0.5).play();
        animationStates.idle = true;
        animationStates.walk = false;

        return () => {
            idleAction.fadeOut(0.5)
            socket.off("move_character_secondary_front")
        }
    }, []);

    return <>
        <group ref={group} {...props} dispose={null}>
            {text && <Html
                as="div"
                center
                position-y={4.3}
                sprite
                occlude
                className="text-white bg-cyan-900 p-2 px-5 rounded-3xl w-36 text-center"
            >{text}</Html>}

            {socketText && <Html
                as="div"
                center
                position-y={4.3}
                sprite
                occlude
                className="text-white bg-cyan-900 p-2 px-5 rounded-3xl w-36 text-center"
            >{socketText}</Html>}

            <Text position-y={3.6} position-x={-0.2} fontSize={0.2} rotation-y={Math.PI * 0.15}>{avatar.name}</Text>
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
    </>
}

useGLTF.preload("models/boy.glb");
