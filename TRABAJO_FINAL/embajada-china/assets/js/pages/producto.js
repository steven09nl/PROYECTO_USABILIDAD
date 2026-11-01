/* Consultar menú, pasos 7 a 9, y ventanas modales de confirmación y disponibilidad. */
(function () {
  var p = EC.producto(EC.params.get("id"));
  var zona = document.getElementById("detalle");

  if (!p) {
    EC.migas([{ texto: "Menú", href: EC.url("pages/menu.html") }, { texto: "Producto no encontrado" }]);
    document.getElementById("titulo").textContent = "Producto no encontrado";
    zona.innerHTML = '<div class="sin-productos"><p>El producto que buscas no existe. Elige uno desde el menú.</p><a class="boton boton--primario" href="' + EC.url("pages/menu.html") + '">Ir al menú</a></div>';
    return;
  }

  var cat = EC.categoria(p.categoria);
  document.title = p.nombre + " | Embajada China";
  document.getElementById("titulo").textContent = p.nombre;
  EC.migas([
    { texto: "Menú", href: EC.url("pages/menu.html") },
    { texto: "Categorías", href: EC.url("pages/menu.html") },
    { texto: cat.titulo, href: EC.url("pages/categoria.html?c=" + cat.id) },
    { texto: p.nombre }
  ]);

  zona.innerHTML =
    '<div class="galeria"><img class="galeria__principal" id="foto-principal" src="' + EC.imagen(p, 1) + '" alt="Foto de ' + EC.esc(p.nombre) + '">' +
      '<div class="galeria__miniaturas" id="miniaturas" hidden></div></div>' +
    "<div>" +
      '<p class="detalle__categoria">' + EC.esc(cat.titulo) + "</p>" +
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

  /* Miniaturas: aparecen solo si existen fotos adicionales (<id>-2.jpg, <id>-3.jpg...). */
  var minis = document.getElementById("miniaturas");
  var principal = document.getElementById("foto-principal");
  function agregarMiniatura(url) {
    minis.hidden = false;
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Ver otra foto");
    b.innerHTML = '<img src="' + url + '" alt="">';
    b.addEventListener("click", function () {
      principal.src = url;
      minis.querySelectorAll("button").forEach(function (o) { o.removeAttribute("aria-current"); });
      b.setAttribute("aria-current", "true");
    });
    minis.appendChild(b);
  }
  [2, 3].forEach(function (n) {
    ["jpg", "png", "webp"].forEach(function (ext) {
      var url = EC.url("assets/img/fotos/" + p.id + "-" + n + "." + ext);
      var prueba = new Image();
      prueba.onload = function () {
        if (minis.hidden) { agregarMiniatura(EC.imagen(p, 1)); minis.firstChild.setAttribute("aria-current", "true"); }
        agregarMiniatura(url);
      };
      prueba.src = url;
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
