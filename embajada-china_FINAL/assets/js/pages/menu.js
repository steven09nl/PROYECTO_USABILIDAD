/* Consultar menú, pasos 1 a 3: categorías como botones con hipervínculo en la misma ventana. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Menú" }]);
  document.getElementById("categorias").innerHTML = EC.categorias.map(function (c) {
    return '<a href="' + EC.url("pages/categoria.html?c=" + c.id) + '">' + EC.esc(c.nombre) + "</a>";
  }).join("");
})();
