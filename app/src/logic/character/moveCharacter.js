import * as THREE from "three";

export default function moveCharacter(movementDirection, group, rigidbody, delta, avatar) {
    const impulse = { x: 0, y: 0, z: 0 };
    const boy = "./models/boy.glb";
    const girl = "./models/girl.glb";
    let impulseStrength;

    if (boy === avatar?.model) {
        impulseStrength = 0.00000110 * delta * 10;
    }

    if (girl === avatar?.model) {
        impulseStrength = 0.00000078 * delta * 10;
    }

    // Mantener la dirección de movimiento anterior
    const lastMovementDirection = new THREE.Vector3(0, 0, 1); // Inicialmente mirando hacia adelante

    // Actualizar la dirección de movimiento anterior
    if (movementDirection.lengthSq() > 0) {
        lastMovementDirection.copy(movementDirection);
    }

    // Calcula el vector de movimiento basado en el impulso
    const normalizedMovementDirection = movementDirection.clone().normalize();

    // Si hay una dirección de movimiento, calcula la rotación hacia esa dirección
    if (normalizedMovementDirection.lengthSq() > 0) {
        const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.atan2(normalizedMovementDirection.x, normalizedMovementDirection.z), 0));

        // Interpola suavemente hacia la nueva rotación
        const lerpFactor = 0.14; // Puedes ajustar este valor para controlar la suavidad
        group?.current?.quaternion.slerp(targetQuaternion, lerpFactor);
    }

    // Aplica el impulso basado en la dirección de movimiento
    impulse.x = movementDirection.x * impulseStrength;
    impulse.z = movementDirection.z * impulseStrength;

    rigidbody?.current.applyImpulse(impulse);
}
