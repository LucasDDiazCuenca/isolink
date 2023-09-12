
export default function followCharacter (bodyPosition, camera,viewport, avatar){
    const boy = "./models/boy.glb"
    const girl = "./models/girl.glb"

    if(boy === avatar.model){
        camera.position.set(bodyPosition.x + 10, bodyPosition.y + 5, bodyPosition.z + 12)
    
        camera.lookAt(bodyPosition.x, bodyPosition.y - 1, bodyPosition.z )
    }

    if(girl === avatar.model){
        camera.position.set(bodyPosition.x + 10, bodyPosition.y +5, bodyPosition.z + 12)
    
        camera.lookAt(bodyPosition.x, bodyPosition.y + 1, bodyPosition.z )
    }
};