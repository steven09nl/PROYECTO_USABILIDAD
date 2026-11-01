/* Inicio: franja de categorías. */
(function () {
  var zona = document.getElementById("cinta-categorias");
  zona.innerHTML = EC.categorias.map(function (c) {
    return '<a href="' + EC.url("pages/categoria.html?c=" + c.id) + '">' + EC.esc(c.nombre) + "</a>";
  }).join("");
})();
