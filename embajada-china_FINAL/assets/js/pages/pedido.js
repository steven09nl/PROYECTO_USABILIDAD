/* Realizar pedido: resumen del carrito, total, confirmación y registro. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Menú", href: EC.url("pages/menu.html") }, { texto: "Pedido" }]);

  var zona = document.getElementById("pedido");
  var cliente = "";
  var nota = "";
  var mensaje = "";

  function aviso(titulo, texto) { EC.modal.abrir({ tipo: "aviso", titulo: titulo, mensaje: texto, botones: [{ texto: "Aceptar", tipo: "primario" }] }); }

  function dibujar() {
    var items = EC.carrito.items().filter(function (i) { return EC.producto(i.id); });

    if (items.length === 0) {
      zona.innerHTML = (mensaje ? '<p class="aviso-envio" role="status">' + EC.esc(mensaje) + "</p>" : "") +
        '<div class="sin-productos"><p>Tu pedido está vacío. Elige al menos un plato del menú para continuar.</p>' +
        '<a class="boton boton--primario" href="' + EC.url("pages/menu.html") + '">Ver el menú</a></div>';
      return;
    }

    var total = 0, errorTotal = false;
    try { total = EC.pedidos.calcularTotal(items); } catch (e) { errorTotal = true; }

    var filas = items.map(function (i) {
      var p = EC.producto(i.id);
      var quedan = EC.pedidos.disponibles(p.id);
      var problema = !p.disponible ? "Este plato ya no está disponible." : i.cantidad > quedan ? "Solo quedan " + quedan + " unidades." : "";
      return '<li class="pedido__item' + (problema ? " pedido__item--problema" : "") + '" data-id="' + p.id + '">' +
        '<img src="' + EC.imagen(p, 1) + '" alt="">' +
        "<div><h3>" + EC.esc(p.nombre) + "</h3><p class=\"pedido__unitario\">" + EC.precio(p.precio) + " c/u</p>" +
        (problema ? '<p class="campo__error">' + problema + "</p>" : "") +
        '<button type="button" class="enlace-boton" data-quitar>Retirar del pedido</button></div>' +
        '<div class="selector-cantidad selector-cantidad--pequeno" role="group" aria-label="Cantidad de ' + EC.esc(p.nombre) + '">' +
          '<button type="button" data-delta="-1" aria-label="Disminuir cantidad">&minus;</button><output>' + i.cantidad + '</output>' +
          '<button type="button" data-delta="1" aria-label="Aumentar cantidad">+</button></div>' +
        '<strong class="pedido__subtotal">' + EC.precio(p.precio * i.cantidad) + "</strong></li>";
    }).join("");

    zona.innerHTML =
      (mensaje ? '<p class="aviso-envio" role="status">' + EC.esc(mensaje) + "</p>" : "") +
      '<div class="pedido__grid">' +
        '<section aria-labelledby="resumen-t"><h2 id="resumen-t">Resumen del pedido</h2><ul class="pedido__lista">' + filas + "</ul></section>" +
        '<aside class="pedido__panel" aria-labelledby="datos-t"><h2 id="datos-t">Tu pedido</h2>' +
          '<div class="campo"><label for="cliente">Nombre del cliente</label><input id="cliente" autocomplete="name" value="' + EC.esc(cliente) + '"><p class="campo__error" id="error-cliente" role="alert"></p></div>' +
          '<div class="campo"><label for="nota">Observaciones (opcional)</label><textarea id="nota" rows="3">' + EC.esc(nota) + "</textarea></div>" +
          '<div class="pedido__total"><span>Valor total</span><strong>' + (errorTotal ? "No disponible" : EC.precio(total)) + "</strong></div>" +
          (errorTotal ? '<p class="campo__error" role="alert">No fue posible calcular el valor total. Revisa los platos del pedido.</p>' : "") +
          '<button type="button" class="boton boton--primario" id="confirmar"' + (errorTotal ? " disabled" : "") + ">Confirmar pedido</button>" +
          '<a class="boton" href="' + EC.url("pages/menu.html") + '">Agregar más platos</a>' +
        "</aside></div>";
    mensaje = "";

    zona.querySelector("#cliente").addEventListener("input", function (e) { cliente = e.target.value; });
    zona.querySelector("#nota").addEventListener("input", function (e) { nota = e.target.value; });
    zona.querySelectorAll(".pedido__item").forEach(function (li) {
      var id = li.dataset.id;
      li.querySelectorAll("[data-delta]").forEach(function (b) {
        b.addEventListener("click", function () {
          if (!EC.carrito.cambiarCantidad(id, Number(b.dataset.delta))) {
            aviso("¡Cantidad no disponible!", "Solo quedan " + EC.pedidos.disponibles(id) + " unidades de " + EC.producto(id).nombre + ". Por favor modifícala.");
          }
          dibujar();
        });
      });
      li.querySelector("[data-quitar]").addEventListener("click", function () { EC.carrito.quitar(id); dibujar(); });
    });
    zona.querySelector("#confirmar").addEventListener("click", confirmar);
  }

  /* Pasos 5 y 6: validar y abrir la ventana de confirmación. */
  function confirmar() {
    var items = EC.carrito.items().filter(function (i) { return EC.producto(i.id); });
    var errorCliente = document.getElementById("error-cliente");
    errorCliente.textContent = "";

    var total;
    try { total = EC.pedidos.calcularTotal(items); }
    catch (e) { aviso("No fue posible calcular el total", "Revisa los platos y cantidades del pedido e inténtalo de nuevo."); return; }

    if (!cliente.trim()) { errorCliente.textContent = "Escribe el nombre del cliente."; document.getElementById("cliente").focus(); return; }

    /* Excepciones 1.1 y 2.1. */
    for (var k = 0; k < items.length; k++) {
      var p = EC.producto(items[k].id);
      if (!p.disponible) { aviso("El plato " + p.nombre + " ya no está disponible", "Retíralo del pedido para continuar."); return; }
      var quedan = EC.pedidos.disponibles(p.id);
      if (items[k].cantidad > quedan) { aviso("¡Cantidad no disponible!", "Solo quedan " + quedan + " unidades de " + p.nombre + ". Por favor modifícala."); return; }
    }

    var detalle = [["Cliente", cliente.trim()]].concat(items.map(function (i) {
      var pr = EC.producto(i.id);
      return [i.cantidad + " × " + pr.nombre, EC.precio(pr.precio * i.cantidad)];
    }), [["Valor total", EC.precio(total)]]);

    EC.modal.abrir({
      tipo: "ok",
      titulo: "¿Confirmas tu pedido?",
      mensaje: "Revisa los platos y el valor total antes de confirmar.",
      detalle: detalle,
      botones: [
        { texto: "Confirmar pedido", tipo: "primario", accion: function () { registrar(items); } },
        { texto: "Cancelar pedido", accion: function () { mensaje = "El pedido no se registró. Tus platos siguen en el carrito."; dibujar(); } }
      ]
    });
  }

  /* Pasos 8 y 9, y excepción 4.1. */
  function registrar(items) {
    var pedido = null;
    try { pedido = EC.pedidos.registrar(cliente.trim(), nota.trim(), items); } catch (e) { pedido = null; }
    if (!pedido) { aviso("No fue posible realizar el pedido", "Ocurrió un error al registrarlo. Inténtalo de nuevo."); return; }
    EC.carrito.vaciar();
    var nombre = cliente.trim();
    cliente = ""; nota = "";
    EC.modal.abrir({
      tipo: "ok",
      titulo: "¡Pedido realizado correctamente!",
      detalle: [["Número de pedido", "#" + pedido.numero], ["Cliente", nombre], ["Valor total", EC.precio(pedido.total)], ["Estado", pedido.estado]],
      botones: [{ texto: "Aceptar", tipo: "primario" }],
      alCerrar: dibujar
    });
  }

  dibujar();
})();
