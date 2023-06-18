/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

/**
 * Patron modulo
 */

// funcion anonima autoinvocada, se ejecuta apenas se carga el archivo
const miModulo = (() => {
  "use strict"; // Modo estricto de javascript, no permite variables sin declarar
  
  // Crea baraja de cartas
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];
  
  let puntosJugadores = [];

  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
        puntosHTML = document.querySelectorAll("small");

  // Esta funcion inicializa el juego
  const inicializarJuego = ( numJugadores = 2) => {
    deck =  crearDeck();
    puntosJugadores = [];
    
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach( elem => elem.innerText = 0);
    divCartasJugadores.forEach( elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  const crearDeck = () => {
    deck = [];

    for (const tipo of tipos) {
      for (let i = 2; i <= 10; i++) {
        deck.push(i + tipo);
      }

      for (const especial of especiales) {
        deck.push(especial + tipo);
      }
    }

    return _.shuffle(deck); // Baraja las cartas de forma aleatoria
  };

  // Esta funcion me permite tomar una carta
  const pedirCarta = () => {
    if (deck.length <= 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();
  };

  // Valor de una carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Elimina el ultimo caracter de la carta
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; // Si es un numero devuelve el numero, sino devuelve 10
  };

  // Turno: 0 = primer jugador y el ultimo sera la computadora
  const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`; // Crea la imagen de la carta
    imgCarta.classList.add("carta"); // Agrega la clase carta
    divCartasJugadores[turno].append(imgCarta); // Agrega la imagen de la carta al div
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      // Funcion que se ejecuta despues de un tiempo
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana");
      } else {
        alert("Computadora gana");
      }
    }, 100);
  };

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  // Eventos

  // Cuando se hace click en el boton pedir
  btnPedir.addEventListener("click", () => {
    
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    // <img class="carta" src="assets/cartas/10C.png" alt=""></img>
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  // Cuando se hace click en el boton detener
  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugadores[0]);
  });

  // Cuando se hace click en el boton nuevo
  // btnNuevo.addEventListener("click", () => {
  //   inicializarJuego();
  // });

  return {
    nuevoJuego: inicializarJuego,
  }

})();

/**
 * Patron modulo
 */
