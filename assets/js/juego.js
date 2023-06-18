/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML           = document.querySelectorAll('small');

let puntosJugador     = 0,
    puntosComputadora = 0;

// Crea baraja de cartas

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];


const crearDeck = () => {

  for (const tipo of tipos) {
    for (let i = 2; i <= 10; i++) {
      deck.push( i + tipo);
    }

    for (const especial of especiales) {
      deck.push(especial + tipo)
    }
  }

  deck = _.shuffle( deck );

  return deck;
}

crearDeck()

// Esta funcion me permite tomar una carta

const pedirCarta = () => {
  if ( deck.length <= 0) {
    throw 'No hay cartas en el deck';
  };

  const carta = deck.pop();

  return carta;
}

pedirCarta();

// Valor de una carta

const valorCarta = ( carta ) => {
  const valor = carta.substring( 0, carta.length - 1 ); // Elimina el ultimo caracter de la carta

  // let puntos = 0;
  // if ( isNaN( valor )) { // Si no es un numero, isNaN es una funcion que devuelve true si no es un numero
  //   puntos = ( valor === 'A' ) ? 11 : 10; // Si es A vale 11, sino vale 10
  // } else {
  //   puntos = valor * 1; // Multiplica por 1 para convertirlo en numero
  // }

  // Otra forma de hacerlo

  return ( isNaN( valor )) ? ( valor === 'A' ) ? 11 : 10 : valor * 1;
}

// Turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; // Crea la imagen de la carta
    imgCarta.classList.add('carta'); // Agrega la clase carta
    divCartasComputadora.append( imgCarta ); // Agrega la imagen de la carta al div

    if ( puntosMinimos > 21 ) {
      break;
    }

  } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

  setTimeout(() => { // Funcion que se ejecuta despues de un tiempo
    if ( puntosComputadora === puntosMinimos ) {
      alert('Nadie gana :(');
    } else if ( puntosMinimos > 21 ) {
      alert('Computadora gana');
    } else if ( puntosComputadora > 21 ) {
      alert('Jugador gana');
    } else {
      alert('Computadora gana');
    }
  }, 10);
}


// Eventos

// Cuando se hace click en el boton pedir
btnPedir.addEventListener('click', () => { // Cuando se hace click en el boton pedir
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta( carta );
  puntosHTML[0].innerText = puntosJugador; // Muestra los puntos en el HTML

  // <img class="carta" src="assets/cartas/10C.png" alt=""></img>
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${ carta }.png`; // Crea la imagen de la carta
  imgCarta.classList.add('carta'); // Agrega la clase carta
  divCartasJugador.append( imgCarta ); // Agrega la imagen de la carta al div

  if ( puntosJugador > 21 ) {
    console.warn('Lo siento mucho, perdiste');
    btnPedir.disabled = true;
    // btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
  } else if ( puntosJugador === 21 ) {
    console.warn('21, genial!');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
  }

});

// Cuando se hace click en el boton detener

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  
  turnoComputadora( puntosJugador );
});

// Cuando se hace click en el boton nuevo

btnNuevo.addEventListener('click', () => {
  console.clear();

  deck = [];
  deck = crearDeck();

  puntosJugador     = 0;
  puntosComputadora = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = '';
  divCartasJugador.innerHTML = '';

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});