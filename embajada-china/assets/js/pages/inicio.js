/* Inicio: categorías y carrusel de platos recomendados. */
(function () {
  document.getElementById("cinta-categorias").innerHTML = EC.categorias.map(function (c) {
    return '<a href="' + EC.url("pages/categoria.html?c=" + c.id) + '">' + EC.esc(c.nombre) + "</a>";
  }).join("");

  var destacados = ["6-gozas", "arroz-chino-especial", "chop-suey-mixto", "lomin-res", "curry-pollo", "camarones-con-vegetales", "cerdo-agridulce", "mariscos-mixtos"];
  var pista = document.getElementById("recomendados");
  pista.innerHTML = destacados.map(EC.producto).filter(Boolean).map(function (p) {
    var href = EC.url("pages/producto.html?id=" + p.id);
    return '<article class="tarjeta tarjeta--carrusel"><img src="' + EC.imagen(p, 1) + '" alt="' + EC.esc(p.nombre) + '">' +
      '<div class="tarjeta__cuerpo"><h3 class="tarjeta__nombre tarjeta__nombre--grande"><a href="' + href + '">' + EC.esc(p.nombre) + "</a></h3>" +
      '<p class="tarjeta__precio tarjeta__precio--grande">' + EC.precio(p.precio) + '</p><p class="tarjeta__texto">' + EC.esc(p.descripcion) + "</p>" +
      '<a class="boton boton--primario" href="' + href + '">Ver plato</a></div></article>';
  }).join("");

  /* Carrusel: botones, puntos y avance automático (se pausa al pasar el cursor o enfocar). */
  var tarjetas = pista.querySelectorAll(".tarjeta");
  var puntos = document.getElementById("car-puntos");
  var pausado = false;
  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function paso() {
    var t = tarjetas[0];
    return t ? t.getBoundingClientRect().width + parseFloat(getComputedStyle(pista).columnGap || 24) : 0;
  }
  function indice() { return Math.round(pista.scrollLeft / (paso() || 1)); }
  function ir(i) { pista.scrollTo({ left: i * paso(), behavior: reducido ? "auto" : "smooth" }); }
  function maximo() { return Math.max(0, Math.round((pista.scrollWidth - pista.clientWidth) / (paso() || 1))); }
  function siguiente() { var i = indice(); ir(i >= maximo() ? 0 : i + 1); }
  function anterior() { var i = indice(); ir(i <= 0 ? maximo() : i - 1); }

  puntos.innerHTML = Array.prototype.map.call(tarjetas, function (t, i) {
    return '<button type="button" aria-label="Ir al plato ' + (i + 1) + '" data-i="' + i + '"></button>';
  }).join("");
  puntos.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) ir(Math.min(Number(b.dataset.i), maximo())); });
  function marcar() {
    var i = Math.min(indice(), maximo());
    puntos.querySelectorAll("button").forEach(function (b, k) { if (k === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
  }
  pista.addEventListener("scroll", marcar, { passive: true });
  window.addEventListener("resize", marcar);
  document.getElementById("car-sig").addEventListener("click", siguiente);
  document.getElementById("car-ant").addEventListener("click", anterior);
  pista.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); siguiente(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); anterior(); }
  });
  var caja = pista.closest(".carrusel");
  ["mouseenter", "focusin", "touchstart"].forEach(function (ev) { caja.addEventListener(ev, function () { pausado = true; }, { passive: true }); });
  ["mouseleave", "focusout"].forEach(function (ev) { caja.addEventListener(ev, function () { pausado = false; }); });
  if (!reducido) setInterval(function () { if (!pausado && !document.hidden) siguiente(); }, 5000);
  marcar();
})();
