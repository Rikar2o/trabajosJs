const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definición de la clase Contacto
class Contacto {
  constructor({ nombre, numeroDeTelefono, email }) {
    this.nombre = nombre;
    this.numeroDeTelefono = numeroDeTelefono;
    this.email = email;
  }
}

// Array que almacenará los contactos en la agenda
const agenda = [];

// Función para agregar un nuevo contacto
function agregarContacto() {
    rl.question('Ingrese el nombre: ', (nombre) => {
      rl.question('Ingrese el número de teléfono (debe ser numérico y tener 10 dígitos): ', (numeroDeTelefono) => {
        // Validar que el número de teléfono sea numérico y tenga 10 dígitos
        const esNumeroValido = /^\d{10}$/.test(numeroDeTelefono);
  
        if (esNumeroValido) {
          rl.question('Ingrese el correo electrónico: ', (email) => {
            const nuevoContacto = new Contacto({ nombre, numeroDeTelefono, email });
            agenda.push(nuevoContacto);
            console.log(`Contacto ${nombre} agregado.`);
            queHacer();
          });
        } else {
          console.log('Número de teléfono inválido. Debe ser numérico y tener 10 dígitos.');
          agregarContacto();
        }
      });
    });
  }

  function actualizarContacto() {
    rl.question('Ingrese el nombre del contacto que desea actualizar: ', (nombre) => {
      const contactoAActualizar = agenda.find(contacto => contacto.nombre === nombre);
  
      if (!contactoAActualizar) {
        console.log(`No se encontró el contacto ${nombre} en la agenda.`);
        queHacer();
      } else {
        rl.question(`Ingrese el nuevo número de teléfono para ${nombre}: `, (nuevoNumeroDeTelefono) => {
          contactoAActualizar.numeroDeTelefono = nuevoNumeroDeTelefono;
          console.log(`Contacto ${nombre} actualizado con el nuevo número de teléfono.`);
          queHacer();
        });
      }
    });
  }
  
// Función para remover un contacto por nombre
function removerContacto(nombre) {
  const indiceContacto = agenda.findIndex(contacto => contacto.nombre === nombre);

  if (indiceContacto !== -1) {
    agenda.splice(indiceContacto, 1);
    console.log(`Contacto ${nombre} eliminado.`);
    queHacer();
  } else {
    console.log(`No se encontró el contacto ${nombre} en la agenda.`);
    queHacer();
  }
}

// Función para buscar un contacto por nombre
function buscarContacto(nombre) {
  const buscar = agenda.find(contacto => contacto.nombre === nombre);

  if (!buscar) {
    console.log(`No se encontró el contacto ${nombre} en la agenda.`);
  } else {
    console.log(`Contacto encontrado:\nNombre: ${buscar.nombre}\nNúmero de teléfono: ${buscar.numeroDeTelefono}\nCorreo electrónico: ${buscar.email}`);
  }

  queHacer();
}

// Función para mostrar el menú y manejar las opciones del usuario
const queHacer = () => {
  rl.question('Escoge una opción a realizar:\n1. Buscar contacto\n2. Insertar contacto\n3. Actualizar contacto\n4. Eliminar contacto\n5. Salir\n', (answer) => {
    switch (answer) {
      case '1':
        console.log('Realizando búsqueda de contacto...');
        rl.question('Ingrese el nombre del contacto a buscar: ', (nombre) => {
          buscarContacto(nombre);
        });
        break;
      case '2':
        console.log('Realizando inserción de contacto...');
        agregarContacto();
        break;
      case '3':
        console.log('Realizando actualización de contacto...');
        actualizarContacto();
        break;
      case '4':
        console.log('Realizando eliminación de contacto...');
        rl.question('Ingrese el nombre del contacto a eliminar: ', (nombre) => {
          removerContacto(nombre);
        });
        break;
      case '5':
        console.log('Saliendo...');
        rl.close();
        break;
      default:
        console.log('Opción no válida. Por favor, elige una opción del 1 al 5.');
        queHacer();
        break;
    }
  });
};

// Llamamos a la función para empezar
queHacer();

  
  



