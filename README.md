# APP ISOLINK

![](./doc/image/gif1.gif)

## INTRO 
This is an app that allows you to register, login, and once inside, create an avatar.

Once the **_Avatar_** is created & custimized, we'll have the option of entering into a isometric 3D room.

In this room we will be able to interact with other person's avatar via chat (__atm__), explore the room, send emotions and interact with some objects. 

We can also admin friends area, adding and deleting friends, see who's online and where. 

We can use this app just for fun, interact with others with an immersive 3D experience or we can use it as a communication Tools in workspaces.

---
---

![](./doc/image/img2.png)

## FUNCTIONAL DESCRIPTION

### USE CASES 

- Register an user
- Upload user information
- Create an avatar  
- Edit avatar 
- Select a room (comming next)
- enter in a room 
- Add friend 
- Delete friend
- Acept friend request 
- Decline friend request

### USE CASES IN A ROOM

- Move the avatar
- Send texts in a chat space 
- interact with "x" object (comming next)
- do certain movements linked to emotion states
- add a friend

---
---
## TECHINAL DESCRIPTION 

### DATA MODELS 

User 
- id (ObjectId)
- name (string)
- email (string)
- password (string)
- avatar (boolean)
- friends( [ObjectId] )
- friendRequests ( [ObjectId] )
- connected (boolean) 

Avatar 
- id (ObjectId)
- model (string)
- name (string)
- personality(string)
- age (string)
- hair (string)
- skin (string)
- shirt (string)
- trousers (string)
- shoes(string)
- emotions (Array)

## TEST COVERAGE

![](./doc/image/test%20coverage.png)


## LINK TO WORKFLOW PROCESS

https://www.notion.so/lucasdiazcuenca/Project-Finale-4a4c88d6f47a4a7bae6213bbac849d38?pvs=4


## LINK TO CREATED GAME 

https://lucasgame2.surge.sh/


## NORMAS DE USO 

hay una version deployed: 

https://lucas-isolink.netlify.app/login

si presenta problemas borrar la palabra "login" de la URL del navegador

User: lucas@gmail.com
Pass: LucasDiaz22!

En el apartado de settings, puedes borrar el avatar construido y volver a crear un avatar. Para entrar a la habitacion ir a "home" y darle al boton "Go to room" 🎉

- Para expresar emocion ir al icono de la cara a la derecha y elegir con el click una de las 3 seleccionadas a la hora de crear el avatar
- para hablar darle click al bocadillo, escribir, y pulsar "enter"
- Si te acercas a la maquina recreativa y clickas sobre ella, aparece el juego!!

![](./doc/image/img1.png)

