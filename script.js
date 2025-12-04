// =============================================
// WORDLE ORIGINAL (tu lógica)
// =============================================

const BUTTON = document.getElementById("guess-button");
const MAL = document.getElementById('mal');
let cant = 6;
BUTTON.disabled = true;
let sorteo = "";

// Obtener palabra aleatoria
const API = "https://random-word-api.herokuapp.com/word?length=5";

fetch(API)
    .then((response) => response.json())
    .then((response) => {
        sorteo = response[0].toUpperCase();
        BUTTON.disabled = false;
        console.log("Palabra secreta:", sorteo);
    })
    .catch((err) => {
        console.log("Error con API, usando palabra local:", err);
        // Lista de palabras locales como backup
        const LIBRERO = ['PERRO', 'GATOS', 'ARBOL', 'FLORES', 'MESA', 'SILLA', 'PUERTA', 'VENTANA', 'LIBRO', 'LAPIZ'];
        let random = Math.floor(Math.random() * LIBRERO.length);
        sorteo = LIBRERO[random];
        BUTTON.disabled = false;
        console.log("Palabra secreta (local):", sorteo);
    });

BUTTON.addEventListener("click", () => {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    let row = document.createElement("div");
    row.className = "row";
    
    if (INTENTO.length != 5) {
        MAL.style.display = 'block';
        MAL.textContent = "⚠️ ¡Deben ser exactamente 5 letras!";
        return;
    }
    
    MAL.style.display = 'none';
    
    if (sorteo == INTENTO) {
        terminar("<h3>🎉 ¡GANASTE!</h3>");
        BUTTON.disabled = true;
        
        // Mostrar palabra completa en verde
        for (let i in sorteo) {
            let cuadroLetra = armarLetra(INTENTO[i], "green");
            row.appendChild(cuadroLetra);
        }
    } else {
        BUTTON.disabled = false;
        
        for (let i in sorteo) {
            if (sorteo[i] === INTENTO[i]) {
                let cuadroLetra = armarLetra(INTENTO[i], "green");
                row.appendChild(cuadroLetra);
            } else if (sorteo.includes(INTENTO[i])) {
                let cuadroLetra = armarLetra(INTENTO[i], "#f3c237");
                row.appendChild(cuadroLetra);
            } else {
                let cuadroLetra = armarLetra(INTENTO[i], "gray");
                row.appendChild(cuadroLetra);
            }
        }
        
        cant--;
        
        if (cant == 0) {
            terminar(`<h3>😢 ¡PERDISTE! La palabra era: ${sorteo}</h3>`);
            BUTTON.disabled = true;
        }
    }
    
    GRID.appendChild(row);
    document.getElementById("guess-input").value = '';
    
    // Para el laboratorio: registrar intento
    if (typeof labController !== 'undefined') {
        labController.logGuess(INTENTO, cant);
    }
});

function leerIntento() {
    let input = document.getElementById("guess-input").value.toUpperCase();
    // Validación básica - solo letras
    return input.replace(/[^A-Z]/g, '');
}

function terminar(mensaje) {
    document.getElementById("mensaje").innerHTML = mensaje;
    
    // Para el laboratorio: mostrar oportunidad para XSS
    if (typeof showCustomMessageOption !== 'undefined') {
        setTimeout(() => showCustomMessageOption(), 1000);
    }
}

function armarLetra(letra, color) {
    let span = document.createElement("span");
    span.className = 'letter';
    span.innerHTML = letra;
    span.style.backgroundColor = color;
    return span;
}

// Permitir Enter para enviar
document.getElementById("guess-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        BUTTON.click();
    }
});

// Ocultar mensaje de error al hacer clic
MAL.addEventListener("click", function() {
    this.style.display = 'none';
});


// Función para mostrar opción de mensaje personalizado
function showCustomMessageOption() {
    const messageDiv = document.getElementById("message-display");
    if (messageDiv) {
        messageDiv.innerHTML = `
            <div class="custom-message-prompt">
                <p>¿Quieres compartir tu victoria con un mensaje personalizado?</p>
                <p><small>⚠️ Prueba a incluir código HTML para ver vulnerabilidades XSS</small></p>
            </div>
        `;
    }
}