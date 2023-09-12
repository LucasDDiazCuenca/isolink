const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme }) => {
    addBase({
        h1: {
            fontSize: theme('fontSize.4xl')
        }
    })

    addComponents({
        ".box-input": {
            flexBasis: "80%",
            height: "20%",
            display: "flex",
            flexFlow: "wrap row"
        },
        ".form-button": {
            backgroundColor: "rgb(0 36 36)",
            color: "white",
            borderRadius: ".6rem",
            border: "none",
            marginTop: ".2rem",
            padding: ".6rem 1rem",
            cursor: "pointer"
        },
        ".edit-button": {
            height: "fit-content",
            borderRadius: "0.6rem",
            border: "none",
            backgroundColor: "rgb(28 28 28)",
            color: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            alignSelf: "center",
            marginRight: "0.5rem"
        },
        ".home": {
            marginTop: "103px"
        },
        ".home-menu": {
            position: "fixed",
            top: "130px",
            left: "2vh",
            width: "90%",
            transform: "translateY(-40%)",
            opacity: "0",
            visibility: "hidden",
            transition: "all 400ms",
            margin: ".2rem"
        },
        ".home-posts-content": {
            padding: "1rem",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            gap: "1rem",
            backgroundColor: "#0d1a15",
            marginTop: "1.7rem",
            paddingBottom: "5rem",
        },
        ".home-post-content-article": {
            flexBasis: "100%",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            backgroundColor: "#313338",
            borderRadius: ".3rem",
            color: "white",
            gap: ".4rem"
        },
        ".footerArea": {
            position: "fixed",
            bottom: "0",
            left: "0",
            height: "8%",
            width: "100%",
            backgroundColor: "#1e3a3a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
        },
        ".post-modal":{
            width: "80%",
            position: "fixed",
            bottom: "170px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            borderRadius: "0.3rem",
            backgroundColor: "#313338",
            padding: "0.5rem",
            boxShadow: "0.5rem 0.5rem 2rem black"
        }
    })

    addUtilities({
        '.content-hidden': {
            contentVisibility: 'hidden'
        },
        '.app-h1': {
            fontSize: theme('fontSize.4xl'),
            color: 'white',
            padding: '1rem',
            textAlign: "center",
            marginBottom: "1rem;"
        },
        '.helloworld--fluo': {
            backgroundColor: 'yellowgreen',
            color: 'greenyellow'
        },
        '.red': {
            color: "tomato"
        },
        '.green': {
            color: "#17AF96"
        },
        ".home-menu-transition": {
            opacity: "1",
            transform: "translateX(0%)",
            visibility: "visible"
        },
        ".pb-3-4": {
            paddingBottom: "75%"
        },
        ".material-symbols-rounded": {
            'font-variation-settings': "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
            color: "rgb(223, 223, 223)",
            transition: "all 200ms",
            cursor: "pointer",
            alignSelf: "center",
            paddingLeft: ".5rem",
            paddingRight: ".5rem",
        },
        ".material-symbols-rounded-liked": {
            'font-variation-settings': "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
            color: "red",
            transition: "all 200ms",
        },
        ".filled": {
            'font-variation-settings': "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
            transition: "all 200ms",
        },
        
    })
})