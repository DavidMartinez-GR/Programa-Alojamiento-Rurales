// ===============================
// DESARROLLO PRÁCTICO
// ===============================

// (B) Clase base y subclases mediante herencia

/**
 * Clase base para gestionar reservas estándar.
 */
class Reserva {
  #cliente;
  #fechaEntrada;
  #fechaSalida;
  #tarifaBase;

  /**
   * @param {{nombre: string, apellidos: string, email: string}} cliente
   * @param {Date} fechaEntrada
   * @param {Date} fechaSalida
   * @param {number} tarifaBase
   */
  constructor(cliente, fechaEntrada, fechaSalida, tarifaBase = 0) {
    this.#cliente = cliente;
    this.#fechaEntrada = fechaEntrada;
    this.#fechaSalida = fechaSalida;
    this.#tarifaBase = tarifaBase;
  }

  get cliente() {
    return this.#cliente;
  }

  set cliente(nuevoCliente) {
    this.#cliente = nuevoCliente;
  }

  get fechaEntrada() {
    return this.#fechaEntrada;
  }

  set fechaEntrada(nuevaFecha) {
    this.#fechaEntrada = nuevaFecha;
  }

  get fechaSalida() {
    return this.#fechaSalida;
  }

  set fechaSalida(nuevaFecha) {
    this.#fechaSalida = nuevaFecha;
  }

  get tarifaBase() {
    return this.#tarifaBase;
  }

  set tarifaBase(nuevaTarifa) {
    this.#tarifaBase = nuevaTarifa;
  }

  /**
   * Calcula el número de noches entre dos fechas.
   * @returns {number}
   */
  calcularNoches() {
    const msPorNoche = 1000 * 60 * 60 * 24;
    return Math.round((this.#fechaSalida - this.#fechaEntrada) / msPorNoche);
  }

  /**
   * Calcula el precio total para la reserva normal.
   * @returns {number}
   */
  calcularPrecioTotal() {
    return this.calcularNoches() * this.#tarifaBase;
  }
}

/**
 * Clase que representa una reserva con tarifa premium.
 * Hereda de Reserva.
 */
class ReservaPremium extends Reserva {
  /**
   * @param {string} cliente
   * @param {Date} fechaEntrada
   * @param {Date} fechaSalida
   * @param {number} tarifaPremium
   */
  constructor(cliente, fechaEntrada, fechaSalida, tarifaPremium) {
    super(cliente, fechaEntrada, fechaSalida);
    this.tarifaPremium = tarifaPremium;
  }

  /**
   * Calcula el precio total con tarifa premium.
   * @returns {number}
   */
  calcularPrecioTotal() {
    return this.calcularNoches() * this.tarifaPremium;
  }
}

// (C) Bloquear la herencia de ReservaPremium
Object.freeze(ReservaPremium);
// Nota: No se puede extender esta clase. Simula la palabra clave "final".

/**
 * Clase que representa una reserva con desayuno.
 * Hereda de Reserva.
 */
class ReservaConDesayuno extends Reserva {
  /**
   * @param {string} cliente
   * @param {Date} fechaEntrada
   * @param {Date} fechaSalida
   * @param {number} tarifaBase
   * @param {number} tarifaDesayuno
   */
  constructor(cliente, fechaEntrada, fechaSalida, tarifaBase, tarifaDesayuno) {
    super(cliente, fechaEntrada, fechaSalida);
    this.tarifaBase = tarifaBase;
    this.tarifaDesayuno = tarifaDesayuno;
  }

  /**
   * Sobrescribe el método para añadir desayuno al precio total.
   * @returns {number}
   */
  calcularPrecioTotal() {
    const noches = super.calcularNoches();
    return noches * (this.tarifaBase + this.tarifaDesayuno);
  }
}

// ===============================
// Lógica de la interfaz de usuario
// ===============================

const reservaForm = document.getElementById('reservaForm');
const tipoReservaSelect = document.getElementById('tipoReserva');
const desayunoContainer = document.getElementById('desayunoContainer');
const selectorDesayuno = document.getElementById('selectorDesayuno');
const tarifaBaseContainer = document.getElementById('tarifaBaseContainer');
const tarifaPremiumContainer = document.getElementById('tarifaPremiumContainer');
const tarifaDesayunoContainer = document.getElementById('tarifaDesayunoContainer');
const listaReservas = document.getElementById('listaReservas');

const reservas = [];

/**
 * Guarda las reservas en localStorage.
 */
function guardarReservasEnLocalStorage() {
  // Convertir reservas a objetos planos para serializar
  const reservasParaGuardar = reservas.map(reserva => {
    return {
      cliente: reserva.cliente,
      fechaEntrada: reserva.fechaEntrada.toISOString(),
      fechaSalida: reserva.fechaSalida.toISOString(),
      tarifaBase: reserva.tarifaBase !== undefined ? reserva.tarifaBase : 0,
      tarifaPremium: reserva.tarifaPremium !== undefined ? reserva.tarifaPremium : undefined,
      tarifaDesayuno: reserva.tarifaDesayuno !== undefined ? reserva.tarifaDesayuno : 0
    };
  });
  localStorage.setItem('reservas', JSON.stringify(reservasParaGuardar));
}

/**
 * Carga las reservas desde localStorage.
 */
function cargarReservasDesdeLocalStorage() {
  const reservasGuardadas = localStorage.getItem('reservas');
  if (reservasGuardadas) {
    const reservasArray = JSON.parse(reservasGuardadas);
    reservas.length = 0; // Limpiar array actual
    reservasArray.forEach((reservaData) => {
      let reserva;
      const cliente = reservaData.cliente;
      const fechaEntrada = new Date(reservaData.fechaEntrada);
      const fechaSalida = new Date(reservaData.fechaSalida);
      if (reservaData.tarifaPremium !== undefined) {
        reserva = new ReservaPremium(cliente, fechaEntrada, fechaSalida, reservaData.tarifaPremium);
      } else {
        reserva = new Reserva(cliente, fechaEntrada, fechaSalida, reservaData.tarifaBase);
      }
      reserva.tarifaDesayuno = reservaData.tarifaDesayuno || 0;
      reservas.push(reserva);
    });
  }
}

/**
 * Actualiza la visibilidad de los campos de tarifa y desayuno según el tipo de reserva y selección de desayuno.
 */
function actualizarCamposTarifa() {
  const tipo = tipoReservaSelect.value;
  const desayuno = selectorDesayuno.value;
  tarifaBaseContainer.style.display = 'none';
  tarifaPremiumContainer.style.display = 'none';
  tarifaDesayunoContainer.style.display = 'none';
  desayunoContainer.style.display = 'none';

  if (tipo === 'premium') {
    tarifaPremiumContainer.style.display = 'block';
    desayunoContainer.style.display = 'block';
  } else if (tipo === 'normal') {
    tarifaBaseContainer.style.display = 'block';
    desayunoContainer.style.display = 'block';
  }

  if (desayuno === 'si') {
    tarifaDesayunoContainer.style.display = 'block';
  }
}

tipoReservaSelect.addEventListener('change', actualizarCamposTarifa);
selectorDesayuno.addEventListener('change', actualizarCamposTarifa);
actualizarCamposTarifa();

/**
 * Crea un elemento de lista para mostrar la reserva en la interfaz.
 * @param {Reserva} reserva
 * @returns {HTMLLIElement}
 */
function crearElementoReserva(reserva) {
  const li = document.createElement('li');
  li.className = 'list-group-item';

  const cliente = reserva.cliente;
  let descripcion = `Cliente: ${cliente.nombre} ${cliente.apellidos} (${cliente.email}) | Noches: ${reserva.calcularNoches()}`;

  let precioTotal = reserva.calcularPrecioTotal();
  if (reserva.tarifaDesayuno && reserva.tarifaDesayuno > 0) {
    precioTotal += reserva.tarifaDesayuno;
    descripcion += ` | Precio Total (Con Desayuno): €${precioTotal.toFixed(2)}`;
  } else if (reserva instanceof ReservaPremium) {
    descripcion += ` | Precio Total (Premium): €${precioTotal.toFixed(2)}`;
  } else {
    descripcion += ` | Precio Total: €${precioTotal.toFixed(2)}`;
  }

  li.textContent = descripcion;
  return li;
}

let reservaAEliminarIndex = null;

function showAlert(message) {
  const modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'));
  const modalAlertaMensaje = document.getElementById('modalAlertaMensaje');
  modalAlertaMensaje.textContent = message;
  modalAlerta.show();
}

function manejarEnvioFormulario(event) {
  event.preventDefault();

  const cliente = {
    nombre: document.getElementById('nombre').value.trim(),
    apellidos: document.getElementById('apellidos').value.trim(),
    email: document.getElementById('email').value.trim(),
  };
  const fechaEntrada = new Date(document.getElementById('fechaEntrada').value);
  const fechaSalida = new Date(document.getElementById('fechaSalida').value);
  const tipoReserva = tipoReservaSelect.value;
  const desayuno = selectorDesayuno.value;

  if (fechaSalida <= fechaEntrada) {
    showAlert('La fecha de salida debe ser posterior a la fecha de entrada.');
    return;
  }

  let reserva;

  if (tipoReserva === 'premium') {
    const tarifaPremium = parseFloat(document.getElementById('tarifaPremium').value);
    if (isNaN(tarifaPremium) || tarifaPremium <= 0) {
      showAlert('Por favor, ingrese una tarifa premium válida.');
      return;
    }
    reserva = new ReservaPremium(cliente, fechaEntrada, fechaSalida, tarifaPremium);
  } else {
    const tarifaBase = parseFloat(document.getElementById('tarifaBase').value);
    if (isNaN(tarifaBase) || tarifaBase <= 0) {
      showAlert('Por favor, ingrese una tarifa base válida.');
      return;
    }
    reserva = new Reserva(cliente, fechaEntrada, fechaSalida, tarifaBase);
  }

  if (desayuno === 'si') {
    const tarifaDesayuno = parseFloat(document.getElementById('tarifaDesayuno').value);
    if (isNaN(tarifaDesayuno) || tarifaDesayuno < 0) {
      showAlert('Por favor, ingrese una tarifa válida para el desayuno.');
      return;
    }
    reserva.tarifaDesayuno = tarifaDesayuno;
  } else {
    reserva.tarifaDesayuno = 0;
  }

  reservas.push(reserva);
  guardarReservasEnLocalStorage();
  actualizarListaReservas();
  reservaForm.reset();
  actualizarCamposTarifa();
}

/**
 * Actualiza la lista de reservas mostrada en la interfaz.
 */
function actualizarListaReservas() {
  const tbody = document.querySelector('#tablaReservas tbody');
  tbody.innerHTML = '';

  reservas.forEach((reserva, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${reserva.cliente.nombre}</td>
      <td>${reserva.cliente.apellidos}</td>
      <td>${reserva.cliente.email}</td>
      <td>${reserva.fechaEntrada.toISOString().split('T')[0]}</td>
      <td>${reserva.fechaSalida.toISOString().split('T')[0]}</td>
      <td>${reserva.calcularNoches()}</td>
      <td>€${reserva.calcularPrecioTotal().toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarReserva(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarReserva(${index})">Eliminar</button>
      </td>
    `;


    tbody.appendChild(tr);
  });
}

function toggleTablaReservas() {
  const container = document.getElementById("tablaReservasContainer");
  container.style.display = container.style.display === "none" ? "block" : "none";
}

function editarReserva(index) {
  const reserva = reservas[index];

  document.getElementById('nombre').value = reserva.cliente.nombre;
  document.getElementById('apellidos').value = reserva.cliente.apellidos;
  document.getElementById('email').value = reserva.cliente.email;
  document.getElementById('fechaEntrada').value = reserva.fechaEntrada.toISOString().split('T')[0];
  document.getElementById('fechaSalida').value = reserva.fechaSalida.toISOString().split('T')[0];

  if (reserva instanceof ReservaPremium) {
    tipoReservaSelect.value = 'premium';
    document.getElementById('tarifaPremium').value = reserva.tarifaPremium;
  } else {
    tipoReservaSelect.value = 'normal';
    document.getElementById('tarifaBase').value = reserva.tarifaBase;
  }

  selectorDesayuno.value = reserva.tarifaDesayuno > 0 ? 'si' : 'no';
  document.getElementById('tarifaDesayuno').value = reserva.tarifaDesayuno || 0;

  actualizarCamposTarifa();

  // Eliminar la reserva actual para que al guardar se reemplace
  reservas.splice(index, 1);
  actualizarListaReservas();
}

function eliminarReserva(index) {
  reservaAEliminarIndex = index;
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
  modalEliminar.show();
}

document.getElementById('confirmarEliminarBtn').addEventListener('click', () => {
  if (reservaAEliminarIndex !== null) {
    reservas.splice(reservaAEliminarIndex, 1);
    guardarReservasEnLocalStorage();
    actualizarListaReservas();
    reservaAEliminarIndex = null;
    const modalEliminar = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));
    modalEliminar.hide();
  }
});

// Cargar reservas guardadas al iniciar la página
cargarReservasDesdeLocalStorage();
actualizarListaReservas();

reservaForm.addEventListener('submit', manejarEnvioFormulario);
