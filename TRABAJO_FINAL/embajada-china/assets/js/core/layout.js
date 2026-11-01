/* Cabecera, navegación y pie compartidos por todas las páginas. */
(function () {
  var actual = document.body.dataset.nav || "";
  var enlaces = [
    { id: "inicio", texto: "Inicio", href: "index.html", sub: [
      { texto: "Categorías del menú", href: "index.html#categorias-inicio" },
      { texto: "Platos recomendados", href: "index.html#recomendados-seccion" } ] },
    { id: "menu", texto: "Menú", href: "pages/menu.html", sub: [{ texto: "Ver todo el menú", href: "pages/menu.html" }].concat(
      EC.categorias.map(function (c) { return { texto: c.nombre, href: "pages/categoria.html?c=" + c.id }; })) },
    { id: "reservas", texto: "Reservas", href: "pages/reservas.html", sub: [
      { texto: "Realizar reserva", href: "pages/reservas.html" },
      { texto: "Horarios de atención", href: "pages/contacto.html#datos" } ] },
    { id: "contacto", texto: "Contacto", href: "pages/contacto.html", sub: [
      { texto: "Dirección y teléfono", href: "pages/contacto.html#datos" },
      { texto: "Enviar un mensaje", href: "pages/contacto.html#form-contacto" } ] },
    { id: "pedidos", texto: "Mis pedidos", href: "pages/mis-pedidos.html", sub: [
      { texto: "Consultar mi pedido", href: "pages/mis-pedidos.html" },
      { texto: "Realizar un pedido", href: "pages/pedido.html" } ] }
  ];

  var nav = enlaces.map(function (e) {
    var sub = e.sub.map(function (x) { return '<li><a href="' + EC.url(x.href) + '">' + x.texto + "</a></li>"; }).join("");
    return '<li class="nav__item nav__item--sub"><a href="' + EC.url(e.href) + '"' + (e.id === actual ? ' aria-current="page"' : "") + ">" + e.texto + "</a>" +
      '<button type="button" class="nav__caret" aria-label="Mostrar opciones de ' + e.texto + '" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>' +
      '<ul class="submenu">' + sub + "</ul></li>";
  }).join("");

  document.getElementById("site-header").outerHTML =
    '<header class="cabecera">' +
      '<div class="contenedor cabecera__fila">' +
        '<a class="marca" href="' + EC.url("index.html") + '"><img class="marca__logo" src="' + EC.url("assets/img/logo.png") + '" alt="" width="56" height="56"><span class="marca__nombre">Embajada China</span></a>' +
        '<nav class="nav" id="nav-principal" aria-label="Principal"><ul>' + nav + "</ul></nav>" +
        '<div class="cabecera__acciones">' +
          '<button type="button" class="icono-btn" data-accion="buscar" aria-label="Buscar en el menú">' + EC.iconos.buscar + "</button>" +
          '<button type="button" class="icono-btn" data-accion="carrito" aria-label="Abrir carrito">' + EC.iconos.carrito +
            '<span class="insignia" data-carrito-cuenta hidden>0</span></button>' +
          '<button type="button" class="icono-btn menu-btn" aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="nav-principal">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
        "</div>" +
      "</div>" +
    "</header>";

  var r = EC.restaurante;
  document.getElementById("site-footer").outerHTML =
    '<footer class="pie">' +
      '<div class="contenedor pie__columnas">' +
        '<div><div class="pie__marca"><img src="' + EC.url("assets/img/logo.png") + '" alt="" width="72" height="72">Embajada China</div>' +
          '<div class="pie__enlaces"><a href="' + EC.url("pages/menu.html") + '">Menú</a><a href="' + EC.url("pages/reservas.html") + '">Reservas</a><a href="' + EC.url("pages/contacto.html") + '">Contacto</a><a href="' + EC.url("pages/vendedor.html") + '">Acceso vendedor</a></div></div>' +
        "<div><h2>Llámanos</h2><p>" + EC.esc(r.telefono) + "<br>WhatsApp " + EC.esc(r.whatsapp) + "</p></div>" +
        "<div><h2>Dirección</h2><p>" + EC.esc(r.direccion) + "</p></div>" +
        "<div><h2>Horario</h2><p>" + r.horario.map(EC.esc).join("<br>") + "</p></div>" +
      "</div>" +
      '<div class="pie__derechos">Embajada China | Derechos reservados &copy; ' + new Date().getFullYear() + "</div>" +
    "</footer>";

  document.querySelector('[data-accion="buscar"]').addEventListener("click", function () { EC.busqueda.abrir(); });
  document.querySelector('[data-accion="carrito"]').addEventListener("click", function () { EC.carrito.abrir(); });
  document.querySelectorAll(".nav__caret").forEach(function (c) {
    c.addEventListener("click", function () {
      var item = c.parentElement;
      var abierto = item.classList.toggle("nav__item--abierto");
      c.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  });
  var btn = document.querySelector(".menu-btn");
  btn.addEventListener("click", function () {
    var abierto = document.getElementById("nav-principal").classList.toggle("nav--abierto");
    btn.setAttribute("aria-expanded", abierto ? "true" : "false");
  });
  EC.carrito.actualizarCuenta();
})();
