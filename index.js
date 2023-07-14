console.log("buenas");

function convertidor(gradosFahrenheit) {
    let gradosCelsius = (gradosFahrenheit - 32) * 5 / 9;
    return gradosCelsius;
}

alert("¡Bienvenido al convertidor de temperaturas!");

let continuar = true;

while (continuar) {
    let nameU;

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
    alert("¡Pero tranquilo, yo te ayudaré a cambiar tu temperatura de °F a °C!");

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

    let celsius = convertidor(fahrenheit);

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

alert("¡Chau chau, espero volver a verte!");

