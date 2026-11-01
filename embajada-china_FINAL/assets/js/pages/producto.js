/* Consultar menú, pasos 7 a 9, y ventanas modales de confirmación y disponibilidad. */
(function () {
  var p = EC.producto(EC.params.get("id"));
  var zona = document.getElementById("detalle");

  if (!p) {
    EC.migas([{ texto: "Menú", href: EC.url("pages/menu.html") }, { texto: "Producto no encontrado" }]);
    zona.innerHTML = '<div class="sin-productos"><p>El producto que buscas no existe. Elige uno desde el menú.</p><a class="boton boton--primario" href="' + EC.url("pages/menu.html") + '">Ir al menú</a></div>';
    return;
  }

  var cat = EC.categoria(p.categoria);
  document.title = p.nombre + " | Embajada China";
  EC.migas([
    { texto: "Menú", href: EC.url("pages/menu.html") },
    { texto: "Categorías", href: EC.url("pages/menu.html") },
    { texto: cat.titulo, href: EC.url("pages/categoria.html?c=" + cat.id) },
    { texto: p.nombre }
  ]);

  var miniaturas = [1, 2, 3].map(function (n) {
    return '<button type="button" data-foto="' + n + '" aria-label="Ver foto ' + n + '"' + (n === 1 ? ' aria-current="true"' : "") + '><img src="' + EC.imagen(p, n) + '" alt=""></button>';
  }).join("");

  zona.innerHTML =
    '<div class="galeria"><img class="galeria__principal" id="foto-principal" src="' + EC.imagen(p, 1) + '" alt="Foto de ' + EC.esc(p.nombre) + '">' +
      '<div class="galeria__miniaturas">' + miniaturas + "</div></div>" +
    "<div>" +
      "<h1>" + EC.esc(p.nombre) + "</h1>" +
      '<p class="detalle__precio">' + EC.precio(p.precio) + "</p>" +
      '<div class="detalle__cantidad"><p id="cantidad-etiqueta">Cantidad</p>' +
        '<div class="selector-cantidad" role="group" aria-labelledby="cantidad-etiqueta">' +
          '<button type="button" id="menos" aria-label="Disminuir cantidad">&minus;</button>' +
          '<output id="cantidad" aria-live="polite">1</output>' +
          '<button type="button" id="mas" aria-label="Aumentar cantidad">+</button></div></div>' +
      '<button type="button" class="boton boton--jade" id="agregar">Agregar al carro</button>' +
      '<div class="detalle__descripcion"><h2>Descripción</h2><p>' + EC.esc(p.descripcion) + "</p></div>" +
    "</div>";

  var cantidad = 1;
  var salida = document.getElementById("cantidad");
  document.getElementById("menos").addEventListener("click", function () { cantidad = Math.max(1, cantidad - 1); salida.textContent = cantidad; });
  document.getElementById("mas").addEventListener("click", function () { cantidad = Math.min(20, cantidad + 1); salida.textContent = cantidad; });

  zona.querySelectorAll("[data-foto]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.getElementById("foto-principal").src = EC.imagen(p, b.dataset.foto);
      zona.querySelectorAll("[data-foto]").forEach(function (o) { o.removeAttribute("aria-current"); });
      b.setAttribute("aria-current", "true");
    });
  });

  document.getElementById("agregar").addEventListener("click", function () {
    /* Excepción 7.1: producto no disponible. */
    if (!p.disponible) {
      EC.modal.abrir({
        tipo: "aviso",
        titulo: "¡El producto no se encuentra disponible!",
        botones: [{ texto: "Aceptar", tipo: "primario" }]
      });
      return;
    }
    /* Cantidad solicitada mayor a las existencias del día. */
    var quedan = EC.pedidos.disponibles(p.id) - EC.carrito.enCarrito(p.id);
    if (cantidad > quedan) {
      EC.modal.abrir({
        tipo: "aviso",
        titulo: "¡Cantidad no disponible!",
        mensaje: quedan > 0 ? "Solo puedes agregar " + quedan + " unidades más de " + p.nombre + ". Por favor modifica la cantidad." : "Ya no quedan unidades de " + p.nombre + " para hoy.",
        botones: [{ texto: "Aceptar", tipo: "primario" }]
      });
      return;
    }
    EC.carrito.agregar(p.id, cantidad);
    EC.modal.abrir({
      tipo: "ok",
      titulo: "¡Producto agregado al carrito!",
      mensaje: cantidad + " × " + p.nombre,
      botones: [
        { texto: "Seguir comprando" },
        { texto: "Ver carrito", tipo: "primario", accion: function () { setTimeout(function () { EC.carrito.abrir(); }, 0); } }
      ]
    });
  });
})();
