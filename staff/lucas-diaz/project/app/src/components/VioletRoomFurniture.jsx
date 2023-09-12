import { RigidBody, CuboidCollider } from "@react-three/rapier"


export default function VioletRoomFurniture({ nodes, materials }) {


    return <>
        <RigidBody type="fixed" colliders="cuboid" friction={1}>
            <mesh
                name="floor"
                castShadow
                receiveShadow
                geometry={nodes.floor.geometry}
                material={materials["Material.007"]}
                position={[1.458, 0, 1.413]}
                scale={[2.046, 1, 2.084]}
            />
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh" position={[1.25, 0, 4.72]}>
            <CuboidCollider args={[3.3, 1.5, 0.18]} />
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh" position={[4.70, 0, 1.4]} >

            <CuboidCollider args={[0.15, 1.5, 3.3]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
            <mesh
                name="walls"
                castShadow
                receiveShadow
                geometry={nodes.walls.geometry}
                material={materials["Material.007"]}
                position={[1.582, 0, 1.523]}
                scale={[1.999, 1, 2.02]}
            />
            <CuboidCollider args={[3.3, 1.5, 0.18]} position={[1.5, 0, -1.5]} />
            <CuboidCollider args={[0.18, 1.5, 3.3]} position={[-1.5, 0, 1.5]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
            <mesh
                name="rug"
                castShadow
                receiveShadow
                geometry={nodes.rug.geometry}
                material={materials["Material.012"]}
                position={[1.173, -1.385, 0.948]}
                scale={[2.293, 0.712, 1.989]}
            />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[0.5, 0, 0.2]}>
            <mesh
                name="COUCH"
                castShadow
                receiveShadow
                geometry={nodes.COUCH.geometry}
                material={materials["Material.009"]}
                position={[1.492, -1.272, -0.977]}
                scale={[0.919, 1, 1]}
            >
                <mesh
                    name="big_pillow"
                    castShadow
                    receiveShadow
                    geometry={nodes.big_pillow.geometry}
                    material={materials["Material.009"]}
                    position={[0.372, 0.626, -0.069]}
                    rotation={[-1.671, 0, 0]}
                    scale={[0.337, 0.114, 0.308]}
                />
                <mesh
                    name="big_pollow_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.big_pollow_2.geometry}
                    material={materials["Material.009"]}
                    position={[0.318, 0.626, -0.069]}
                    rotation={[-1.671, 0, 0]}
                    scale={[0.334, 0.114, 0.308]}
                />
                <mesh
                    name="couch_lege"
                    castShadow
                    receiveShadow
                    geometry={nodes.couch_lege.geometry}
                    material={materials["Material.019"]}
                    position={[0, -0.1, 0.025]}
                />
                <mesh
                    name="couch_seat"
                    castShadow
                    receiveShadow
                    geometry={nodes.couch_seat.geometry}
                    material={materials["Material.009"]}
                    position={[-0.001, 0.254, 0.128]}
                />
                <mesh
                    name="pillow"
                    castShadow
                    receiveShadow
                    geometry={nodes.pillow.geometry}
                    material={materials["Material.010"]}
                    position={[-0.636, 0.462, 0.258]}
                    rotation={[-0.192, -0.429, -1.006]}
                    scale={[0.142, 0.066, 0.198]}
                />
                <mesh
                    name="pillow_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.pillow_2.geometry}
                    material={materials["Material.010"]}
                    position={[0.619, 0.419, 0.252]}
                    rotation={[-0.105, 0.188, 0.332]}
                    scale={[0.15, 0.063, 0.195]}
                />
            </mesh>
            <CuboidCollider args={[1, 0.4, 0.6]} position={[1.5, -1, -0.9]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
            <mesh
                name="couch_2"
                castShadow
                receiveShadow
                geometry={nodes.couch_2.geometry}
                material={materials["Material.009"]}
                position={[-0.962, -1.272, 0.573]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.919, 1, 1]}
            >
                <mesh
                    name="big_pillow_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.big_pillow_3.geometry}
                    material={materials["Material.009"]}
                    position={[0.318, 0.626, -0.069]}
                    rotation={[-1.671, 0, 0]}
                    scale={[0.334, 0.114, 0.308]}
                />
                <mesh
                    name="couch_lege001"
                    castShadow
                    receiveShadow
                    geometry={nodes.couch_lege001.geometry}
                    material={materials["Material.019"]}
                    position={[0, -0.1, 0.025]}
                />
                <mesh
                    name="couch_seat001"
                    castShadow
                    receiveShadow
                    geometry={nodes.couch_seat001.geometry}
                    material={materials["Material.009"]}
                    position={[-0.001, 0.254, 0.128]}
                />
                <mesh
                    name="pillow_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.pillow_3.geometry}
                    material={materials["Material.010"]}
                    position={[-0.612, 0.431, 0.248]}
                    rotation={[-0.064, -0.346, -0.562]}
                    scale={[0.147, 0.064, 0.197]}
                />
            </mesh>
            <CuboidCollider args={[0.7, 0.6, 0.8]} position={[-1, -0.8, 0.8]} />
        </RigidBody>

        <mesh
            name="frame"
            castShadow
            receiveShadow
            geometry={nodes.frame.geometry}
            material={materials["Material.018"]}
            position={[1.202, 0.506, -1.501]}
            scale={[1.711, 1.105, 1.105]}
        />

        <group
            name="window"
            position={[-1.778, 0.404, 1.334]}
            scale={[1.408, 0.976, 1.908]}
        >
            <mesh
                name="Cube010_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube010_1.geometry}
                material={materials["Material.009"]}
            />
            <mesh
                name="Cube010_2"
                castShadow
                receiveShadow
                geometry={nodes.Cube010_2.geometry}
                material={materials["Material.013"]}
            />
        </group>

        <mesh
            name="curtain_thing"
            castShadow
            receiveShadow
            geometry={nodes.curtain_thing.geometry}
            material={materials["Material.015"]}
            position={[-1.522, 1.125, 0.478]}
            scale={0.018}
        />
        <mesh
            name="cutain_rod"
            // castShadow
            receiveShadow
            geometry={nodes.cutain_rod.geometry}
            material={materials["Material.018"]}
            position={[0.006, -0.007, 1.509]}
        />
        <mesh
            name="curtain"
            castShadow
            receiveShadow
            geometry={nodes.curtain.geometry}
            material={materials["Material.014"]}
            position={[-1.427, 0.508, 1.929]}
            scale={[1.225, 1.006, 1.895]}
        >
            <mesh
                name="Torus"
                castShadow
                receiveShadow
                geometry={nodes.Torus.geometry}
                material={materials["Material.017"]}
                position={[0.002, 0.682, -0.193]}
                rotation={[1.521, 0.063, 0.45]}
                scale={[0.518, 0.567, 0.693]}
            />
        </mesh>

        <mesh
            name="lamp"
            castShadow
            receiveShadow
            geometry={nodes.lamp.geometry}
            material={materials["Material.004"]}
            position={[-0.44, 1.069, -1.525]}
            rotation={[Math.PI / 2, 0, 0]}
        >
            <mesh
                name="lamp_bulb"
                castShadow
                receiveShadow
                geometry={nodes.lamp_bulb.geometry}
                material={materials["Material.005"]}
                position={[0.001, 0.294, 0.282]}
                rotation={[-2.23, 0, 0]}
                scale={0.113}
            />
        </mesh>

        <mesh
            name="Cylinder002"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials["Material.018"]}
            position={[-1.43, 0.796, 3.323]}
            rotation={[0, 0, -Math.PI / 2]}
        >
            <mesh
                name="Cube012"
                castShadow
                receiveShadow
                geometry={nodes.Cube012.geometry}
                material={nodes.Cube012.material}
                position={[0, 0.025, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[0.014, 0.008, 0.064]}
            />
            <mesh
                name="Cube019"
                castShadow
                receiveShadow
                geometry={nodes.Cube019.geometry}
                material={nodes.Cube019.material}
                position={[-0.098, 0.019, 0.098]}
                rotation={[0.093, 0.781, 1.527]}
                scale={[0.007, 0.019, 0.02]}
            />
        </mesh>

        <RigidBody type="fixed" colliders={false} position-y={0.1}>
            <mesh
                name="coffe_table"
                // castShadow
                // receiveShadow
                geometry={nodes.coffe_table.geometry}
                material={materials["Material.016"]}
                position={[1.48, -1.44, 0.414]}
                rotation={[0, -1.57, 0]}
                scale={[0.275, 0.428, 0.54]}
            >
                <group
                    name="Cube015"
                    position={[0.011, 0.222, -0.587]}
                    scale={[0.989, 0.192, 0.413]}
                >
                    <mesh
                        name="Cube019_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube019_1.geometry}
                        material={materials["Material.026"]}
                    />
                    <mesh
                        name="Cube019_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube019_2.geometry}
                        material={materials["Material.018"]}
                    />
                </group>
                <mesh
                    name="Cube016"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube016.geometry}
                    material={materials["Material.018"]}
                    position={[-0.005, 0.222, -0.587]}
                    scale={[0.989, 0.184, 0.413]}
                />
                <mesh
                    name="Plane004"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004.geometry}
                    material={nodes.Plane004.material}
                    scale={[1, 0.947, 1]}
                />
                <mesh
                    name="Plane005"
                    castShadow
                    // receiveShadow
                    geometry={nodes.Plane005.geometry}
                    material={materials["Material.029"]}
                    position={[0, 0, 0.011]}
                    scale={[1, 1, 1.003]}
                />
                <mesh
                    name="Plane007"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane007.geometry}
                    material={materials["Material.016"]}
                    position={[-0.005, 0.43, -0.587]}
                />
            </mesh>
            <group
                name="Circle"
                position={[1.282, -1.08, 0.413]}
                rotation={[0, -1.162, 0]}
                scale={[0.892, 0.997, 0.892]}
            >
                <mesh
                    name="Circle_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle_1.geometry}
                    material={materials["Material.018"]}
                />
                <mesh
                    name="Circle_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle_2.geometry}
                    material={materials["Material.032"]}
                />
            </group>
            <CuboidCollider args={[0.6, 0.3, 0.3]} position={[1.5, -1.17, 0.4]} />
        </RigidBody>

        <RigidBody type="fixed" colliders="cuboid">

        </RigidBody>

        <mesh
            name="Circle001"
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials["Material.035"]}
            position={[1.282, -0.975, 0.413]}
            scale={1.461}
        />
        <mesh
            name="Circle002"
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials["Material.035"]}
            position={[1.749, -0.975, 0.413]}
            scale={1.901}
        />
        <mesh
            name="Torus007"
            castShadow
            receiveShadow
            geometry={nodes.Torus007.geometry}
            material={materials["Material.034"]}
            position={[1.694, -0.969, 0.409]}
            rotation={[0, 0, -0.112]}
            scale={0.458}
        />
        <mesh
            name="Torus008"
            castShadow
            receiveShadow
            geometry={nodes.Torus008.geometry}
            material={materials["Material.035"]}
            position={[1.694, -0.969, 0.409]}
            rotation={[0, 0, -0.112]}
            scale={[0.457, 0.418, 0.458]}
        />
        <mesh
            name="Torus009"
            castShadow
            receiveShadow
            geometry={nodes.Torus009.geometry}
            material={materials["Material.038"]}
            position={[1.799, -0.969, 0.372]}
            rotation={[0.043, 0.057, 0.118]}
            scale={0.471}
        />
        <mesh
            name="Torus010"
            castShadow
            receiveShadow
            geometry={nodes.Torus010.geometry}
            material={materials["Material.039"]}
            position={[1.799, -0.969, 0.372]}
            rotation={[0.043, 0.057, 0.118]}
            scale={[0.47, 0.43, 0.471]}
        />
        <mesh
            name="Torus011"
            castShadow
            receiveShadow
            geometry={nodes.Torus011.geometry}
            material={materials["Material.036"]}
            position={[1.785, -0.957, 0.471]}
            rotation={[0.27, 0.044, 0.065]}
            scale={0.445}
        />
        <mesh
            name="Torus012"
            castShadow
            receiveShadow
            geometry={nodes.Torus012.geometry}
            material={materials["Material.037"]}
            position={[1.785, -0.957, 0.471]}
            rotation={[0.27, 0.044, 0.065]}
            scale={[0.445, 0.406, 0.445]}
        />

        <RigidBody type="fixed" colliders="trimesh" >
            <mesh
                name="Cylinder"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={materials["Material.018"]}
                position={[-0.933, -0.42, -0.921]}
                rotation={[0, -0.189, 0]}
                scale={[0.3, 0.043, 0.3]}
            >
                <mesh
                    name="Cube"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube.geometry}
                    material={materials["Material.004"]}
                    position={[0.503, -9.26, -0.365]}
                    rotation={[0, -1.069, 0]}
                    scale={[0.099, 0.593, 0.099]}
                />
                <mesh
                    name="Cylinder001"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder001.geometry}
                    material={materials["Material.018"]}
                    position={[0, -1.617, 0]}
                    rotation={[0, -0.189, 0]}
                    scale={-0.932}
                />
                <mesh
                    name="Cylinder003"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder003.geometry}
                    material={materials["Material.004"]}
                    position={[0.008, -17.248, 0.019]}
                    rotation={[0, -0.189, 0]}
                    scale={[-0.932, -0.471, -0.932]}
                />
            </mesh>

        </RigidBody>

        <RigidBody colliders="cuboid">
            <mesh
                name="Cube001"
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials["Material.019"]}
                position={[-0.894, -0.288, -0.861]}
                scale={[0.007, 0.006, 0.007]}
            >
                <mesh
                    name="Cube002"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[Math.PI, -1.392, Math.PI]}
                    scale={[1.27, 24.593, 1.125]}
                />
                <mesh
                    name="Cube003"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={materials["Material.020"]}
                    position={[-2.438, 33.221, -4.763]}
                    rotation={[Math.PI, -0.694, Math.PI]}
                    scale={[1.056, 24.593, 1.441]}
                />
                <mesh
                    name="Cube004"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[0, -1.051, 0]}
                    scale={[1.193, 24.593, 1.256]}
                />
                <mesh
                    name="Cube005"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[0, -0.353, 0]}
                    scale={[0.926, 24.593, 1.58]}
                />
                <mesh
                    name="Cube006"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[0, 0.345, 0]}
                    scale={[0.923, 24.593, 1.583]}
                />
                <mesh
                    name="Cube007"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007.geometry}
                    material={materials["Material.020"]}
                    position={[1.3, 21.861, 0.503]}
                    rotation={[0, 1.043, 0]}
                    scale={[1.19, 24.593, 1.26]}
                />
                <mesh
                    name="Cube008"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[-Math.PI, 1.4, -Math.PI]}
                    scale={[1.083, 26.008, 0.957]}
                />
                <mesh
                    name="Cube009"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube009.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[-Math.PI, 0.702, -Math.PI]}
                    scale={[1.059, 24.593, 1.437]}
                />
                <mesh
                    name="Cube010"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010.geometry}
                    material={materials["Material.020"]}
                    position={[1.083, 21.914, 0.454]}
                    rotation={[-Math.PI, 0.004, -Math.PI]}
                    scale={[0.866, 24.593, 1.634]}
                />
                <mesh
                    name="Cube011"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011.geometry}
                    material={materials["Material.020"]}
                    position={[-3.54, 23.769, 0.27]}
                    rotation={[-Math.PI, 1.4, -Math.PI]}
                    scale={[1.083, 40.891, 0.957]}
                />
                <mesh
                    name="Cube013"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube013.geometry}
                    material={materials["Material.020"]}
                    position={[-0.19, 21.738, 3.255]}
                    rotation={[Math.PI, -0.458, Math.PI]}
                    scale={[0.819, 30.002, 1.316]}
                />
                <mesh
                    name="Cube014"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube014.geometry}
                    material={materials["Material.020"]}
                    position={[-2.685, 24.255, -3.136]}
                    rotation={[0, -0.073, 0]}
                    scale={[0.74, 26.008, 1.39]}
                />
                <mesh
                    name="Cube017"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube017.geometry}
                    material={materials["Material.020"]}
                    position={[1.228, 22.533, -2.348]}
                    rotation={[0, -0.073, 0]}
                    scale={[0.74, 39.265, 1.39]}
                />
                <mesh
                    name="Cube018"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube018.geometry}
                    material={materials["Material.020"]}
                    position={[-1.914, 23.504, -1.274]}
                    rotation={[0, 0.936, 0]}
                    scale={[0.982, 33.693, 1.121]}
                />
                <mesh
                    name="Cube020"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube020.geometry}
                    material={materials["Material.020"]}
                    position={[-1.585, 22.798, 1.125]}
                    rotation={[-Math.PI, 1.4, -Math.PI]}
                    scale={[1.083, 31.415, 0.957]}
                />
                <mesh
                    name="Cube021"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube021.geometry}
                    material={materials["Material.020"]}
                    position={[2.131, 20.457, 4.799]}
                    rotation={[Math.PI, -0.873, Math.PI]}
                    scale={[0.962, 33.675, 1.149]}
                />
                <mesh
                    name="Cube022"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube022.geometry}
                    material={materials["Material.020"]}
                    position={[-4.106, 25.808, 2.773]}
                    rotation={[-Math.PI, 0.702, -Math.PI]}
                    scale={[1.059, 40.912, 1.437]}
                />
                <mesh
                    name="Cube023"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube023.geometry}
                    material={materials["Material.020"]}
                    position={[0.331, 22.693, 3.638]}
                    rotation={[-Math.PI, 0.335, -Math.PI]}
                    scale={[0.92, 32.77, 1.586]}
                />
            </mesh>
        </RigidBody>

        <mesh
            name="155Z_2107w026n002594Bp1594"
            castShadow
            receiveShadow
            geometry={nodes["155Z_2107w026n002594Bp1594"].geometry}
            material={materials["155Z_2107.w026.n002.594B.p1.594"]}
            position={[1.21, 0.506, -1.509]}
            rotation={[Math.PI / 2, 0, Math.PI]}
            scale={[0.999, 0.6, 0.6]}
        />
        <mesh
            name="lamp001"
            castShadow
            receiveShadow
            geometry={nodes.lamp001.geometry}
            material={materials["Material.003"]}
            position={[2.947, 1.069, -1.525]}
            rotation={[Math.PI / 2, 0, 0]}
        >
            <mesh
                name="lamp_bulb001"
                castShadow
                receiveShadow
                geometry={nodes.lamp_bulb001.geometry}
                material={materials["Material.002"]}
                position={[0.001, 0.294, 0.282]}
                rotation={[-2.23, 0, 0]}
                scale={0.113}
            />
        </mesh>
    </>
}