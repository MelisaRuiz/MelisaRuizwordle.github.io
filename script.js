
const BUTTON = document.getElementById("guess-button");
const MAL = document.getElementById('mal');
let cant = 6;
BUTTON.disabled = true;

const API = "https://random-word-api.herokuapp.com/word?length=5"

fetch(API)
    .then((response)=> response.json())
    .then((response)=> {
        sorteo = response[0].toUpperCase();
        BUTTON.disabled = false;
        console.log (sorteo);
    })
    .catch((err)=>{
        console.log(err);
        let random = Math.floor(random() * LIBRERO.length);
        sorteo = LIBRERO[random];
        BUTTON.disabled = false;
    });

BUTTON.addEventListener("click", ()=>{
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    let row = document.createElement("div");
    row.className = "row";
    if (INTENTO.length !=5){
        MAL.style.display = 'block';
        armarLetra.style.display = 'none';
        }
    if (sorteo == INTENTO){
        terminar("<h1>GANASTE! ;)</h1>");
        BUTTON.disabled = true;
        MAL.style.display = 'none';
        }
    else {
    BUTTON.disabled = false;
        for (let i in sorteo){
            if (sorteo[i] === INTENTO[i]){
                let cuadroLetra = armarLetra(INTENTO[i], "green");
                row.appendChild(cuadroLetra);
                }
            else if (sorteo.includes(INTENTO[i])){
                let cuadroLetra = armarLetra(INTENTO[i], "#f3c237");
                row.appendChild(cuadroLetra);
                }
            else {
                let cuadroLetra = armarLetra(INTENTO[i], "gray");
                row.appendChild(cuadroLetra);
                } 
            }
        cant--;
        }
    GRID.appendChild(row)
    MAL.style.display = 'none';
    if (cant == 0){
        terminar("<h1>PERDISTE! ;(</h1>");
        BUTTON.disabled = true;
    }
function leerIntento() {
    return document.getElementById("guess-input").value.toUpperCase();
    }
function terminar (mensaje) {
    document.getElementById("mensaje").innerHTML = mensaje;
    }
 function armarLetra(letra, color){
    let span = document.createElement("span");
    span.className = 'letter';
    span.innerHTML = letra;
    span.style.backgroundColor = color;
    return span
    }

console.log (sorteo); 
});
