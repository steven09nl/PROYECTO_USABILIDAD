/* Búsqueda de platos y categorías desde el ícono de la lupa. */
EC.busqueda = {
  abrir: function () {
    var dlg = document.getElementById("busqueda-dialogo");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "busqueda-dialogo";
      dlg.className = "busqueda";
      dlg.setAttribute("aria-label", "Buscar en el menú");
      dlg.innerHTML =
        '<div class="busqueda__caja">' +
          '<div class="busqueda__campo"><input type="search" id="busqueda-texto" placeholder="Busca un plato o categoría" aria-label="Buscar en el menú" autocomplete="off">' +
          '<button type="button" class="boton" data-cerrar>Cerrar</button></div>' +
          '<div class="busqueda__resultados" id="busqueda-resultados" aria-live="polite"></div>' +
        "</div>";
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      dlg.querySelector("[data-cerrar]").addEventListener("click", function () { dlg.close(); });
      dlg.querySelector("#busqueda-texto").addEventListener("input", function (e) { EC.busqueda.buscar(e.target.value); });
      document.body.appendChild(dlg);
    }
    dlg.showModal();
    dlg.querySelector("#busqueda-texto").focus();
    this.buscar(dlg.querySelector("#busqueda-texto").value);
  },

  buscar: function (texto) {
    var q = texto.trim().toLowerCase();
    var zona = document.getElementById("busqueda-resultados");
    if (!q) { zona.innerHTML = '<p class="busqueda__aviso">Escribe el nombre de un plato o una categoría.</p>'; return; }
    var filas = [];
    EC.categorias.forEach(function (c) {
      if (c.nombre.toLowerCase().indexOf(q) !== -1) {
        filas.push('<a href="' + EC.url("pages/categoria.html?c=" + c.id) + '"><span>Categoría: ' + EC.esc(c.nombre) + "</span></a>");
      }
    });
    EC.productos.forEach(function (p) {
      if (p.nombre.toLowerCase().indexOf(q) !== -1) {
        filas.push('<a href="' + EC.url("pages/producto.html?id=" + p.id) + '"><span>' + EC.esc(p.nombre) + "</span><strong>" + EC.precio(p.precio) + "</strong></a>");
      }
    });
    zona.innerHTML = filas.length ? filas.join("") : '<p class="busqueda__aviso">No encontramos resultados para "' + EC.esc(texto.trim()) + '".</p>';
  }
};
