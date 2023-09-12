export default levaWhiteTheme = () => {
    return {
        colors: {
            elevation1: '#ffffff', // Fondo del panel principal (barra de título principal)
            elevation2: '#f0f0f0', // Fondo de las filas (color del panel principal)
            elevation3: '#ffffff', // Fondo de los inputs
            accent1: '#7f00ff',    // Violeta claro para el botón de incremento
            accent2: '#a600ff',    // Violeta medio para el botón de decremento
            accent3: '#d400ff',    // Violeta oscuro para el fondo del botón
            highlight1: '#535760', // Fondo del tooltip y del panel de control abierto
            highlight2: '#8c92a4', // Color del texto en el tooltip y el título de la carpeta
            highlight3: '#ffffff', // Color del texto en las filas
            vivid1: '#ffcc00',
            folderWidgetColor: '$highlight2',
            folderTextColor: '$highlight3',
            toolTipBackground: '$highlight3',
            toolTipText: '$elevation2',
        },
        radii: {
            xs: '2px',
            sm: '3px',
            lg: '10px',
        },
        space: {
            xs: '3px',
            sm: '6px',
            md: '10px',
            rowGap: '7px',
            colGap: '7px',
        },
        fonts: {
            mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
            sans: `system-ui, sans-serif`,
        },
        fontSizes: {
            root: '11px',
            toolTip: '$root',
        },
        sizes: {
            rootWidth: '280px',
            controlWidth: '160px',
            numberInputMinWidth: '38px',
            scrubberWidth: '8px',
            scrubberHeight: '16px',
            rowHeight: '24px',
            folderTitleHeight: '20px',
            checkboxSize: '16px',
            joystickWidth: '100px',
            joystickHeight: '100px',
            colorPickerWidth: '$controlWidth',
            colorPickerHeight: '100px',
            imagePreviewWidth: '$controlWidth',
            imagePreviewHeight: '100px',
            monitorHeight: '60px',
            titleBarHeight: '39px',
        },
        shadows: {
            level1: '0 0 9px 0 #00000088',
            level2: '0 4px 14px #00000033',
        },
        borderWidths: {
            root: '0px',
            input: '1px',
            focus: '1px',
            hover: '1px',
            active: '1px',
            folder: '1px',
        },
        fontWeights: {
            label: 'normal',
            folder: 'normal',
            button: 'normal',
        },
    }
}