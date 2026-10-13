/* Ventanas modales con <dialog>. */
EC.iconos = {
  ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.5 12.5 3 3 6-6.5"/></svg>',
  aviso: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 7v6M12 16.5v.5"/></svg>',
  buscar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  carrito: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 4h2.5l2 11h10l2-8H7"/><circle cx="9" cy="19.5" r="1.2"/><circle cx="17" cy="19.5" r="1.2"/></svg>'
};

EC.modal = {
  /* opciones: { tipo: "ok" | "aviso", titulo, mensaje, detalle: [[etiqueta, valor]], botones: [{texto, tipo, accion}], alCerrar } */
  abrir: function (op) {
    var dlg = document.createElement("dialog");
    dlg.className = "modal modal--" + (op.tipo || "ok");
    var idTitulo = "modal-titulo-" + Date.now();
    dlg.setAttribute("aria-labelledby", idTitulo);

    var detalle = "";
    if (op.detalle) {
      detalle = '<dl class="modal__detalle">' + op.detalle.map(function (par) {
        return "<div><dt>" + EC.esc(par[0]) + "</dt><dd>" + EC.esc(par[1]) + "</dd></div>";
      }).join("") + "</dl>";
    }

    dlg.innerHTML =
      '<div class="modal__caja">' +
        '<button type="button" class="modal__cerrar" aria-label="Cerrar ventana">&times;</button>' +
        '<div class="modal__icono">' + (op.tipo === "aviso" ? EC.iconos.aviso : EC.iconos.ok) + "</div>" +
        '<h2 class="modal__titulo" id="' + idTitulo + '">' + EC.esc(op.titulo) + "</h2>" +
        (op.mensaje ? "<p>" + EC.esc(op.mensaje) + "</p>" : "") +
        detalle +
        '<div class="modal__cuerpo"></div>' +
        '<div class="modal__botones"></div>' +
      "</div>";

    var cuerpo = dlg.querySelector(".modal__cuerpo");
    if (op.cuerpo) cuerpo.appendChild(op.cuerpo); else cuerpo.remove();
    var zona = dlg.querySelector(".modal__botones");
    (op.botones || []).forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "boton" + (b.tipo === "primario" ? " boton--primario" : "");
      btn.textContent = b.texto;
      btn.addEventListener("click", function () {
        var seguir = b.accion ? b.accion() : true;
        if (seguir !== false) dlg.close();
      });
      zona.appendChild(btn);
    });

    dlg.querySelector(".modal__cerrar").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () {
      dlg.remove();
      if (op.alCerrar) op.alCerrar();
    });

    document.body.appendChild(dlg);
    dlg.showModal();
    return dlg;
  }
};
