/* Mis reservas: el cliente consulta (y puede cancelar) sus reservas. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Reservas", href: EC.url("pages/reservas.html") }, { texto: "Mis reservas" }]);

  var zona = document.getElementById("lista");
  var resaltado = EC.reservas.limpiarNumero(EC.params.get("n") || "") || null;

  function tarjeta(r) {
    var mesa = EC.mesas.find(function (m) { return m.id === r.mesa; });
    return '<article class="pedido-tarjeta' + (r.numero === resaltado ? " pedido-tarjeta--resaltado" : "") + '" id="reserva-' + r.numero + '">' +
      "<header><h2>Reserva " + EC.reservas.codigo(r) + '</h2><span class="estado estado--listo">' + (r.estado || "Confirmada") + "</span></header>" +
      '<p class="pedido-tarjeta__mensaje">Te esperamos el ' + EC.fechaLarga(r.fecha) + " a las " + EC.esc(r.hora) + ".</p>" +
      '<dl class="detalle-pedido__datos">' +
        "<div><dt>A nombre de</dt><dd>" + EC.esc(r.cliente || "") + "</dd></div>" +
        (r.telefono ? "<div><dt>Teléfono</dt><dd>" + EC.esc(r.telefono) + "</dd></div>" : "") +
        (r.correo ? "<div><dt>Correo</dt><dd>" + EC.esc(r.correo) + "</dd></div>" : "") +
        "<div><dt>Fecha</dt><dd>" + EC.fechaLarga(r.fecha) + "</dd></div>" +
        "<div><dt>Hora</dt><dd>" + EC.esc(r.hora) + "</dd></div>" +
        "<div><dt>Cantidad de personas</dt><dd>" + r.personas + "</dd></div>" +
        "<div><dt>Mesa</dt><dd>" + (mesa ? EC.esc(mesa.nombre) + " (" + mesa.capacidad + " personas)" : "-") + "</dd></div>" +
        (r.nota ? "<div><dt>Observaciones</dt><dd>" + EC.esc(r.nota) + "</dd></div>" : "") +
        "<div><dt>Dirección</dt><dd>" + EC.esc(EC.restaurante.direccion) + "</dd></div>" +
      '</dl><button type="button" class="boton" data-cancelar="' + r.numero + '">Cancelar reserva</button></article>';
  }

  function dibujar() {
    var lista = EC.reservas.misNumeros().map(function (n) { return EC.reservas.porNumero(n); }).filter(Boolean)
      .sort(function (a, b) { return b.numero - a.numero; });
    if (lista.length === 0) {
      zona.innerHTML = '<div class="sin-productos"><p>Aún no tienes reservas en este navegador. Haz una reserva o consulta una con su número y tu teléfono.</p>' +
        '<a class="boton boton--primario" href="' + EC.url("pages/reservas.html") + '">Reservar mesa</a></div>';
      return;
    }
    zona.innerHTML = lista.map(tarjeta).join("");
    zona.querySelectorAll("[data-cancelar]").forEach(function (b) {
      b.addEventListener("click", function () { cancelar(Number(b.dataset.cancelar)); });
    });
  }

  function cancelar(numero) {
    EC.modal.abrir({
      tipo: "aviso",
      titulo: "¿Cancelar la reserva R-" + numero + "?",
      mensaje: "La mesa quedará libre para otros clientes.",
      botones: [
        { texto: "Sí, cancelar reserva", tipo: "primario", accion: function () {
          if (!EC.reservas.cancelar(numero)) { EC.modal.abrir({ tipo: "aviso", titulo: "No fue posible cancelar", mensaje: "Inténtalo de nuevo." }); return true; }
          dibujar();
          EC.modal.abrir({ tipo: "ok", titulo: "Reserva cancelada", mensaje: "La reserva R-" + numero + " fue cancelada." });
        } },
        { texto: "Volver" }
      ]
    });
  }

  document.getElementById("form-buscar").addEventListener("submit", function (e) {
    e.preventDefault();
    var error = document.getElementById("error-buscar");
    var r = EC.reservas.buscar(document.getElementById("b-numero").value, document.getElementById("b-telefono").value);
    if (!r) { error.textContent = "No encontramos una reserva con ese número y teléfono."; return; }
    error.textContent = "";
    EC.reservas.recordar(r.numero);
    resaltado = r.numero;
    dibujar();
    var el = document.getElementById("reserva-" + r.numero);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  dibujar();
  if (resaltado) { var el = document.getElementById("reserva-" + resaltado); if (el) el.scrollIntoView({ block: "start" }); }
})();
