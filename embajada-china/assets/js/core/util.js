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

/* Fotos de los platos. Orden de búsqueda para cada plato:
   1) assets/img/fotos/<id>.jpg, .png o .webp  (basta con poner el archivo con el id del plato)
   2) la foto indicada en el campo "foto" del plato (ruta local o URL)
   3) assets/img/sin-foto.jpg (imagen de marca mientras no haya foto)
   Si una imagen no carga, el navegador pasa a la siguiente de la lista. */
EC.respaldos = {};
EC.imagen = function (producto, n) {
  var sufijo = (n && n > 1) ? "-" + n : "";
  var lista = ["jpg", "png", "webp"].map(function (ext) { return EC.url("assets/img/fotos/" + producto.id + sufijo + "." + ext); });
  if (producto.foto && !sufijo) lista.push(/^https?:/.test(producto.foto) ? producto.foto : EC.url(producto.foto));
  lista.push(EC.url("assets/img/sin-foto.jpg"));
  for (var i = 0; i < lista.length - 1; i++) EC.respaldos[lista[i]] = lista[i + 1];
  return lista[0];
};
document.addEventListener("error", function (e) {
  var img = e.target;
  if (img && img.tagName === "IMG") {
    var r = EC.respaldos[img.getAttribute("src")];
    if (r) img.src = r;
  }
}, true);

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

/* Clase CSS para el distintivo de estado de un pedido. */
EC.claseEstado = function (estado) {
  return "estado estado--" + String(estado).toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
