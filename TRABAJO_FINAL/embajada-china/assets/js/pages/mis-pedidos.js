/* Mis pedidos: el cliente consulta sus pedidos y su estado. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Mis pedidos" }]);

  var zona = document.getElementById("lista");
  var resaltado = Number(EC.params.get("n")) || null;
  var textosEstado = {
    "Pendiente": "Recibimos tu pedido y está en cola.",
    "En preparación": "Estamos preparando tu pedido.",
    "Listo": null
  };

  function mensajeEstado(p) {
    if (p.estado === "Listo") return p.entrega === "Domicilio" ? "Tu pedido está listo y sale hacia tu dirección." : "Tu pedido está listo para recoger en el restaurante.";
    return textosEstado[p.estado] || "";
  }

  function tarjeta(p) {
    var paso = EC.estadosPedido.indexOf(p.estado);
    var pasos = EC.estadosPedido.map(function (e, i) {
      return '<li class="progreso__paso' + (i <= paso ? " progreso__paso--hecho" : "") + (i === paso ? " progreso__paso--actual" : "") + '"' + (i === paso ? ' aria-current="step"' : "") + "><span>" + e + "</span></li>";
    }).join("");
    var entrega = p.entrega === "Domicilio"
      ? "Domicilio: " + EC.esc(p.direccion || "") + (p.barrio ? ", " + EC.esc(p.barrio) : "") + (p.indicaciones ? " (" + EC.esc(p.indicaciones) + ")" : "")
      : "Recoger en el restaurante";
    return '<article class="pedido-tarjeta' + (p.numero === resaltado ? " pedido-tarjeta--resaltado" : "") + '" id="pedido-' + p.numero + '">' +
      '<header><h2>Pedido #' + p.numero + '</h2><span class="' + EC.claseEstado(p.estado) + '">' + p.estado + "</span></header>" +
      '<p class="pedido-tarjeta__mensaje">' + mensajeEstado(p) + "</p>" +
      '<ol class="progreso" aria-label="Estado del pedido">' + pasos + "</ol>" +
      '<ul class="detalle-pedido__items">' + p.items.map(function (i) {
        return "<li><span>" + i.cantidad + " × " + EC.esc(i.nombre) + "</span><span>" + EC.precio(i.precio * i.cantidad) + "</span></li>";
      }).join("") + "</ul>" +
      '<p class="detalle-pedido__total"><span>Total</span><strong>' + EC.precio(p.total) + "</strong></p>" +
      '<dl class="detalle-pedido__datos">' +
        "<div><dt>Fecha</dt><dd>" + EC.fechaLarga(p.fecha) + " " + EC.esc(p.hora) + "</dd></div>" +
        "<div><dt>Cliente</dt><dd>" + EC.esc(p.cliente) + "</dd></div>" +
        (p.telefono ? "<div><dt>Teléfono</dt><dd>" + EC.esc(p.telefono) + "</dd></div>" : "") +
        "<div><dt>Entrega</dt><dd>" + entrega + "</dd></div>" +
        (p.pago ? "<div><dt>Forma de pago</dt><dd>" + EC.esc(p.pago) + "</dd></div>" : "") +
        (p.nota ? "<div><dt>Observaciones</dt><dd>" + EC.esc(p.nota) + "</dd></div>" : "") +
      "</dl></article>";
  }

  function dibujar() {
    var numeros = EC.pedidos.misNumeros();
    var lista = numeros.map(EC.pedidos.porNumero.bind(EC.pedidos)).filter(Boolean).sort(function (a, b) { return b.numero - a.numero; });
    if (lista.length === 0) {
      zona.innerHTML = '<div class="sin-productos"><p>Aún no tienes pedidos en este navegador. Haz tu pedido desde el menú o consulta uno con su número y tu teléfono.</p>' +
        '<a class="boton boton--primario" href="' + EC.url("pages/menu.html") + '">Ver el menú</a></div>';
      return;
    }
    zona.innerHTML = lista.map(tarjeta).join("");
  }

  /* Consultar un pedido con número y teléfono. */
  document.getElementById("form-buscar").addEventListener("submit", function (e) {
    e.preventDefault();
    var numero = document.getElementById("b-numero").value.trim().replace("#", "");
    var tel = document.getElementById("b-telefono").value;
    var error = document.getElementById("error-buscar");
    var p = EC.pedidos.buscar(numero, tel);
    if (!p) { error.textContent = "No encontramos un pedido con ese número y teléfono."; return; }
    error.textContent = "";
    EC.pedidos.recordar(p.numero);
    resaltado = p.numero;
    dibujar();
    var el = document.getElementById("pedido-" + p.numero);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  dibujar();
  if (resaltado) { var el = document.getElementById("pedido-" + resaltado); if (el) el.scrollIntoView({ block: "start" }); }
  /* El estado se actualiza solo cuando el vendedor lo cambia. */
  window.addEventListener("storage", dibujar);
  setInterval(dibujar, 5000);
})();
