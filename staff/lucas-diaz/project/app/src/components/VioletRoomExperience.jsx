import * as THREE from "three"
import React, { Suspense, useRef, useState } from "react"
import { OrbitControls, useGLTF, Html } from "@react-three/drei"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import ArcadeExperience from "./library/ArcadeExperience"
import CustomBoyExperience from "./library/boy/CustomBoyExperience"
import CustomGirlExperience from "./library/girl/CustomGirlExperience"
import VioletRoomFurniture from "./VioletRoomFurniture"
import { useAppContext } from "../hooks"
import getUserId from "../logic/getUserId"


export default function VioletRoomExperience({ avatar, boyMessageToSend, girlMessageToSend, emotionToSend }) {
    const { nodes, materials } = useGLTF("./models/violetRoom.glb")
    materials["Material.014"].color = new THREE.Color("#83deb5")
    const boy = "./models/boy.glb"
    const girl = "./models/girl.glb"
    const boyRigidBody = useRef()
    const girlRigidBody = useRef()
    let { avatars } = useAppContext()
    const [showGame, setShowGame] = useState(false)

    const handleShowGame = () => {
        setShowGame(true)
    }
    const handleHoverEnter = () => {
        document.body.style.cursor = "pointer"
    }
    const handleHoverLeaves = () => {
        document.body.style.cursor = "default"
    }

    return <>
        <Physics>
            <group dispose={null}>
                <OrbitControls
                    maxAzimuthAngle={Math.PI / 4}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={2}
                />

                <pointLight color="#d2cbdb" intensity={0.42} position={[-0.42, 0.8, -1.2]} />
                <pointLight color="#9b7ac1" intensity={0.5} position={[2.95, 0.8, -1.2]} />
                <directionalLight
                    castShadow
                    position={[5, 2, 3]}
                    intensity={0.50}
                    shadow-normalBias={0.04}
                    shadow-mapSize={[2048, 2048]}
                    shadow-camera-top={10}
                    shadow-camera-right={10}
                    shadow-camera-bottom={-10}
                    shadow-camera-left={-10}
                    shadow-camera-near={1}
                    shadow-camera-far={10}
                />
                <ambientLight intensity={0.22} />

                {avatars?.map((avatar, index) => (
                    <React.Fragment key={avatar.model + index}>
                        {avatar?.model === boy && (
                            <Suspense fallback={null}>
                                <RigidBody
                                    ref={boyRigidBody}
                                    type="dinamic"
                                    canSleep={false}
                                    colliders="cuboid"
                                    friction={1}
                                    linearDamping={1}
                                >
                                    <CustomBoyExperience
                                        avatar={avatar}
                                        scale={0.6}
                                        position={[2, -1.30, 2]}
                                        boyRigidBody={boyRigidBody}
                                        messageToSend={avatar?.author._id === getUserId() ? boyMessageToSend : null}
                                        emotionToSend={avatar?.author._id === getUserId() ? emotionToSend : null}
                                    />
                                </RigidBody>
                            </Suspense>
                        )}

                        {avatar?.model === girl && (
                            <Suspense fallback={null}>
                                <RigidBody
                                    ref={girlRigidBody}
                                    type="dinamic"
                                    canSleep={false}
                                    colliders="cuboid"
                                    friction={1}
                                    linearDamping={1}
                                >
                                    <CustomGirlExperience
                                        avatar={avatar}
                                        scale={0.515}
                                        girlRigidBody={girlRigidBody}
                                        messageToSend={avatar?.author._id === getUserId() ? girlMessageToSend : null}
                                        emotionToSend={avatar?.author._id === getUserId() ? emotionToSend : null}
                                    />
                                </RigidBody>
                            </Suspense>
                        )}
                    </React.Fragment>
                ))}

                <RigidBody type="fixed" colliders={false} position={[-1.3, -1.35, 4.0]} rotation-y={Math.PI * 0.5}>
                    <CuboidCollider args={[0.6, 1, 0.6]} position={[0.4, 0.96, 0.45]} />
                    <ArcadeExperience scale={0.01} onClick={handleShowGame} onPointerEnter={handleHoverEnter}
                        onPointerLeave={handleHoverLeaves} />
                </RigidBody>

                <VioletRoomFurniture nodes={nodes} materials={materials} />
            </group>
        </Physics>

        {showGame && <Html>
            <div className="fixed top-1/2 left-1/4 transform -translate-x-3/4 -translate-y-1/2 text-center bg-violet-600 p-2 border border-violet-400 rounded-xl z-50 flex flex-col">
                <button className="mb-2">
                    <img src={"./icons/cancel.png"} alt="close button" onClick={() => setShowGame(false)} />
                </button>
                <iframe className="rounded-md" src="https://lucasgame2.surge.sh/" width="900" height="400"></iframe>
            </div>
        </Html>}
    </>

}

useGLTF.preload("./models/violetRoom.glb");
