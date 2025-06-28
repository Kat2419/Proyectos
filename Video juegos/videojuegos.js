class VideoJuego {
  constructor(titulo, consola, anioLanzamiento, precio) {
    this.titulo = titulo;
    this.consola = consola;
    this.anioLanzamiento = anioLanzamiento;
    this.precio = precio;
  }

  describir() {
    return `${this.titulo} - ${this.consola} (${this.anioLanzamiento}) - $${this.precio}`;
  }
}

class JuegoColeccionista extends VideoJuego {
  constructor(titulo, consola, anioLanzamiento, precio, rareza) {
    super(titulo, consola, anioLanzamiento, precio);
    this.rareza = rareza;
    this.ajustarPrecio();
  }

  ajustarPrecio() {
    if (this.rareza === 'media') {
      this.precio *= 1.5;
    } else if (this.rareza === 'alta') {
      this.precio *= 2;
    }
  }

  describir() {
    return `${super.describir()} - Rareza: ${this.rareza}`;
  }
}

const inventario = [
  new VideoJuego('Spider-Man 2', 'PS5', 2023, 60),
  new VideoJuego('Halo Infinite', 'Xbox Series X', 2021, 55),
  new VideoJuego('The Legend of Zelda: Tears of the Kingdom', 'Nintendo Switch', 2023, 70),
  new VideoJuego('God of War: Ragnarok', 'PS5', 2022, 65),
  new VideoJuego('Forza Horizon 5', 'Xbox Series X', 2021, 50),
  new VideoJuego('Super Smash Bros Ultimate', 'Nintendo Switch', 2018, 50),
  new JuegoColeccionista('Final Fantasy VII Remake', 'PS5', 2020, 60, 'alta'),
  new JuegoColeccionista('Metroid Prime Trilogy', 'Nintendo Switch', 2009, 40, 'media')
];

function mostrarPorConsola(consola) {
  const output = document.getElementById('output');
  output.innerHTML = `<h2>Juegos para ${consola}</h2>`;
  const filtrados = inventario.filter(juego => juego.consola === consola);
  if (filtrados.length === 0) {
    output.innerHTML += `<p>No hay juegos para ${consola}.</p>`;
  } else {
    filtrados.forEach(juego => {
      output.innerHTML += `<div class="juego">${juego.describir()}</div>`;
    });
  }
}

function ordenarPorAnio() {
  const output = document.getElementById('output');
  const ordenados = [...inventario].sort((a, b) => a.anioLanzamiento - b.anioLanzamiento);
  output.innerHTML = `<h2>Videojuegos Ordenados por Año</h2>`;
  ordenados.forEach(juego => {
    output.innerHTML += `<div class="juego">${juego.describir()}</div>`;
  });
}

function mostrarValorInventario() {
  const total = inventario.reduce((sum, juego) => sum + juego.precio, 0);
  const output = document.getElementById('output');
  output.innerHTML = `<h2>Valor Total del Inventario</h2><p>$${total.toFixed(2)}</p>`;
}
