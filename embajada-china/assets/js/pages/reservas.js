/* Realizar reserva: disponibilidad, mesa, datos del cliente y confirmación. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Reservas" }]);

  var fFecha = document.getElementById("fecha");
  var fHora = document.getElementById("hora");
  var fPersonas = document.getElementById("personas");
  var errorFecha = document.getElementById("error-fecha");
  var zonaMesas = document.getElementById("mesas");
  var listaMesas = document.getElementById("mesas-lista");
  var btnConfirmar = document.getElementById("confirmar");
  var campos = ["r-nombre", "r-telefono", "r-correo", "r-nota"];

  fFecha.min = EC.hoyISO();
  fFecha.value = EC.hoyISO();
  fHora.innerHTML = EC.horarios.map(function (h) {
    return '<option value="' + h.hora + '"' + (h.hora === "7:00 pm" ? " selected" : "") + ">" + h.hora + "</option>";
  }).join("");
  fPersonas.innerHTML = EC.opcionesPersonas.map(function (n) {
    return '<option value="' + n + '"' + (n === 4 ? " selected" : "") + ">" + n + "</option>";
  }).join("");

  function ocultarMesas() { zonaMesas.hidden = true; btnConfirmar.disabled = true; listaMesas.innerHTML = ""; }
  function limpiarDatos() {
    campos.forEach(function (id) { document.getElementById(id).value = ""; var e = document.getElementById("error-" + id); if (e) e.textContent = ""; });
  }
  function aviso(titulo, mensaje) { EC.modal.abrir({ tipo: "aviso", titulo: titulo, mensaje: mensaje }); }

  /* Cualquier cambio en fecha, hora o personas exige consultar de nuevo. */
  [fFecha, fHora, fPersonas].forEach(function (c) { c.addEventListener("change", ocultarMesas); });

  /* Pasos 9 a 11. */
  document.getElementById("consultar").addEventListener("click", function () {
    errorFecha.textContent = "";
    var fecha = fFecha.value, hora = fHora.value, personas = Number(fPersonas.value);

    if (!fecha || fecha < EC.hoyISO()) {
      errorFecha.textContent = "Elige una fecha de hoy en adelante.";
      fFecha.focus();
      return;
    }

    /* Excepción 9.1: horario no disponible. */
    var horario = EC.horarios.find(function (h) { return h.hora === hora; });
    if (!horario || !horario.disponible) {
      ocultarMesas();
      aviso("¡El horario seleccionado no se encuentra disponible!", "Por favor seleccionar otro.");
      return;
    }

    var libres = 0;
    listaMesas.innerHTML = EC.mesas.map(function (m) {
      var ocupada = EC.reservas.ocupada(fecha, hora, m.id);
      var pequena = m.capacidad < personas;
      var apta = !ocupada && !pequena;
      if (apta) libres++;
      var estado = ocupada ? "Ocupada" : pequena ? "Capacidad insuficiente" : "Disponible";
      return '<div class="mesa"><input type="radio" name="mesa" id="mesa-' + m.id + '" value="' + m.id + '"' + (apta ? "" : " disabled") + ">" +
        '<label for="mesa-' + m.id + '"><span class="mesa__nombre">' + EC.esc(m.nombre) + "</span>" +
        "<span>" + m.capacidad + ' personas</span><span class="mesa__estado">' + estado + "</span></label></div>";
    }).join("");

    /* Excepciones 9.1 y 9.2. */
    if (libres === 0) {
      ocultarMesas();
      var hayLibres = EC.mesas.some(function (m) { return !EC.reservas.ocupada(fecha, hora, m.id); });
      if (hayLibres) aviso("¡Cantidad no disponible!", "Por favor modificarla.");
      else aviso("¡El horario seleccionado no se encuentra disponible!", "Por favor seleccionar otro.");
      return;
    }

    zonaMesas.hidden = false;
    btnConfirmar.disabled = true;
    listaMesas.querySelectorAll("input").forEach(function (r) {
      r.addEventListener("change", function () { btnConfirmar.disabled = false; });
    });
    zonaMesas.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Valida los datos del cliente. */
  function validar() {
    var nombre = document.getElementById("r-nombre").value.trim();
    var tel = document.getElementById("r-telefono").value.replace(/\D/g, "");
    var correo = document.getElementById("r-correo").value.trim();
    var errores = {};
    if (nombre.length < 3) errores["r-nombre"] = "Escribe tu nombre completo.";
    if (tel.length < 7 || tel.length > 12) errores["r-telefono"] = "Escribe un teléfono válido (7 a 10 dígitos).";
    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores["r-correo"] = "El correo no es válido.";
    campos.forEach(function (id) { var e = document.getElementById("error-" + id); if (e) e.textContent = errores[id] || ""; });
    var primero = Object.keys(errores)[0];
    if (primero) document.getElementById(primero).focus();
    return !primero;
  }

  /* Pasos 13 a 18. */
  btnConfirmar.addEventListener("click", function () {
    var marcada = listaMesas.querySelector("input:checked");
    if (!marcada) return;
    if (!validar()) return;
    var mesa = EC.mesas.find(function (m) { return m.id === Number(marcada.value); });
    var datos = {
      fecha: fFecha.value, hora: fHora.value, personas: Number(fPersonas.value), mesa: mesa.id,
      cliente: document.getElementById("r-nombre").value.trim(),
      telefono: document.getElementById("r-telefono").value.trim(),
      correo: document.getElementById("r-correo").value.trim(),
      nota: document.getElementById("r-nota").value.trim()
    };

    /* Excepción 13.1: error al confirmar (mesa tomada entre tanto o almacenamiento no disponible). */
    var reserva = null;
    try { reserva = EC.reservas.registrar(datos); } catch (e) { reserva = null; }
    if (!reserva) {
      ocultarMesas();
      aviso("No fue posible realizar la reserva", "Ocurrió un error al confirmar. Consulta la disponibilidad e inténtalo de nuevo.");
      return;
    }

    EC.modal.abrir({
      tipo: "ok",
      titulo: "¡Reserva realizada correctamente!",
      mensaje: "Guarda tu número de reserva: lo necesitas para consultarla en \"Mis reservas\".",
      detalle: [
        ["Número de reserva", EC.reservas.codigo(reserva)],
        ["A nombre de", reserva.cliente],
        ["Teléfono", reserva.telefono],
        ["Fecha", EC.fechaLarga(reserva.fecha)],
        ["Hora", reserva.hora],
        ["Cantidad de personas", String(reserva.personas)],
        ["Mesa", mesa.nombre]
      ],
      botones: [
        { texto: "Ver mi reserva", tipo: "primario", accion: function () { window.location.href = EC.url("pages/mis-reservas.html?n=" + reserva.numero); return false; } },
        { texto: "Aceptar" }
      ],
      alCerrar: function () { ocultarMesas(); limpiarDatos(); }
    });
  });

  ocultarMesas();
})();
