/* Realizar reserva: formulario, consulta de disponibilidad, selección de mesa y confirmación. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Reservas" }]);

  var CLAVE = "ec.reservas";
  var fFecha = document.getElementById("fecha");
  var fHora = document.getElementById("hora");
  var fPersonas = document.getElementById("personas");
  var errorFecha = document.getElementById("error-fecha");
  var zonaMesas = document.getElementById("mesas");
  var listaMesas = document.getElementById("mesas-lista");
  var btnConfirmar = document.getElementById("confirmar");

  fFecha.min = EC.hoyISO();
  fFecha.value = EC.hoyISO();
  fHora.innerHTML = EC.horarios.map(function (h) {
    return '<option value="' + h.hora + '"' + (h.hora === "7:00 pm" ? " selected" : "") + ">" + h.hora + "</option>";
  }).join("");
  fPersonas.innerHTML = EC.opcionesPersonas.map(function (n) {
    return '<option value="' + n + '"' + (n === 4 ? " selected" : "") + ">" + n + "</option>";
  }).join("");

  function reservas() { return EC.almacen.leer(CLAVE, []); }
  function mesaOcupada(fecha, hora, mesaId) {
    return reservas().some(function (r) { return r.fecha === fecha && r.hora === hora && r.mesa === mesaId; });
  }
  function ocultarMesas() { zonaMesas.hidden = true; btnConfirmar.disabled = true; listaMesas.innerHTML = ""; }

  /* Pasos 3, 5 y 7 (y sus ramas): cualquier cambio exige consultar de nuevo. */
  [fFecha, fHora, fPersonas].forEach(function (c) { c.addEventListener("change", ocultarMesas); });

  function aviso(titulo, mensaje) {
    EC.modal.abrir({ tipo: "aviso", titulo: titulo, mensaje: mensaje });
  }

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
      var ocupada = mesaOcupada(fecha, hora, m.id);
      var pequena = m.capacidad < personas;
      var apta = !ocupada && !pequena;
      if (apta) libres++;
      var estado = ocupada ? "Ocupada" : pequena ? "Capacidad insuficiente" : "Disponible";
      return '<div class="mesa"><input type="radio" name="mesa" id="mesa-' + m.id + '" value="' + m.id + '"' + (apta ? "" : " disabled") + ">" +
        '<label for="mesa-' + m.id + '"><span class="mesa__nombre">' + EC.esc(m.nombre) + "</span>" +
        "<span>" + m.capacidad + " personas</span><span class=\"mesa__estado\">" + estado + "</span></label></div>";
    }).join("");

    /* Excepciones 9.1 y 9.2: sin mesas libres en ese horario, o ninguna con capacidad para la cantidad pedida. */
    if (libres === 0) {
      ocultarMesas();
      var hayLibres = EC.mesas.some(function (m) { return !mesaOcupada(fecha, hora, m.id); });
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

  /* Pasos 13 a 18. */
  btnConfirmar.addEventListener("click", function () {
    var marcada = listaMesas.querySelector("input:checked");
    if (!marcada) return;
    var mesa = EC.mesas.find(function (m) { return m.id === Number(marcada.value); });
    var fecha = fFecha.value, hora = fHora.value, personas = Number(fPersonas.value);

    /* Excepción 13.1: error al confirmar (mesa tomada entre tanto o almacenamiento no disponible). */
    var registro = reservas();
    var guardada = !mesaOcupada(fecha, hora, mesa.id) &&
      EC.almacen.guardar(CLAVE, registro.concat([{ fecha: fecha, hora: hora, personas: personas, mesa: mesa.id }]));
    if (!guardada) {
      ocultarMesas();
      aviso("No fue posible realizar la reserva", "Ocurrió un error al confirmar. Consulta la disponibilidad e inténtalo de nuevo.");
      return;
    }

    EC.modal.abrir({
      tipo: "ok",
      titulo: "¡Reserva realizada correctamente!",
      detalle: [
        ["Fecha", EC.fechaLarga(fecha)],
        ["Hora", hora],
        ["Cantidad de personas", String(personas)],
        ["Mesa", mesa.nombre]
      ],
      botones: [{ texto: "Aceptar", tipo: "primario" }],
      alCerrar: ocultarMesas
    });
  });

  ocultarMesas();
})();
