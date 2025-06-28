class ItemBiblioteca {
  constructor(titulo, autor, isbn, disponible) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.disponible = disponible;
  }
}

class Libro extends ItemBiblioteca {
  constructor(titulo, autor, genero, isbn, disponible = true) {
    super(titulo, autor, isbn, disponible);
    this.genero = genero;
  }

  mostrar() {
    const estado = this.disponible
      ? `<span class="disponible">Disponible</span>`
      : `<span class="no-disponible">Prestado</span>`;
    return `<strong>${this.titulo}</strong> de ${this.autor} (${this.genero})<br>
            ISBN: ${this.isbn} - Estado: ${estado}`;
  }
}

class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.librosPrestados = [];
  }

  mostrar() {
    const libros = this.librosPrestados.length > 0
      ? this.librosPrestados.join(", ")
      : "Ninguno";
    return `<strong>${this.nombre}</strong><br>Email: ${this.email}<br>Libros prestados: ${libros}`;
  }

  pedirLibro(libro) {
    if (libro.disponible) {
      libro.disponible = false;
      this.librosPrestados.push(libro.titulo);
      alert(`${this.nombre} ha pedido el libro: "${libro.titulo}"`);
      mostrarLibros();
      mostrarUsuarios();
    } else {
      alert(`El libro "${libro.titulo}" no está disponible.`);
    }
  }

  devolverLibro(libro) {
    const index = this.librosPrestados.indexOf(libro.titulo);
    if (index !== -1) {
      this.librosPrestados.splice(index, 1);
      libro.disponible = true;
      alert(`${this.nombre} ha devuelto el libro: "${libro.titulo}"`);
      mostrarLibros();
      mostrarUsuarios();
    } else {
      alert(`${this.nombre} no tiene el libro "${libro.titulo}".`);
    }
  }
}

const biblioteca = [
  new Libro("Cien Años de Soledad", "Gabriel García Márquez", "Realismo Mágico", "978-0307474728"),
  new Libro("El Principito", "Antoine de Saint-Exupéry", "Fábula", "978-0156012195"),
  new Libro("1984", "George Orwell", "Distopía", "978-0451524935"),
  new Libro("Don Quijote", "Miguel de Cervantes", "Novela", "978-8491050296"),
];

const usuarios = [
  new Usuario("Pepita Pérez", "pepitaperez@gmail.com"),
  new Usuario("Pedro Arroyo", "pedroarroyo@gmail.com"),
  new Usuario("María Hercilia", "maria@gmail.com"),
  new Usuario("Carmenza Azul", "carmenzaazul@gmail.com"),
];

function mostrarLibros() {
  const contenedor = document.getElementById("contenedorLibros");
  contenedor.innerHTML = "";
  biblioteca.forEach(libro => {
    const div = document.createElement("div");
    div.className = "libro";
    div.innerHTML = libro.mostrar();
    contenedor.appendChild(div);
  });
}

function mostrarUsuarios() {
  const contenedor = document.getElementById("contenedorUsuarios");
  contenedor.innerHTML = "";
  usuarios.forEach(usuario => {
    const div = document.createElement("div");
    div.className = "usuario";
    div.innerHTML = usuario.mostrar();

    // Select para pedir libro
    const selectPedir = document.createElement("select");
    biblioteca.forEach((libro, index) => {
      if (libro.disponible) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = libro.titulo;
        selectPedir.appendChild(option);
      }
    });

    const botonPedir = document.createElement("button");
    botonPedir.textContent = "Pedir libro";
    botonPedir.onclick = () => {
      const libroElegido = biblioteca[selectPedir.value];
      usuario.pedirLibro(libroElegido);
    };

    // Select para devolver libro
    const selectDevolver = document.createElement("select");
    usuario.librosPrestados.forEach(titulo => {
      const libro = biblioteca.find(lib => lib.titulo === titulo);
      const option = document.createElement("option");
      option.value = biblioteca.indexOf(libro);
      option.textContent = titulo;
      selectDevolver.appendChild(option);
    });

    const botonDevolver = document.createElement("button");
    botonDevolver.textContent = "Devolver libro";
    botonDevolver.onclick = () => {
      const libroDevuelto = biblioteca[selectDevolver.value];
      usuario.devolverLibro(libroDevuelto);
    };

    div.appendChild(document.createElement("br"));
    div.appendChild(selectPedir);
    div.appendChild(botonPedir);
    div.appendChild(document.createElement("br"));
    div.appendChild(selectDevolver);
    div.appendChild(botonDevolver);

    contenedor.appendChild(div);
  });
}

function ordenarPorTitulo() {
  biblioteca.sort((a, b) => a.titulo.localeCompare(b.titulo));
  mostrarLibros();
}

function ordenarPorAutor() {
  biblioteca.sort((a, b) => a.autor.localeCompare(b.autor));
  mostrarLibros();
}

mostrarLibros();
mostrarUsuarios();
