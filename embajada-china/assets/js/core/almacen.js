/* Persistencia en el navegador (localStorage) con manejo de errores. */
EC.almacen = {
  leer: function (clave, porDefecto) {
    try {
      var v = window.localStorage.getItem(clave);
      return v ? JSON.parse(v) : porDefecto;
    } catch (e) { return porDefecto; }
  },
  guardar: function (clave, valor) {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch (e) { return false; }
  }
};
