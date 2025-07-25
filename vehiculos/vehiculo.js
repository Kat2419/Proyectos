class Vehiculo {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }

  describir() {
    return `Vehículo de marca ${this.marca}, modelo ${this.modelo}.`;
  }

  static esMotorizado() {
    return true;
  }
}

class Auto extends Vehiculo {
  describir() {
    return `Auto de marca ${this.marca}, modelo ${this.modelo}.`;
  }
}

class Bicicleta extends Vehiculo {
  describir() {
    return `Bicicleta de marca ${this.marca}, modelo ${this.modelo}.`;
  }

  static esMotorizado() {
    return false;
  }
}

const miAuto = new Auto("Toyota", "Corolla");
const miBicicleta = new Bicicleta("Trek", "FX 3");

const outputDiv = document.getElementById("output");

const mostrarDescripcion = (vehiculo, clase) => {
  const esMotorizado = clase.esMotorizado();
  const descripcion = vehiculo.describir();
  outputDiv.innerHTML += `<p>${descripcion} ¿Motorizado? ${esMotorizado}</p>`;
};

mostrarDescripcion(miAuto, Auto);
mostrarDescripcion(miBicicleta, Bicicleta);
