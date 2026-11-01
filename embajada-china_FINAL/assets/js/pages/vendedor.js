/* Gestionar pedidos (vendedor): acceso, consulta y actualización de estado. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Gestionar pedidos" }]);

  var SESION = "ec.vendedor";
  var acceso = document.getElementById("acceso");
  var modulo = document.getElementById("modulo");
  var lista = document.getElementById("lista-pedidos");
  var detalle = document.getElementById("detalle-pedido");
  var fNumero = document.getElementById("f-numero");
  var fCliente = document.getElementById("f-cliente");
  var fEstado = document.getElementById("f-estado");
  var seleccionado = null;

  function haySesion() { try { return window.sessionStorage.getItem(SESION) === "1"; } catch (e) { return false; } }
  function aviso(titulo, texto) { EC.modal.abrir({ tipo: "aviso", titulo: titulo, mensaje: texto, botones: [{ texto: "Aceptar", tipo: "primario" }] }); }
  function claseEstado(e) { return "estado estado--" + e.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

  fEstado.innerHTML = '<option value="">Todos</option>' + EC.estadosPedido.map(function (e) { return "<option>" + e + "</option>"; }).join("");

  function mostrar() {
    var ok = haySesion();
    acceso.hidden = ok;
    modulo.hidden = !ok;
    if (ok) listar();
  }

  document.getElementById("form-acceso").addEventListener("submit", function (e) {
    e.preventDefault();
    var u = document.getElementById("usuario").value.trim();
    var c = document.getElementById("clave").value;
    var error = document.getElementById("error-acceso");
    if (u === EC.vendedor.usuario && c === EC.vendedor.clave) {
      try { window.sessionStorage.setItem(SESION, "1"); } catch (err) {}
      error.textContent = "";
      mostrar();
    } else {
      error.textContent = "Usuario o contraseña incorrectos.";
    }
  });
  document.getElementById("salir").addEventListener("click", function () {
    try { window.sessionStorage.removeItem(SESION); } catch (e) {}
    seleccionado = null;
    mostrar();
  });
  [fNumero, fCliente, fEstado].forEach(function (c) { c.addEventListener("input", listar); });

  /* Consultar, pasos 2 a 5. */
  function listar() {
    var todos = EC.pedidos.todos();
    if (todos.length === 0) {
      lista.innerHTML = '<div class="sin-productos"><p>No hay pedidos registrados.</p></div>';
      detalle.innerHTML = "";
      return;
    }
    var num = fNumero.value.trim().replace("#", "");
    var cli = fCliente.value.trim().toLowerCase();
    var est = fEstado.value;
    var filtrados = todos.filter(function (p) {
      return (!num || String(p.numero).indexOf(num) !== -1) &&
        (!cli || p.cliente.toLowerCase().indexOf(cli) !== -1) &&
        (!est || p.estado === est);
    }).sort(function (a, b) { return b.numero - a.numero; });

    if (filtrados.length === 0) {
      lista.innerHTML = '<div class="sin-productos"><p>El pedido no fue encontrado. Revisa el número, el cliente o el estado.</p></div>';
    } else {
      lista.innerHTML = '<table class="tabla"><thead><tr><th scope="col">Pedido</th><th scope="col">Cliente</th><th scope="col">Hora</th><th scope="col">Total</th><th scope="col">Estado</th></tr></thead><tbody>' +
        filtrados.map(function (p) {
          return '<tr class="' + (p.numero === seleccionado ? "tabla__fila--activa" : "") + '"><th scope="row"><button type="button" class="enlace-boton tabla__boton" data-numero="' + p.numero + '">#' + p.numero + "</button></th>" +
            "<td>" + EC.esc(p.cliente) + "</td><td>" + EC.esc(p.hora) + "</td><td>" + EC.precio(p.total) + '</td><td><span class="' + claseEstado(p.estado) + '">' + p.estado + "</span></td></tr>";
        }).join("") + "</tbody></table>";
      lista.querySelectorAll("[data-numero]").forEach(function (b) {
        b.addEventListener("click", function () { seleccionado = Number(b.dataset.numero); listar(); detalle.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
      });
    }
    verDetalle();
  }

  function verDetalle() {
    if (seleccionado === null) { detalle.innerHTML = '<p class="busqueda__aviso">Selecciona un pedido para ver sus platos, cantidades y estado.</p>'; return; }
    var p = EC.pedidos.todos().find(function (x) { return x.numero === seleccionado; });
    /* Excepción 2.1: pedido inexistente. */
    if (!p) { detalle.innerHTML = '<p class="campo__error" role="alert">El pedido no fue encontrado.</p>'; return; }
    detalle.innerHTML =
      '<h3>Pedido #' + p.numero + ' <span class="' + claseEstado(p.estado) + '">' + p.estado + "</span></h3>" +
      '<dl class="detalle-pedido__datos"><div><dt>Cliente</dt><dd>' + EC.esc(p.cliente) + "</dd></div><div><dt>Fecha</dt><dd>" + EC.fechaLarga(p.fecha) + " " + EC.esc(p.hora) + "</dd></div>" +
      (p.nota ? "<div><dt>Observaciones</dt><dd>" + EC.esc(p.nota) + "</dd></div>" : "") + "</dl>" +
      '<ul class="detalle-pedido__items">' + p.items.map(function (i) {
        return "<li><span>" + i.cantidad + " × " + EC.esc(i.nombre) + "</span><span>" + EC.precio(i.precio * i.cantidad) + "</span></li>";
      }).join("") + "</ul>" +
      '<p class="detalle-pedido__total"><span>Total</span><strong>' + EC.precio(p.total) + "</strong></p>" +
      '<button type="button" class="boton boton--primario" id="actualizar">Actualizar estado</button>';
    document.getElementById("actualizar").addEventListener("click", function () { actualizar(p); });
  }

  /* Actualizar, pasos 3 a 9, ramas y excepciones. */
  function actualizar(p) {
    /* Excepción 1.1: el pedido no puede modificarse. */
    if (p.estado === "Listo") { aviso("El pedido no puede modificarse", "El pedido #" + p.numero + " ya está listo y no admite más cambios."); return; }

    var cuerpo = document.createElement("fieldset");
    cuerpo.className = "estados";
    cuerpo.innerHTML = '<legend class="solo-lectores">Estados disponibles</legend>' + EC.estadosPedido.map(function (e, k) {
      return '<div class="mesa"><input type="radio" name="estado" id="estado-' + k + '" value="' + e + '"><label for="estado-' + k + '"><span class="mesa__nombre">' + e + "</span>" +
        (e === p.estado ? '<span class="mesa__estado">Estado actual</span>' : "") + "</label></div>";
    }).join("") + '<p class="campo__error" role="alert"></p>';

    EC.modal.abrir({
      tipo: "ok",
      titulo: "Actualizar estado",
      mensaje: "Pedido #" + p.numero + ". Elige el nuevo estado.",
      cuerpo: cuerpo,
      botones: [
        { texto: "Confirmar cambio", tipo: "primario", accion: function () {
          var sel = cuerpo.querySelector("input:checked");
          var error = cuerpo.querySelector(".campo__error");
          /* Excepción 2.1: estado no válido. */
          if (!sel || sel.value === p.estado || EC.estadosPedido.indexOf(sel.value) === -1) {
            error.textContent = "El estado seleccionado no es válido. Selecciona otro.";
            return false;
          }
          /* Excepción 3.1: error al guardar. */
          if (!EC.pedidos.cambiarEstado(p.numero, sel.value)) { aviso("No fue posible actualizar", "La actualización no fue realizada."); return true; }
          var nuevo = sel.value;
          listar();
          EC.modal.abrir({ tipo: "ok", titulo: "¡Estado actualizado!", mensaje: "El pedido #" + p.numero + " ahora está en estado " + nuevo + ".", botones: [{ texto: "Aceptar", tipo: "primario" }] });
          return true;
        } },
        { texto: "Cancelar actualización" }
      ]
    });
  }

  mostrar();
})();
