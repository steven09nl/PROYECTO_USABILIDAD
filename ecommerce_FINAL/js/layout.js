/* URBANO MEN · Cabecera, menú móvil, búsqueda y pie de página compartidos */
(function () {
  const deep = location.pathname.includes("/pages/"), b = deep ? "../../" : "";
  window.ECOM_BASE = b;
  const L = {
    home: b + "index.html",
    catalog: b + "pages/catalogo/catalogo.html",
    register: b + "pages/cliente/registro.html",
    cart: b + "pages/compra/carrito.html",
    status: b + "pages/cliente/estado-pedido.html",
    products: b + "pages/vendedor/productos.html"
  };
  const cats = ["Camisetas", "Pantalones", "Chaquetas", "Bermudas"];
  const ico = {
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    user: '<circle cx="12" cy="7.5" r="3.6"/><path d="M4.8 21c.4-4.1 3.2-6.4 7.2-6.4s6.8 2.3 7.2 6.4"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    login: '<path d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4"/><path d="M14 8l4 4-4 4M18 12H9"/>',
    box: '<path d="m3.5 7.5 8.5-4 8.5 4v9l-8.5 4-8.5-4v-9Z"/><path d="m3.5 7.5 8.5 4 8.5-4M12 11.5v9"/>',
    truck: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
    cash: '<rect x="3" y="6.5" width="18" height="11" rx="1.5"/><circle cx="12" cy="12" r="2.6"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z"/>'
  };
  const svg = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ico[n]}</svg>`;
  window.EcomIcons = svg;

  let count = 0;
  try { count = JSON.parse(localStorage.getItem("ecom_cart") || "[]").reduce((s, x) => s + x.qty, 0); } catch (e) {}

  const q = new URLSearchParams(location.search), here = location.pathname;
  const cur = (href, cat) => {
    if (cat) return here.includes("catalogo.html") && q.get("cat") === cat ? ' aria-current="page"' : "";
    if (href === "offers") return q.get("ofertas") === "1" ? ' aria-current="page"' : "";
    if (href === "catalog") return here.includes("catalogo.html") && !q.get("cat") && !q.get("ofertas") ? ' aria-current="page"' : "";
    return "";
  };
  const catLinks = cats.map(c => `<a href="${L.catalog}?cat=${c}"${cur("", c)}>${c}</a>`).join("");

  const h = document.querySelector("#header");
  if (h) {
    const main = document.querySelector("main"); if (main) main.id = "contenido";
    h.innerHTML = `
<a class="skip" href="#contenido">Saltar al contenido</a>
<div class="announce" aria-live="polite"><div class="wrap announce-in">
  <span class="on">Envíos a toda Colombia</span><span>Pago contra entrega</span><span>Moda para cada ocasión</span>
</div></div>
<header class="header">
  <div class="wrap head">
    <div class="head-left">
      <button class="icon-btn menu-btn" type="button" aria-label="Abrir menú" aria-expanded="false">${svg("menu")}</button>
      <button class="search-trigger" type="button" aria-label="Buscar productos">${svg("search")}<span>Buscar productos</span></button>
    </div>
    <a class="brand" href="${L.home}" aria-label="URBANO MEN, ir al inicio"><img src="${b}assets/img/logo-um.png" alt="" width="49" height="52"><span>URBANO<small>MEN</small></span></a>
    <div class="head-tools">
      <div class="account-wrap">
        <button class="icon-btn account-button" type="button" aria-label="Cuenta" aria-expanded="false" title="Iniciar sesión o registrarse">${svg("user")}</button>
        <div class="account-menu hidden">
          <a href="${L.register}">${svg("plus")} Crear una cuenta</a>
          <button type="button" class="open-login">${svg("login")} Iniciar sesión</button>
          <a href="${L.status}">${svg("box")} Mis pedidos</a>
        </div>
      </div>
      <a class="icon-btn cart-icon" href="${L.cart}" aria-label="Carrito de compras, ${count} productos" title="Carrito">${svg("bag")}<span class="count">${count}</span></a>
    </div>
  </div>
  <nav class="nav-row" aria-label="Principal"><div class="wrap nav">
    <a href="${L.catalog}"${cur("catalog")}>Productos</a>${catLinks}
    <a href="${L.catalog}?ofertas=1"${cur("offers")}>Ofertas</a>
    <a href="${L.home}#nosotros">Nosotros</a>
  </div></nav>
</header>
<div class="drawer hidden" id="drawer">
  <div class="drawer-bg"></div>
  <aside class="drawer-panel" aria-label="Menú">
    <button class="drawer-close" type="button" aria-label="Cerrar menú">×</button>
    <div class="drawer-brand"><img src="${b}assets/img/logo-um.png" alt="" width="42" height="45"><span>URBANO MEN</span></div>
    <a href="${L.home}">Inicio</a><a href="${L.catalog}">Productos</a>${catLinks}
    <a href="${L.catalog}?ofertas=1">Ofertas</a><a href="${L.home}#nosotros">Nosotros</a>
    <hr><a href="${L.status}">Mis pedidos</a><a href="${L.register}">Crear una cuenta</a>
  </aside>
</div>`;

    // Mensaje superior: uno a la vez en pantallas pequeñas (sin animación si el usuario la desactivó)
    const msgs = [...h.querySelectorAll(".announce-in span")]; let k = 0;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInterval(() => { msgs[k].classList.remove("on"); k = (k + 1) % msgs.length; msgs[k].classList.add("on"); }, 3800);
    }

    // Menú de cuenta
    const btn = h.querySelector(".account-button"), menu = h.querySelector(".account-menu");
    btn.addEventListener("click", () => { const open = menu.classList.toggle("hidden") === false; btn.setAttribute("aria-expanded", String(open)); });
    document.addEventListener("click", e => { if (!e.target.closest(".account-wrap")) { menu.classList.add("hidden"); btn.setAttribute("aria-expanded", "false"); } });
    h.querySelector(".open-login").addEventListener("click", () => { menu.classList.add("hidden"); if (window.openLogin) window.openLogin(); else location.href = L.register; });

    // Menú móvil
    const drawer = h.querySelector("#drawer"), mb = h.querySelector(".menu-btn");
    const setDrawer = o => { drawer.classList.toggle("hidden", !o); mb.setAttribute("aria-expanded", String(o)); document.body.classList.toggle("lock", o); };
    mb.addEventListener("click", () => setDrawer(true));
    drawer.querySelector(".drawer-bg").addEventListener("click", () => setDrawer(false));
    drawer.querySelector(".drawer-close").addEventListener("click", () => setDrawer(false));
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setDrawer(false)));

    // Búsqueda
    h.querySelector(".search-trigger").addEventListener("click", () => {
      if (document.querySelector("#siteSearchDialog")) return;
      const o = document.createElement("div"); o.id = "siteSearchDialog"; o.className = "search-overlay";
      o.innerHTML = `<section class="search-dialog" role="dialog" aria-modal="true" aria-labelledby="searchTitle">
        <button type="button" class="search-close" aria-label="Cerrar">×</button>
        <p class="eyebrow">URBANO MEN</p><h2 id="searchTitle">Buscar productos</h2>
        <form id="siteSearchForm"><label for="siteSearchInput">¿Qué prenda estás buscando?</label>
          <div class="search-field"><input id="siteSearchInput" type="search" placeholder="Ej. pantalón negro, camiseta..." required><button class="btn primary" type="submit">Buscar</button></div></form>
        <div class="search-cats">${catLinks}</div></section>`;
      document.body.appendChild(o);
      const close = () => o.remove();
      o.querySelector(".search-close").onclick = close;
      o.addEventListener("click", e => { if (e.target === o) close(); });
      o.querySelector("#siteSearchForm").onsubmit = e => { e.preventDefault(); const v = o.querySelector("#siteSearchInput").value.trim(); if (v) location.href = L.catalog + "?q=" + encodeURIComponent(v); };
      o.querySelector("input").focus();
    });
    document.addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      setDrawer(false); const s = document.querySelector("#siteSearchDialog"); if (s) s.remove();
      const m = document.querySelector("#modal"); if (m) m.innerHTML = "";
    });
  }

  const f = document.querySelector("#footer");
  if (f) {
    f.innerHTML = `
<section class="newsletter"><div class="wrap news-in">
  <div><h2>Entérate de las novedades</h2><p>Déjanos tu correo y te contamos cuando llegue una nueva colección.</p></div>
  <form id="newsForm" novalidate><label class="sr" for="newsEmail">Correo electrónico</label>
    <div class="news-field"><input id="newsEmail" type="email" placeholder="Tu correo electrónico" autocomplete="email"><button class="btn gold" type="submit">Suscribirme</button></div>
    <p id="newsMsg" class="msg" role="status"></p></form>
</div></section>
<footer class="footer"><div class="wrap footer-grid">
  <div><a class="footer-logo" href="${L.home}" aria-label="URBANO MEN, ir al inicio"><img src="${b}assets/img/logo-urbano-men.png" alt="URBANO MEN, ropa masculina" width="170" height="174" loading="lazy"></a><p>Prendas esenciales para tu estilo diario.</p></div>
  <div><strong>Explora</strong><a href="${L.catalog}">Productos</a><a href="${L.register}">Crear cuenta</a><a href="${L.status}">Mis pedidos</a></div>
  <div><strong>Categorías</strong>${catLinks}</div>
  <div><strong>Atención</strong><span>Pago contra entrega</span><span>Información de pedidos</span><a href="${L.products}">Área del vendedor</a></div>
</div>
<div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} URBANO MEN · Tienda de ropa para caballero</span><span class="pay">Pago contra entrega</span></div></footer>`;
    const nf = f.querySelector("#newsForm"), nm = f.querySelector("#newsMsg");
    nf.addEventListener("submit", e => {
      e.preventDefault();
      const v = f.querySelector("#newsEmail").value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { nm.className = "msg error"; nm.textContent = "Ingresa un correo válido."; return; }
      try { const a = JSON.parse(localStorage.getItem("ecom_newsletter") || "[]"); if (!a.includes(v)) a.push(v); localStorage.setItem("ecom_newsletter", JSON.stringify(a)); } catch (er) {}
      nm.className = "msg success"; nm.textContent = "¡Listo! Te avisaremos de las novedades."; nf.reset();
    });
  }
})();
