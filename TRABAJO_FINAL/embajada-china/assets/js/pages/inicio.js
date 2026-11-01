/* Inicio: categorías y platos recomendados. */
(function () {
  document.getElementById("cinta-categorias").innerHTML = EC.categorias.map(function (c) {
    return '<a href="' + EC.url("pages/categoria.html?c=" + c.id) + '">' + EC.esc(c.nombre) + "</a>";
  }).join("");

  var destacados = ["arroz-chino-especial", "chau-mien-especial", "pollo-agridulce", "curry-pollo"];
  document.getElementById("recomendados").innerHTML = destacados.map(EC.producto).filter(Boolean).map(function (p) {
    var href = EC.url("pages/producto.html?id=" + p.id);
    return '<article class="tarjeta"><img src="' + EC.imagen(p, 1) + '" alt="' + EC.esc(p.nombre) + '">' +
      '<div class="tarjeta__cuerpo"><a class="tarjeta__nombre" href="' + href + '">' + EC.esc(p.nombre) + "</a>" +
      '<p class="tarjeta__precio">' + EC.precio(p.precio) + '</p><p class="tarjeta__texto">' + EC.esc(p.descripcion) + "</p></div></article>";
  }).join("");
})();
