console.log("buenas");

//funcion que convierte °F a °C
function convertidor(gradosFahrenheit) {
    let gradosCelsius = (gradosFahrenheit - 32) * 5 / 9;
    return gradosCelsius.toFixed(2);
}

alert("¡Bienvenido al convertidor de temperaturas!");

let continuar = true; //controlar si bucles continúan o se detiene el programa
let temperaturasConvertidas = []; //guarda las temp convertidas a °C
let temperaturasIngresadas = false; //saber si se ingresaron temp para convertir

//bucle principal
while (continuar) {
    let nameU;
    //bucle que pide nombre de usuario
    do {
    nameU = prompt("¿a quién tengo el gusto de ayudar?");

    if (nameU === null) {
        continuar = false;
        break; 
    } else if (nameU === "") {
        alert("Necesito obligatoriamente un dato para continuar");
    }
    } while (nameU === "");

    if (!continuar) {
        break;
    }

    alert("Buen día " + nameU + ", ¿Sabías que en algunos países utilizan la escala Fahrenheit para medir la temperatura?");
    alert("Así que si, por ejemplo, te encuentras en EEUU, esto puede ser confuso si estás acostumbrado a utilizar Celsius.");
    alert("¡Pero tranquilo " +nameU + ", yo te ayudaré a cambiar tu temperatura de °F a °C!");

    //bucle que pide las temperaturas y realiza la conversión
    do {
    let fahrenheit = prompt("Ingresa el valor en grados Fahrenheit:");

    if (fahrenheit === null) {
        continuar = false;
        break; 
    } else if (fahrenheit === "") {
        alert("No ingresaste ningún valor, inténtalo de nuevo");
        continue; 
    }

    if (isNaN(parseFloat(Number(fahrenheit)))) {
        alert("El valor ingresado no es válido. Por favor, ingresa únicamente números.");
        continue; 
    }

    //convertir temp y agregarlas al array
    let celsius = convertidor(fahrenheit);
    temperaturasConvertidas.push(celsius);
    temperaturasIngresadas = true;

    //respuesta predeterminada según el valor de la conversión
    let respuesta;

    if (celsius >= 30) {
        respuesta = "Te derretís del calor T-T";
    } else if (celsius >= 22) {
        respuesta = "Está para el fernet con hielo ;)";
    } else if (celsius >= 15) {
        respuesta = "Con una camperita se está bien";
    } else if (celsius >= 3) {
        respuesta = "Está frío che, salen los team invierno :)";
    } else {
        respuesta = "Se te congelan las ideas :(";
    }

    alert(fahrenheit + " grados Fahrenheit son equivalentes a " + celsius + " grados Celsius " + respuesta);

    let opcion = confirm("¿Quieres convertir otro valor?");
    if (!opcion) {
        continuar = false;
        break; 
    }
    } while (true);
}

//si se ingresaron temp, pregunta si desea saber el max o min
if (temperaturasIngresadas) {
    do {
        let opcionMaxMin = prompt("¿Quieres saber el valor máximo o mínimo de las temperaturas convertidas? (Escribe 'max' o 'min'). Si presionas Cancelar, saldrás del programa.");

        if (opcionMaxMin === "max") {
            let temperaturaMaxima = Math.max(...temperaturasConvertidas);
            alert("La temperatura más alta registrada fue: " + temperaturaMaxima + " grados Celsius");
        } else if (opcionMaxMin === "min") {
            let temperaturaMinima = Math.min(...temperaturasConvertidas);
            alert("La temperatura más baja registrada fue: " + temperaturaMinima + " grados Celsius");
        } else if (opcionMaxMin !== null) {
            alert("Opción no válida. Por favor, escribe 'max' o 'min' para obtener el valor máximo o mínimo de las temperaturas.");
        }

        // Preguntar al usuario si quiere volver a ver el max o min
        if (opcionMaxMin !== null) {
            continuar = confirm("¿Quieres volver a averiguar el valor máximo o mínimo?");
        } else {
            continuar = false;
        }
    } while (continuar);
}

alert("¡Chau chau, espero volver a verte!");

