/* Consultar menú, pasos 4 a 6: productos de la categoría con foto, nombre (hipervínculo) y precio. */
(function () {
  var cat = EC.categoria(EC.params.get("c"));
  var titulo = document.getElementById("titulo");
  var zona = document.getElementById("productos");

  if (!cat) {
    EC.migas([{ texto: "Menú", href: EC.url("pages/menu.html") }, { texto: "Categoría no encontrada" }]);
    titulo.textContent = "Categoría no encontrada";
    zona.innerHTML = '<div class="sin-productos"><p>La categoría que buscas no existe. Elige una desde el menú.</p><a class="boton boton--primario" href="' + EC.url("pages/menu.html") + '">Ver categorías</a></div>';
    return;
  }

  document.title = cat.titulo + " | Embajada China";
  titulo.textContent = cat.titulo;
  EC.migas([
    { texto: "Menú", href: EC.url("pages/menu.html") },
    { texto: "Categorías", href: EC.url("pages/menu.html") },
    { texto: cat.titulo }
  ]);

  var lista = EC.productos.filter(function (p) { return p.categoria === cat.id; });

  /* Excepción 3.1: categoría sin productos. */
  if (lista.length === 0) {
    zona.innerHTML = '<div class="sin-productos"><p>Por ahora no hay productos disponibles en esta categoría.</p><a class="boton" href="' + EC.url("pages/menu.html") + '">Volver a las categorías</a></div>';
    return;
  }

  zona.className = "tarjetas";
  zona.innerHTML = lista.map(function (p) {
    var href = EC.url("pages/producto.html?id=" + p.id);
    return '<article class="tarjeta"><img src="' + EC.imagen(p, 1) + '" alt="' + EC.esc(p.nombre) + '">' +
      '<div class="tarjeta__cuerpo"><a class="tarjeta__nombre" href="' + href + '">' + EC.esc(p.nombre) + "</a>" +
      '<p class="tarjeta__precio">' + EC.precio(p.precio) + "</p></div></article>";
  }).join("");
})();
