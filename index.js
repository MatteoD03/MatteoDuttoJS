console.log("buenas");

//funcion que convierte °F a °C
function convertidor(gradosFahrenheit) {
    let gradosCelsius = (gradosFahrenheit - 32) * 5 / 9;
    return gradosCelsius.toFixed(2);
}

//mostrar botones
function mostrarElemento(id) {
    document.getElementById(id).style.display = "block";
}

//ocultar botones
function ocultarElemento(id) {
    document.getElementById(id).style.display = "none";
}

const listo = document.getElementById("listo");
const iniciarBtn = document.getElementById("iniciarBtn");
const contenedor = document.getElementById("contenedor");
const maxBtn = document.getElementById("maxBtn");
const minBtn = document.getElementById("minBtn");
const historialLista = document.getElementById("historialLista");
const buscarInput = document.getElementById("buscarInput");
const buscarBtn = document.getElementById("buscarBtn");
const limpiarBusquedaBtn = document.getElementById("limpiarBusquedaBtn");
const saludo = document.getElementById("saludo");

let temperaturasConvertidas = []; //guarda las temp convertidas a °C

//listener btn iniciar
iniciarBtn.addEventListener("click", function() {
    listo.style.display = "block";
    iniciarBtn.style.display = "none";
    contenedor.style.display = "block";
    instrucciones.textContent = "Ingresa el valor en grados Fahrenheit:";
    saludo.style.display = "none"
});

//listener btn convertidor
convertirBtn.addEventListener("click", function() {
    const fahrenheit = parseFloat(fahrenheitInput.value);
    if (!isNaN(fahrenheit)) {
        const celsius = convertidor(fahrenheit);
        temperaturasConvertidas.push(parseFloat(celsius));

        // actualizar el historial en localStorage
        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        historial.push({
            fahrenheit: fahrenheit,
            celsius: celsius
        });
        localStorage.setItem("historial", JSON.stringify(historial));

        // muestra nueva temp en el historial
        mostrarHistorialItem({ fahrenheit, celsius }, historial.length - 1);

        resultado.textContent = `${fahrenheit} grados Fahrenheit son equivalentes a ${celsius} grados Celsius.`;
        mostrarElemento("resultado");
        nuevaConversionBtn.style.display = "block";
        if (temperaturasConvertidas.length >= 1) {
            mostrarElemento("maxBtn");
            mostrarElemento("minBtn");
            mostrarElemento("historial");
        }
        fahrenheitInput.value ="";

        Toastify({
            text: "Conversión exitosa",
            duration: 2000,
            className: "tosti",
        }).showToast();

    } else {
        resultado.textContent = "Por favor, ingresa un valor válido.";
        mostrarElemento("resultado");
    }
});

//btn convertir otra temp
nuevaConversionBtn.addEventListener("click", function() {
    fahrenheitInput.value = "";
    ocultarElemento("resultado");
    ocultarElemento("nuevaConversionBtn");
    ocultarElemento("maxBtn");
    ocultarElemento("minBtn");
});

//listener de buscar en historial
buscarBtn.addEventListener("click", function() {
    const searchTerm = buscarInput.value.toLowerCase();
    filtrarHistorial(searchTerm);
});

//listener que limpia la busqueda
limpiarBusquedaBtn.addEventListener("click", function() {
    buscarInput.value = "";
    mostrarHistorialCompleto();
});

//funcion de filtro de historial
function filtrarHistorial(term) {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historialLista.innerHTML = ""; 

    historial.forEach(function(item, index) {
        const fahrenheit = item.fahrenheit.toString();
        const celsius = item.celsius.toString();

        if (fahrenheit.includes(term) || celsius.includes(term)) {
            mostrarHistorialItem(item, index);
        }
    });
}

//funcion que muestra todo historial
function mostrarHistorialCompleto() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historialLista.innerHTML = ""; 

    historial.forEach(function(item, index) {
        mostrarHistorialItem(item, index);
    });
}

//promesa 
function obtenerHistorial() {
    return new Promise((resolve, reject) => {
        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        resolve(historial);
    });
}

//decir temp max
maxBtn.addEventListener("click", function () {
    obtenerHistorial().then((historial) => {
        if (historial.length > 0) {
            const temperaturaMaxima = Math.max(...historial.map(item => parseFloat(item.celsius)));
            resultado.textContent = `La temperatura más alta registrada fue: ${temperaturaMaxima} grados Celsius.`;
            mostrarElemento("resultado");
        } else {
            resultado.textContent = "No hay temperaturas registradas en el historial.";
            mostrarElemento("resultado");
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
});

//decir temp min
minBtn.addEventListener("click", function () {
    obtenerHistorial().then((historial) => {
        if (historial.length > 0) {
            const temperaturaMinima = Math.min(...historial.map(item => parseFloat(item.celsius)));
            resultado.textContent = `La temperatura más baja registrada fue: ${temperaturaMinima} grados Celsius.`;
            mostrarElemento("resultado");
        } else {
            resultado.textContent = "No hay temperaturas registradas en el historial.";
            mostrarElemento("resultado");
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
});

// funcion para mostrar un elemento en el historial
function mostrarHistorialItem(item, index) {
    const historialItem = document.createElement("li");
    historialItem.textContent = `${item.fahrenheit}°F = ${item.celsius}°C`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function() {
        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        historial.splice(index, 1);
        localStorage.setItem("historial", JSON.stringify(historial));
        historialLista.removeChild(historialItem); 
        mostrarHistorialCompleto(); 

        if (historial.length === 0) {
            ocultarElemento("historial");
        }

        Toastify({
            text: "Temperatura eliminada",
            duration: 2000,
            className: "tosti",
        }).showToast();
    });

    historialItem.appendChild(deleteButton);
    historialLista.appendChild(historialItem);
}

// borrar historial al cargar la pagina
localStorage.clear();
