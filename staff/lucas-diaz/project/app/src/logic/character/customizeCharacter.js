import * as THREE from "three"

export default function customizeCharacter(materials, avatar){
    const boy = "./models/boy.glb"
    const girl = "./models/girl.glb"

    if(boy === avatar.model){
        materials["Hair 2"].color = new THREE.Color(avatar.hair)
        materials["Hair 1"].color = new THREE.Color(avatar.hair)
        materials["Body Skin"].color = new THREE.Color(avatar.skin)
        materials["Shirt 2"].color = new THREE.Color(avatar.shirt)
        materials.Pants.color = new THREE.Color(avatar.trousers)
        materials["Shores.002"].color = new THREE.Color(avatar.shoes)
    }

    if (girl === avatar.model){
        materials.pelo.color = new THREE.Color(avatar.hair)
        materials.тело.color = new THREE.Color(avatar.skin)
        materials.camisa.color = new THREE.Color(avatar.shirt)
        materials.pantalones.color = new THREE.Color(avatar.trousers)
        materials.глаза.color = new THREE.Color(avatar.shoes)
    }
}