/* URBANO MEN · Inicio: carrusel, nuevas prendas y conteo por color */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(n || 0));
  let prods = [];
  try { prods = JSON.parse(localStorage.getItem("ecom_products") || "[]"); } catch (e) {}
  if (!prods.length) prods = window.EcomSeed || [];

  // Carrusel principal
  const hero = $(".hero");
  if (hero) {
    const slides = $$(".slide", hero), ctrl = $(".hero-ctrl", hero);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, timer = null;
    const dots = slides.map((_, k) => {
      const d = document.createElement("button");
      d.type = "button"; d.className = "dot"; d.setAttribute("aria-label", "Ir a la diapositiva " + (k + 1));
      d.addEventListener("click", () => { go(k); play(); });
      ctrl.appendChild(d); return d;
    });
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle("on", k === i); s.inert = k !== i; s.setAttribute("aria-hidden", String(k !== i)); });
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    }
    function stop() { clearInterval(timer); timer = null; }
    function play() { stop(); if (!reduce) timer = setInterval(() => go(i + 1), 6500); }
    $(".hero-arrow.prev", hero).addEventListener("click", () => { go(i - 1); play(); });
    $(".hero-arrow.next", hero).addEventListener("click", () => { go(i + 1); play(); });
    hero.addEventListener("mouseenter", stop); hero.addEventListener("mouseleave", play);
    hero.addEventListener("focusin", stop); hero.addEventListener("focusout", play);
    let x0 = null;
    hero.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    hero.addEventListener("touchend", e => { if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); } x0 = null; play(); });
    go(0); play();
  }

  // Nuevas prendas (se leen del inventario, así los precios siempre están al día)
  const box = $("#newArrivals");
  if (box) {
    const list = prods.filter(p => p.isNew && p.stock > 0).slice(0, 4);
    box.innerHTML = list.map(p => {
      const u = "pages/catalogo/producto.html?id=" + encodeURIComponent(p.id);
      return `<article class="card"><a href="${u}" class="card-link"><div class="product-art"><img src="assets/img/${esc(p.image)}" alt="${esc(p.name)}"><span class="badge new">Nuevo</span></div><div class="card-body"><div class="meta"><h3>${esc(p.name)}</h3><span class="price">${money(p.price)}</span></div><p>${esc(p.category)} · ${esc(p.color)}</p></div></a></article>`;
    }).join("");
    if (!list.length) box.closest("section").classList.add("hidden");
  }

  // Compra por color: cantidad de prendas disponibles
  $$(".tone").forEach(t => {
    const n = prods.filter(p => p.stock > 0 && p.color === t.dataset.color).length;
    $("[data-count]", t).textContent = n === 1 ? "1 prenda" : n + " prendas";
  });
})();
