/* Utilidades compartidas. Todo el sitio cuelga del objeto global EC. */
window.EC = window.EC || {};

EC.root = document.body.dataset.root || "";
EC.url = function (ruta) { return EC.root + ruta; };
EC.params = new URLSearchParams(window.location.search);

EC.esc = function (texto) {
  return String(texto).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

EC.precio = function (n) { return "$" + Number(n).toLocaleString("es-CO"); };

EC.imagen = function (producto, n) {
  return EC.url("assets/img/productos/" + producto.id + "-" + (n || 1) + ".svg");
};

EC.fechaLarga = function (iso) {
  var p = iso.split("-");
  return p[2] + "/" + p[1] + "/" + p[0];
};

EC.hoyISO = function () {
  var d = new Date();
  var mes = String(d.getMonth() + 1).padStart(2, "0");
  var dia = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + mes + "-" + dia;
};

EC.categoria = function (id) {
  return EC.categorias.find(function (c) { return c.id === id; });
};
EC.producto = function (id) {
  return EC.productos.find(function (p) { return p.id === id; });
};

EC.migas = function (items) {
  var html = items.map(function (it, i) {
    var ultimo = i === items.length - 1;
    return ultimo
      ? '<li><span aria-current="page">' + EC.esc(it.texto) + "</span></li>"
      : '<li><a href="' + EC.esc(it.href) + '">' + EC.esc(it.texto) + "</a></li>";
  }).join("");
  var nav = document.getElementById("migas");
  if (nav) nav.innerHTML = "<ol>" + html + "</ol>";
};
