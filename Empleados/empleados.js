class Empleado {
  constructor(nombre, salarioBase) {
    this.nombre = nombre;
    this.salarioBase = salarioBase;
  }

  calcularSalario() {
    return this.salarioBase;
  }

  valorAPagar() {
    return this.calcularSalario();
  }

  static contar(listaEmpleados) {
    return listaEmpleados.length;
  }

  static calcularParafiscales(listaEmpleados) {
    let totalSalarios = 0;
    for (let empleado of listaEmpleados) {
      totalSalarios += empleado.valorAPagar();
    }
    let parafiscales = totalSalarios * 0.09; 
    return parafiscales;
  }
}

class Gerente extends Empleado {
  calcularSalario() {
    return this.salarioBase + 1000;
  }
}

class Desarrollador extends Empleado {
  calcularSalario() {
    return this.salarioBase + 500;
  }
}


const gerente1 = new Gerente("Laura", 3000);
const dev1 = new Desarrollador("Carlos", 2800);
const dev2 = new Desarrollador("Ana", 3200);

const empleados = [gerente1, dev1, dev2];

let salida = "";

empleados.forEach(emp => {
  salida += `Empleado: ${emp.nombre}\n`;
  salida += `Salario base: $${emp.salarioBase}\n`;
  salida += `Salario total: $${emp.calcularSalario()}\n`;
  salida += `Valor a pagar: $${emp.valorAPagar()}\n\n`;
});

salida += `Total de empleados: ${Empleado.contar(empleados)}\n`;
salida += `Parafiscales (9% del total salarios): $${Empleado.calcularParafiscales(empleados).toFixed(2)}`;


document.getElementById("resultado").textContent = salida;
