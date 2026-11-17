/* Pedidos: registro, existencias del día y cambio de estado (guardados en localStorage). */
EC.pedidos = {
  clave: "ec.pedidos",

  todos: function () { return EC.almacen.leer(this.clave, []); },

  /* Unidades ya pedidas hoy de un producto. */
  vendidasHoy: function (id) {
    var hoy = EC.hoyISO();
    return this.todos().filter(function (p) { return p.fecha === hoy; }).reduce(function (suma, p) {
      return suma + p.items.filter(function (i) { return i.id === id; }).reduce(function (a, i) { return a + i.cantidad; }, 0);
    }, 0);
  },

  /* Unidades que aún se pueden pedir hoy (0 si el plato no está disponible). */
  disponibles: function (id) {
    var p = EC.producto(id);
    if (!p || !p.disponible) return 0;
    return Math.max(0, p.existencias - this.vendidasHoy(id));
  },

  /* Calcula el valor total; lanza un error si algún dato no es válido (excepción 3.1 de Realizar pedido). */
  calcularTotal: function (items) {
    var total = 0;
    items.forEach(function (i) {
      var p = EC.producto(i.id);
      if (!p || !isFinite(p.precio) || !isFinite(i.cantidad) || i.cantidad < 1) throw new Error("total");
      total += p.precio * i.cantidad;
    });
    return total;
  },

  claveMis: "ec.mis-pedidos",
  misNumeros: function () { return EC.almacen.leer(this.claveMis, []); },
  recordar: function (numero) {
    var lista = this.misNumeros();
    if (lista.indexOf(numero) === -1) { lista.push(numero); EC.almacen.guardar(this.claveMis, lista); }
  },
  porNumero: function (numero) {
    return this.todos().find(function (p) { return p.numero === Number(numero); }) || null;
  },
  /* Busca un pedido por número y teléfono (para consultarlo desde "Mis pedidos"). */
  buscar: function (numero, telefono) {
    var p = this.porNumero(numero);
    var solo = function (t) { return String(t || "").replace(/\D/g, ""); };
    return p && solo(p.telefono) && solo(p.telefono) === solo(telefono) ? p : null;
  },

  /* Registra el pedido. datos: cliente, telefono, correo, entrega, direccion, barrio, indicaciones, pago, nota.
     Devuelve el pedido, o null si no se pudo guardar. */
  registrar: function (datos, items) {
    var lista = this.todos();
    var numero = lista.reduce(function (m, p) { return Math.max(m, p.numero); }, 1000) + 1;
    var ahora = new Date();
    var pedido = Object.assign({
      numero: numero,
      fecha: EC.hoyISO(),
      hora: ahora.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      estado: "Pendiente",
      items: items.map(function (i) {
        var p = EC.producto(i.id);
        return { id: p.id, nombre: p.nombre, precio: p.precio, cantidad: i.cantidad };
      }),
      total: this.calcularTotal(items)
    }, datos);
    if (!EC.almacen.guardar(this.clave, lista.concat([pedido]))) return null;
    this.recordar(numero);
    return pedido;
  },

  /* Cambia el estado de un pedido. Devuelve true si se guardó. */
  cambiarEstado: function (numero, estado) {
    var lista = this.todos();
    var p = lista.find(function (x) { return x.numero === numero; });
    if (!p) return false;
    p.estado = estado;
    return EC.almacen.guardar(this.clave, lista);
  }
};
