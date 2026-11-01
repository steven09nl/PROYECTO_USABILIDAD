/* Datos de reservas. Ajusta mesas y horarios aquí. */
EC.mesas = [
  { id: 1, nombre: "Mesa 1", capacidad: 2 },
  { id: 2, nombre: "Mesa 2", capacidad: 4 },
  { id: 3, nombre: "Mesa 3", capacidad: 6 }
];

/* disponible: false simula un horario sin cupo (flujo de excepción 9.1). */
EC.horarios = [
  { hora: "12:00 pm", disponible: true },
  { hora: "1:00 pm",  disponible: true },
  { hora: "2:00 pm",  disponible: true },
  { hora: "3:00 pm",  disponible: false },
  { hora: "4:00 pm",  disponible: false },
  { hora: "5:00 pm",  disponible: true },
  { hora: "6:00 pm",  disponible: true },
  { hora: "7:00 pm",  disponible: true },
  { hora: "8:00 pm",  disponible: true },
  { hora: "9:00 pm",  disponible: true }
];

/* Opciones de cantidad de personas: de 1 a 6 (capacidad de la mesa más grande). */
EC.opcionesPersonas = [1, 2, 3, 4, 5, 6];

EC.restaurante = {
  nombre: "Embajada China",
  direccion: "Por completar",
  telefono: "Por completar",
  correo: "Por completar",
  horario: "Por completar"
};

/* Estados de un pedido y acceso del vendedor (módulo de pedidos). */
EC.estadosPedido = ["Pendiente", "En preparación", "Listo"];
EC.vendedor = { usuario: "vendedor", clave: "embajada2026" };
