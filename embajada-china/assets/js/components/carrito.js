/* Carrito de compras: datos + ventana emergente lateral. */
EC.carrito = {
  clave: "ec.carrito",
  items: function () { return EC.almacen.leer(this.clave, []); },
  guardar: function (items) { EC.almacen.guardar(this.clave, items); this.actualizarCuenta(); },

  agregar: function (id, cantidad) {
    var items = this.items();
    var existente = items.find(function (i) { return i.id === id; });
    if (existente) existente.cantidad += cantidad;
    else items.push({ id: id, cantidad: cantidad });
    this.guardar(items);
  },
  enCarrito: function (id) {
    var it = this.items().find(function (i) { return i.id === id; });
    return it ? it.cantidad : 0;
  },
  /* Devuelve false si la nueva cantidad supera las existencias del día. */
  cambiarCantidad: function (id, delta) {
    var items = this.items();
    var it = items.find(function (i) { return i.id === id; });
    if (!it) return true;
    var nueva = Math.max(1, it.cantidad + delta);
    if (delta > 0 && nueva > EC.pedidos.disponibles(id)) return false;
    it.cantidad = nueva;
    this.guardar(items);
    return true;
  },
  quitar: function (id) {
    this.guardar(this.items().filter(function (i) { return i.id !== id; }));
  },
  vaciar: function () { this.guardar([]); },

  total: function () {
    return this.items().reduce(function (suma, i) {
      var p = EC.producto(i.id);
      return suma + (p ? p.precio * i.cantidad : 0);
    }, 0);
  },
  cuenta: function () {
    return this.items().reduce(function (s, i) { return s + i.cantidad; }, 0);
  },
  actualizarCuenta: function () {
    var n = this.cuenta();
    document.querySelectorAll("[data-carrito-cuenta]").forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
  },

  abrir: function () {
    var self = this;
    var dlg = document.getElementById("carrito-dialogo");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "carrito-dialogo";
      dlg.className = "carrito";
      dlg.setAttribute("aria-labelledby", "carrito-titulo");
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    this.dibujar(dlg);
    if (!dlg.open) dlg.showModal();
  },

  dibujar: function (dlg) {
    var self = this;
    var items = this.items().filter(function (i) { return EC.producto(i.id); });
    var lista = items.length === 0
      ? '<p class="carrito__vacio">Tu carrito está vacío. Agrega platos desde el menú.</p>'
      : items.map(function (i) {
          var p = EC.producto(i.id);
          return '<div class="carrito__item" data-id="' + p.id + '">' +
            '<img src="' + EC.imagen(p, 1) + '" alt="">' +
            "<div><h3>" + EC.esc(p.nombre) + "</h3>" +
            '<div class="carrito__fila"><div class="selector-cantidad selector-cantidad--pequeno">' +
              '<button type="button" data-delta="-1" aria-label="Quitar una unidad de ' + EC.esc(p.nombre) + '">&minus;</button>' +
              "<output>" + i.cantidad + "</output>" +
              '<button type="button" data-delta="1" aria-label="Agregar una unidad de ' + EC.esc(p.nombre) + '">+</button></div>' +
              "<strong>" + EC.precio(p.precio * i.cantidad) + "</strong></div>" +
            '<button type="button" class="enlace-boton" data-quitar>Quitar del carrito</button></div></div>';
        }).join("");

    dlg.innerHTML =
      '<div class="carrito__caja">' +
        '<div class="carrito__cabecera"><h2 id="carrito-titulo">Tu carrito</h2>' +
        '<button type="button" class="modal__cerrar" style="position:static" data-cerrar aria-label="Cerrar carrito">&times;</button></div>' +
        '<div class="carrito__lista">' + lista + "</div>" +
        '<div class="carrito__pie"><div class="carrito__total"><span>Total</span><span>' + EC.precio(this.total()) + "</span></div>" +
        '<div class="modal__botones">' +
        (items.length ? '<a class="boton boton--primario" href="' + EC.url("pages/pedido.html") + '">Realizar pedido</a>' : "") +
        '<button type="button" class="boton" data-seguir>Seguir comprando</button>' +
        (items.length ? '<button type="button" class="boton" data-vaciar>Vaciar carrito</button>' : "") +
        "</div></div></div>";

    dlg.querySelector("[data-cerrar]").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector("[data-seguir]").addEventListener("click", function () { dlg.close(); });
    var vaciar = dlg.querySelector("[data-vaciar]");
    if (vaciar) vaciar.addEventListener("click", function () { self.vaciar(); self.dibujar(dlg); });
    dlg.querySelectorAll(".carrito__item").forEach(function (fila) {
      var id = fila.dataset.id;
      fila.querySelectorAll("[data-delta]").forEach(function (b) {
        b.addEventListener("click", function () { if (!self.cambiarCantidad(id, Number(b.dataset.delta))) {
          EC.modal.abrir({ tipo: "aviso", titulo: "¡Cantidad no disponible!", mensaje: "Solo quedan " + EC.pedidos.disponibles(id) + " unidades de " + EC.producto(id).nombre + ". Por favor modifícala." });
        }
        self.dibujar(dlg); });
      });
      fila.querySelector("[data-quitar]").addEventListener("click", function () { self.quitar(id); self.dibujar(dlg); });
    });
  }
};
