/* Reservas: registro, consulta por número y teléfono, y cancelación (guardadas en localStorage). */
EC.reservas = {
  clave: "ec.reservas",
  claveMis: "ec.mis-reservas",

  todas: function () { return EC.almacen.leer(this.clave, []); },

  ocupada: function (fecha, hora, mesaId) {
    return this.todas().some(function (r) { return r.fecha === fecha && r.hora === hora && r.mesa === mesaId; });
  },

  /* datos: fecha, hora, personas, mesa, cliente, telefono, correo, nota. Devuelve la reserva o null. */
  registrar: function (datos) {
    var lista = this.todas();
    if (this.ocupada(datos.fecha, datos.hora, datos.mesa)) return null;
    var numero = lista.reduce(function (m, r) { return Math.max(m, r.numero || 2000); }, 2000) + 1;
    var reserva = Object.assign({ numero: numero, estado: "Confirmada", creada: new Date().toISOString() }, datos);
    if (!EC.almacen.guardar(this.clave, lista.concat([reserva]))) return null;
    this.recordar(numero);
    return reserva;
  },

  limpiarNumero: function (n) { return Number(String(n).replace(/\D/g, "")); },
  porNumero: function (n) {
    var num = this.limpiarNumero(n);
    return this.todas().find(function (r) { return r.numero === num; }) || null;
  },
  buscar: function (numero, telefono) {
    var r = this.porNumero(numero);
    var solo = function (t) { return String(t || "").replace(/\D/g, ""); };
    return r && solo(r.telefono) && solo(r.telefono) === solo(telefono) ? r : null;
  },
  misNumeros: function () { return EC.almacen.leer(this.claveMis, []); },
  recordar: function (numero) {
    var l = this.misNumeros();
    if (l.indexOf(numero) === -1) { l.push(numero); EC.almacen.guardar(this.claveMis, l); }
  },
  cancelar: function (numero) {
    return EC.almacen.guardar(this.clave, this.todas().filter(function (r) { return r.numero !== numero; }));
  },
  codigo: function (r) { return "R-" + r.numero; }
};
