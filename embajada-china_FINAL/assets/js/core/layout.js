/* Cabecera, navegación y pie compartidos por todas las páginas. */
(function () {
  var actual = document.body.dataset.nav || "";
  var enlaces = [
    { id: "inicio", texto: "Inicio", href: "index.html" },
    { id: "menu", texto: "Menú", href: "pages/menu.html" },
    { id: "reservas", texto: "Reservas", href: "pages/reservas.html" },
    { id: "contacto", texto: "Contacto", href: "pages/contacto.html" }
  ];

  var nav = enlaces.map(function (e) {
    return '<li><a href="' + EC.url(e.href) + '"' + (e.id === actual ? ' aria-current="page"' : "") + ">" + e.texto + "</a></li>";
  }).join("");

  document.getElementById("site-header").outerHTML =
    '<header class="cabecera">' +
      '<div class="contenedor cabecera__fila">' +
        '<a class="marca" href="' + EC.url("index.html") + '"><span class="sello" aria-hidden="true">EC</span><span class="marca__nombre">Embajada China</span></a>' +
        '<div class="cabecera__acciones">' +
          '<button type="button" class="icono-btn" data-accion="buscar" aria-label="Buscar en el menú">' + EC.iconos.buscar + "</button>" +
          '<button type="button" class="icono-btn" data-accion="carrito" aria-label="Abrir carrito">' + EC.iconos.carrito +
            '<span class="insignia" data-carrito-cuenta hidden>0</span></button>' +
        "</div>" +
      "</div>" +
      '<nav class="nav" aria-label="Principal"><div class="contenedor"><ul>' + nav + "</ul></div></nav>" +
    "</header>";

  document.getElementById("site-footer").outerHTML =
    '<footer class="pie"><div class="contenedor pie__fila">' +
      "<span>Embajada China</span>" +
      '<span><a href="' + EC.url("pages/menu.html") + '">Menú</a> &nbsp;|&nbsp; <a href="' + EC.url("pages/reservas.html") + '">Reservas</a> &nbsp;|&nbsp; <a href="' + EC.url("pages/contacto.html") + '">Contacto</a> &nbsp;|&nbsp; <a href="' + EC.url("pages/vendedor.html") + '">Acceso vendedor</a></span>' +
    "</div></footer>";

  document.querySelector('[data-accion="buscar"]').addEventListener("click", function () { EC.busqueda.abrir(); });
  document.querySelector('[data-accion="carrito"]').addEventListener("click", function () { EC.carrito.abrir(); });
  EC.carrito.actualizarCuenta();
})();
