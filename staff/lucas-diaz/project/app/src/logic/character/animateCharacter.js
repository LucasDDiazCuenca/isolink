

export default function animateCharacter(isMoving, animationStates, walk, idle, talk, text, tempEmote) {

    if (isMoving) {
        if (animationStates?.idle) {
            idle?.fadeOut(0.5) //detiene esta animacion
            talk?.fadeOut(0.5) 
            walk?.reset().fadeIn(0.3).play(); // Inicia la animación "walk"
            animationStates.idle = false
            animationStates.walk = true
            animationStates.talk = false
            animationStates.tempEmote = false
        }
    } else {
        if (animationStates?.walk) {
            walk?.fadeOut(0.8); 
            talk?.fadeOut(0.5)
            idle?.reset().fadeIn(0.5).play();
            animationStates.idle = true
            animationStates.walk = false
            animationStates.talk = false
            animationStates.tempEmote = false
        }
    }

    if (text) {
        if (animationStates?.idle || animationStates?.walk) {
            idle?.fadeOut(0.5) 
            walk?.fadeOut(0.5) 
            talk?.reset().fadeIn(0.5).play()
            animationStates.idle = false
            animationStates.walk = false
            animationStates.talk = true
            animationStates.tempEmote = false

            setTimeout(() => {
                talk.fadeOut(0.5)
                idle?.reset().fadeIn(0.5).play()
            }, 4000)
        }
    }

    if (tempEmote) {
        idle?.fadeOut(0.5) 
        walk?.fadeOut(0.5) 
        talk?.fadeOut(0.5)
        tempEmote?.reset().fadeIn(0.5).play()
        setTimeout(() => {
            tempEmote.fadeOut(0.5)
            idle?.reset().fadeIn(0.5).play()
        }, 5000)
        
    }

}