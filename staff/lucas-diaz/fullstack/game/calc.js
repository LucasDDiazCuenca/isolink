//* node calc 10 20 + 

//destructuramos, ojo las primeras 2 variables que no necesitamos 
//     0 1   2     3    aqui decimos que recibira una variable almacenada en "op" que de forma predet es + pero se puede cambiar
const [, , num1, num2, op = "+" ] = process.argv // ! OJO RECIBIMOS STRINGS

parseInt(num1) 
parseInt(num2)


switch (op) {
    case "+":
        console.log(num1 + num2 )
        break;

    case "-":
        console.log(num1 - num2 )
        break;

        case "x":
        console.log(num1 * num2 )
        break;

        case "/":
        console.log(num1 / num2 )
        break;

    default:
        break;
}


