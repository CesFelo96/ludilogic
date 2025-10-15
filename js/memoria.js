var arrayOpciones = ['🔵','⬛','🔺','⭐','♦','⬡','⬟','🔻','▭','⚪','❤️','🔵','⬛','🔺','⭐','♦','⬡','⬟','🔻','▭','⚪','❤️','✚','✚']; //Opciones de las cartas
var valoresCartas = []; // Me permite comparar las cartas
var idCartas = []; //Para guardar el id de las cartas 
var cartasAdivinadas = 0; // Contador de cartas para saber que el jeugo se ha terminado

//Algoritmo Fisher-Yates para mezclar array
Array.prototype.mezclar = function(){
    var i = this.length; //This apunta al array que vamos a trabajar
    var indiceAleatorio;
    var valorTemporal;

    while(--i > 0){
        indiceAleatorio = Math.floor(Math.random() * (i + 1)); //Metodo floor solo devuelve la parte entera de un numero
        valorTemporal = this[indiceAleatorio];
        this[indiceAleatorio] = this[i];
        this[i] = valorTemporal;
        //console.log(i);
        //console.log(this[i] + "Valor en i");
        //console.log(valorTemporal + "Valro en indice aleatorio");
    }
}

function nuevoJuego(){
    cartasAdivinadas = 0;
    var codigoHtml = "";
    arrayOpciones.mezclar();

    for (var i = 0; i < arrayOpciones.length; i = i + 1){
        codigoHtml = codigoHtml + '<div id="carta_'+i+'" class="container" onclick=" girarCarta(this, \''+ arrayOpciones[i] +'\')"></div>';
        //console.log(i);
    } 

    document.getElementById("juego-memoria").innerHTML = codigoHtml;
}

//Funcion interactividad Juego
function girarCarta(carta, valor){
    if(carta.innerHTML == "" && valoresCartas.length < 2){
        carta.style.background = "#FFF";
        carta.style.fontSize = "200%";
        carta.innerHTML = valor;
        //Guarda la primera carta que damos vuelta
        if (valoresCartas.length == 0){
            valoresCartas.push(valor);
            idCartas.push(carta.id);
            console.log(valoresCartas, idCartas); 
        //Guarda la primera segunda carta que damos vuelta
        }else if (valoresCartas.length == 1){
            valoresCartas.push(valor);
            idCartas.push(carta.id);
            console.log(valoresCartas, idCartas);
            //Comprobar si las cartas son iguales
            if (valoresCartas[0]== valoresCartas[1]){
                cartasAdivinadas = cartasAdivinadas + 2;
                // limpiar los valores de comparacion
                valoresCartas = [];
                idCartas = [];

                //Comprobar si se termino el juego
                if (cartasAdivinadas == arrayOpciones.length){
                    alert("Ganaste !!!! -- Continua con la siguiente actividad");
                    document.getElementById("juego-memoria").innerHTML="";
                    nuevoJuego();
                }
            }else{
                function ocultarCartas(){
                    //Se almacena en dos variables el id de las cartas levantadas
                    var carta_1 = document.getElementById(idCartas[0]);
                    var carta_2 = document.getElementById(idCartas[1]);
    
                    // Se añaden los estilos anteriores para voltear la carta
                    carta_1.style.backgroundColor = "#EEE";
                    carta_1.style.backgroundImage = "url(/img/logo_figura.png)";
                    carta_1.style.backgroundSize = "cover";
                    carta_1.innerHTML = "";
    
                    carta_2.style.backgroundColor = "#EEE";
                    carta_2.style.backgroundImage = "url(/img/logo_figura.png)";
                    carta_2.style.backgroundSize = "cover";
                    carta_2.innerHTML = "";
    
                    // limpiar los valores de comparacion
                    valoresCartas = [];
                    idCartas = [];
                } 
                setTimeout(ocultarCartas, 700); //Funcion que permite ejecutar funciones con retraso
            }
        }
    }
}

