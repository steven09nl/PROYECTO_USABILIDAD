/* Contacto: datos del restaurante y formulario de mensaje (sin envío real). */
(function () {
  EC.migas([{ texto: "Inicio", href: EC.url("index.html") }, { texto: "Contacto" }]);
  var r = EC.restaurante;
  document.getElementById("datos").innerHTML = [
    ["Dirección", r.direccion], ["Teléfono", r.telefono], ["Correo", r.correo], ["Horario de atención", r.horario]
  ].map(function (par) {
    return "<div><dt>" + par[0] + "</dt><dd>" + EC.esc(par[1]) + "</dd></div>";
  }).join("");

  var form = document.getElementById("form-contacto");
  var aviso = document.getElementById("aviso-envio");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    aviso.hidden = false;
    aviso.textContent = "Recibimos tu mensaje. Te responderemos pronto.";
    form.reset();
  });
})();
