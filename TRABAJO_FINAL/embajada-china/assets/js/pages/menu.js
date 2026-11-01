/* Consultar menú, pasos 1 a 3: categorías como botones con hipervínculo en la misma ventana. */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Menú" }]);
  document.getElementById("categorias").innerHTML = EC.categorias.map(function (c) {
    var deCategoria = EC.productos.filter(function (p) { return p.categoria === c.id; });
    var muestra = deCategoria.find(function (p) { return p.foto; }) || deCategoria[0];
    return '<a href="' + EC.url("pages/categoria.html?c=" + c.id) + '">' +
      (muestra ? '<img src="' + EC.imagen(muestra, 1) + '" alt="">' : "") +
      "<span>" + EC.esc(c.nombre) + "</span></a>";
  }).join("");
})();
