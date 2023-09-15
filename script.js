//const LIBRERO = ["APPLE", "TABLE", "MOUSE"];
//let random = Math.floor(Math.random()*LIBRERO.length);
//const sorteo = LIBRERO[random];
//const sorteo = "APLLE";
//let sorteo = "APPLE";

const BUTTON = document.getElementById("guess-button");
let cant = 6;
//BUTTON.disabled = true;

const API = "https://random-word-api.herokuapp.com/word?length=5"

fetch(API)
    .then((response)=> response.json())
    .then((response)=> {
        sorteo = response[0].toUpperCase();
        //BUTTON.disabled = false;
    })
    .catch((err)=>{
        console.log(err);
        let random = Math.floor(random() * LIBRERO.length);
        sorteo = LIBRERO[random];
        //BUTTON.disabled = false;
    });

BUTTON.addEventListener("click", ()=>{
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    let row = document.createElement("div");
    row.className = "row";
    if (sorteo == INTENTO){
        terminar("<h1>GANASTE! ;)</h1>");
        }
    else {
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
    if (cant == 0){
        terminar("<h1>PERDISTE! ;(</h1>");
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
});