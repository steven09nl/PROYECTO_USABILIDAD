/* Realizar pedido: resumen del carrito, datos de entrega, total, confirmación y registro. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Menú", href: EC.url("pages/menu.html") }, { texto: "Pedido" }]);

  var zona = document.getElementById("pedido");
  var mensaje = "";
  var datos = { cliente: "", telefono: "", correo: "", entrega: "Domicilio", direccion: "", barrio: "", indicaciones: "", pago: EC.formasPago[0], nota: "" };

  function aviso(titulo, texto) { EC.modal.abrir({ tipo: "aviso", titulo: titulo, mensaje: texto, botones: [{ texto: "Aceptar", tipo: "primario" }] }); }
  function campo(id, etiqueta, valor, extra) {
    extra = extra || {};
    return '<div class="campo"><label for="' + id + '">' + etiqueta + "</label>" +
      '<input id="' + id + '" value="' + EC.esc(valor) + '"' + (extra.tipo ? ' type="' + extra.tipo + '"' : "") + (extra.auto ? ' autocomplete="' + extra.auto + '"' : "") + (extra.modo ? ' inputmode="' + extra.modo + '"' : "") + (extra.ayuda ? ' placeholder="' + extra.ayuda + '"' : "") + ">" +
      '<p class="campo__error" id="error-' + id + '" role="alert"></p></div>';
  }

  function dibujar() {
    var items = EC.carrito.items().filter(function (i) { return EC.producto(i.id); });

    if (items.length === 0) {
      zona.innerHTML = (mensaje ? '<p class="aviso-envio" role="status">' + mensaje + "</p>" : "") +
        '<div class="sin-productos"><p>Tu pedido está vacío. Elige al menos un plato del menú para continuar.</p>' +
        '<a class="boton boton--primario" href="' + EC.url("pages/menu.html") + '">Ver el menú</a> ' +
        '<a class="boton" href="' + EC.url("pages/mis-pedidos.html") + '">Ver mis pedidos</a></div>';
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

    var domicilio = datos.entrega === "Domicilio";
    zona.innerHTML =
      (mensaje ? '<p class="aviso-envio" role="status">' + mensaje + "</p>" : "") +
      '<div class="pedido__grid">' +
        '<section aria-labelledby="resumen-t"><h2 id="resumen-t">Resumen del pedido</h2><ul class="pedido__lista">' + filas + "</ul>" +
          '<div class="pedido__total pedido__total--lista"><span>Valor total</span><strong>' + (errorTotal ? "No disponible" : EC.precio(total)) + "</strong></div>" +
          (errorTotal ? '<p class="campo__error" role="alert">No fue posible calcular el valor total. Revisa los platos del pedido.</p>' : "") +
        "</section>" +
        '<aside class="pedido__panel" aria-labelledby="datos-t"><h2 id="datos-t">Datos del pedido</h2>' +
          campo("cliente", "Nombre completo", datos.cliente, { auto: "name" }) +
          campo("telefono", "Teléfono / celular", datos.telefono, { tipo: "tel", auto: "tel", modo: "tel", ayuda: "Ej. 300 123 4567" }) +
          campo("correo", "Correo electrónico (opcional)", datos.correo, { tipo: "email", auto: "email" }) +
          '<fieldset class="opciones"><legend>¿Cómo quieres recibir tu pedido?</legend>' +
            '<label><input type="radio" name="entrega" value="Domicilio"' + (domicilio ? " checked" : "") + "> Domicilio</label>" +
            '<label><input type="radio" name="entrega" value="Recoger en el restaurante"' + (!domicilio ? " checked" : "") + "> Recoger en el restaurante</label></fieldset>" +
          (domicilio
            ? campo("direccion", "Dirección de entrega", datos.direccion, { auto: "street-address", ayuda: "Calle / carrera, número, casa o apto" }) +
              campo("barrio", "Barrio", datos.barrio) +
              campo("indicaciones", "Indicaciones para llegar (opcional)", datos.indicaciones, { ayuda: "Ej. portón negro, piso 2" })
            : '<p class="pedido__recoger">Recógelo en ' + EC.esc(EC.restaurante.direccion) + ".</p>") +
          '<div class="campo"><label for="pago">Forma de pago</label><select id="pago">' +
            EC.formasPago.map(function (f) { return "<option" + (f === datos.pago ? " selected" : "") + ">" + f + "</option>"; }).join("") + "</select></div>" +
          '<div class="campo"><label for="nota">Observaciones (opcional)</label><textarea id="nota" rows="3">' + EC.esc(datos.nota) + "</textarea></div>" +
          '<button type="button" class="boton boton--primario" id="confirmar"' + (errorTotal ? " disabled" : "") + ">Confirmar pedido</button>" +
          '<a class="boton" href="' + EC.url("pages/menu.html") + '">Agregar más platos</a>' +
        "</aside></div>";
    mensaje = "";

    ["cliente", "telefono", "correo", "direccion", "barrio", "indicaciones", "pago", "nota"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("input", function (e) { datos[id] = e.target.value; });
    });
    zona.querySelectorAll('input[name="entrega"]').forEach(function (r) {
      r.addEventListener("change", function () { datos.entrega = r.value; dibujar(); });
    });
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
    document.getElementById("confirmar").addEventListener("click", confirmar);
  }

  /* Valida los datos de contacto y entrega. Devuelve true si todo está bien. */
  function validar() {
    var errores = {};
    if (datos.cliente.trim().length < 3) errores.cliente = "Escribe tu nombre completo.";
    var tel = datos.telefono.replace(/\D/g, "");
    if (tel.length < 7 || tel.length > 12) errores.telefono = "Escribe un teléfono válido (7 a 10 dígitos).";
    if (datos.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) errores.correo = "El correo no es válido.";
    if (datos.entrega === "Domicilio") {
      if (datos.direccion.trim().length < 5) errores.direccion = "Escribe la dirección de entrega.";
      if (!datos.barrio.trim()) errores.barrio = "Escribe el barrio.";
    }
    Object.keys(errores).forEach(function (id) { document.getElementById("error-" + id).textContent = errores[id]; });
    ["cliente", "telefono", "correo", "direccion", "barrio", "indicaciones"].forEach(function (id) {
      var e = document.getElementById("error-" + id);
      if (e && !errores[id]) e.textContent = "";
    });
    var primero = Object.keys(errores)[0];
    if (primero) document.getElementById(primero).focus();
    return !primero;
  }

  /* Pasos 5 y 6: validar y abrir la ventana de confirmación. */
  function confirmar() {
    var items = EC.carrito.items().filter(function (i) { return EC.producto(i.id); });

    var total;
    try { total = EC.pedidos.calcularTotal(items); }
    catch (e) { aviso("No fue posible calcular el total", "Revisa los platos y cantidades del pedido e inténtalo de nuevo."); return; }

    if (!validar()) return;

    /* Excepciones 1.1 y 2.1. */
    for (var k = 0; k < items.length; k++) {
      var p = EC.producto(items[k].id);
      if (!p.disponible) { aviso("El plato " + p.nombre + " ya no está disponible", "Retíralo del pedido para continuar."); return; }
      var quedan = EC.pedidos.disponibles(p.id);
      if (items[k].cantidad > quedan) { aviso("¡Cantidad no disponible!", "Solo quedan " + quedan + " unidades de " + p.nombre + ". Por favor modifícala."); return; }
    }

    var domicilio = datos.entrega === "Domicilio";
    var detalle = [["Cliente", datos.cliente.trim()], ["Teléfono", datos.telefono.trim()],
      ["Entrega", domicilio ? "Domicilio: " + datos.direccion.trim() + ", " + datos.barrio.trim() : "Recoger en el restaurante"],
      ["Forma de pago", datos.pago]].concat(items.map(function (i) {
        var pr = EC.producto(i.id);
        return [i.cantidad + " × " + pr.nombre, EC.precio(pr.precio * i.cantidad)];
      }), [["Valor total", EC.precio(total)]]);

    EC.modal.abrir({
      tipo: "ok",
      titulo: "¿Confirmas tu pedido?",
      mensaje: "Revisa los platos, los datos de entrega y el valor total antes de confirmar.",
      detalle: detalle,
      botones: [
        { texto: "Confirmar pedido", tipo: "primario", accion: function () { registrar(items); } },
        { texto: "Cancelar pedido", accion: function () { mensaje = "El pedido no se registró. Tus platos siguen en el carrito."; dibujar(); } }
      ]
    });
  }

  /* Pasos 8 y 9, y excepción 4.1. */
  function registrar(items) {
    var registro = {
      cliente: datos.cliente.trim(), telefono: datos.telefono.trim(), correo: datos.correo.trim(),
      entrega: datos.entrega, direccion: datos.entrega === "Domicilio" ? datos.direccion.trim() : "",
      barrio: datos.entrega === "Domicilio" ? datos.barrio.trim() : "", indicaciones: datos.indicaciones.trim(),
      pago: datos.pago, nota: datos.nota.trim()
    };
    var pedido = null;
    try { pedido = EC.pedidos.registrar(registro, items); } catch (e) { pedido = null; }
    if (!pedido) { aviso("No fue posible realizar el pedido", "Ocurrió un error al registrarlo. Inténtalo de nuevo."); return; }
    EC.carrito.vaciar();
    datos.nota = ""; datos.indicaciones = "";
    var enlace = EC.url("pages/mis-pedidos.html?n=" + pedido.numero);
    EC.modal.abrir({
      tipo: "ok",
      titulo: "¡Pedido realizado correctamente!",
      mensaje: "Guarda tu número de pedido: lo necesitas para consultarlo en \"Mis pedidos\".",
      detalle: [["Número de pedido", "#" + pedido.numero], ["Cliente", pedido.cliente], ["Valor total", EC.precio(pedido.total)], ["Estado", pedido.estado]],
      botones: [
        { texto: "Ver mi pedido", tipo: "primario", accion: function () { window.location.href = enlace; return false; } },
        { texto: "Aceptar" }
      ],
      alCerrar: dibujar
    });
  }

  dibujar();
})();
